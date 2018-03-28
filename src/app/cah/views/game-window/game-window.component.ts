import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import { DixioService } from "../../shared_services/dixio.service";
import { UserService } from "../../../access/user.service";
import {combineLatest} from "rxjs/observable/combineLatest";

@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: ['./game-window.component.css'],
  animations: [
    trigger('fadeAnimation', [
      state('collapsed', style({
        backgroundColor: 'black',
        color: 'white'
      })),
      state('expanded', style({
        backgroundColor: '*',
        color: '*'
      })),
      transition('expanded => collapsed', animate('500ms ease-in-out'))
    ])
  ]
})
export class GameWindowComponent implements OnInit {

  cards: any = [];
  question: any;
  selectedCards: any = [];
  toSelect: number = 0;
  indexOfSelection: number = 0;
  answers: any = [];
  choosingActive: boolean = false;
  chooseButtonsActive: boolean = false;
  chooser: any = "";

  constructor(private dixioService: DixioService, private  userService: UserService) { }

  ngOnInit() {

    this.dixioService.hand.subscribe((cards)=> this.cards = cards);

    this.dixioService.question.subscribe((question) => {
      this.question = question;
      this.toSelect = question.numAnswers;
    });

    this.dixioService.answers.subscribe((answers)=> this.answers = answers);

    combineLatest(this.dixioService.stage, this.dixioService.chooser).subscribe(([stage, chooser])=>{
      this.chooseButtonsActive = stage === 3 && chooser === this.userService.userData.user;
    });

    combineLatest(this.dixioService.room, this.dixioService.stage, this.dixioService.chooser).subscribe(([room, stage, chooser])=>{
      this.choosingActive = room && room.users.length >= 2 && stage === 2 && this.userService.userData.user !== chooser;
      if(stage === 1) this.answers = [];
      if(stage === 0 || !room) {
        this.question = null;
        this.selectedCards = [];
        this.cards = [];
        this.answers = [];
      }
    });

  }

  onSelect(a: any) {
    if(this.choosingActive){
      if(this.indexOfSelection < this.toSelect){
        this.selectedCards[this.indexOfSelection++] = a;
        if(this.indexOfSelection == this.toSelect) this.dixioService.sendAnswers(this.selectedCards);
      }
      else {
        this.indexOfSelection = 0;
        this.selectedCards[this.indexOfSelection++] = a;
      }
    }
  }

  chooseWinner(a: any){
    this.dixioService.pickWinner(a);
  }



}
