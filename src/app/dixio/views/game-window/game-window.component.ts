import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

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
  selectedCard: any = -1;

  constructor() { }



  ngOnInit() {
    this.cards = [
      {
        id: '1',
        text: 'A'
      },
      {
        id: '2',
        text: 'B'
      },
      {
        id: '3',
        text: 'C'
      },
      {
        id: '4',
        text: 'D'
      }
    ]
  }

  onSelect(a: any) {
    this.selectedCard = a;
  }



}
