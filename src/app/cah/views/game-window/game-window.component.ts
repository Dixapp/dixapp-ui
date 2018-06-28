import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import { CahService } from "../../shared_services/cah.service";
import { UserService } from "../../../access/user.service";
import {combineLatest} from "rxjs/observable/combineLatest";

@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: ['./game-window.component.css']
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

  constructor(private cahService: CahService, private  userService: UserService) { }

  ngOnInit() {

    this.cahService.hand.subscribe((cards)=> this.cards = cards);

    this.cahService.question.subscribe((question) => {
      this.question = question;
      this.toSelect = question.numAnswers;
      var msg = new SpeechSynthesisUtterance(question.text);
      msg.lang = "en-US";
      window.speechSynthesis.speak(msg);
    });

    this.cahService.answers.subscribe((answers)=> this.answers = answers);

    combineLatest(this.cahService.stage, this.cahService.chooser).subscribe(([stage, chooser])=>{
      this.chooseButtonsActive = stage === 3 && chooser === this.userService.userData.user;
    });

    combineLatest(this.cahService.room, this.cahService.stage, this.cahService.chooser).subscribe(([room, stage, chooser])=>{
      this.choosingActive = room && room.users.length >= 2 && stage === 2 && this.userService.userData.user !== chooser;
      if(stage === 1) {
        this.answers = [];
        this.selectedCards = [];
        this.indexOfSelection = 0;
      }
      if(stage === 0 || !room) {
        this.question = null;
        this.selectedCards = [];
        this.cards = [];
        this.answers = [];
      }
    });

  }

  onSelect(a: any) {
    if(this.choosingActive && this.selectedCards.indexOf(a) < 0){
      if(this.indexOfSelection < this.toSelect){
        this.selectedCards[this.indexOfSelection++] = a;
      }
      else {
        this.indexOfSelection = 0;
        this.selectedCards[this.indexOfSelection++] = a;
      }
      if(this.indexOfSelection == this.toSelect) {
        this.cahService.sendAnswers(this.selectedCards);
      }
    }
  }

  chooseWinner(a: any){
    this.cahService.pickWinner(a);
  }



}
