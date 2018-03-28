import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../../access/user.service";
import { Router } from "@angular/router";
import { trigger, state, transition, animate, style } from "@angular/animations";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.css'],
  animations: [
    trigger('toggleAnimation', [
      state('collapsed', style({
        width: '40px',
      })),
      state('expanded', style({
        width: '*',
      })),
      transition('collapsed <=> expanded', animate('500ms ease-in-out'))
    ]),


    trigger('toggleAnimationB', [
      state('collapsed', style({
        marginLeft: '40px'
      })),
      state('expanded', style({
        marginLeft: '*'
      })),
      transition('collapsed <=> expanded', animate('500ms ease-in-out'))
    ]),

    trigger('toggleTitle', [
      state('collapsed', style({
        width: '0px'
      })),
      state('expanded', style({
        width: '*'
      })),
      transition('collapsed <=> expanded', animate('500ms ease-in-out'))
    ]),
  ]
})
export class BasicLayoutComponent {

  constructor(private userService: UserService,
              private router: Router,
              private http: HttpClient) { }




  toggleState: boolean = true;
  toggleStateB(){
    this.toggleState = !this.toggleState;
  }

  getUserName(): any {
    return this.userService.userData.user;
  }

  activeTab(tabname: any){
    return (this.router.url.indexOf(tabname) > -1) ? 'active' : '';
  }

  logout() {
    this.userService.logout();
  }


}
