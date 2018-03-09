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
        height: '0px',
      })),
      state('expanded', style({
        height: '*',
      })),
      transition('collapsed <=> expanded', animate('500ms ease-in-out'))
    ])
  ]
})
export class BasicLayoutComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private http: HttpClient) { }

  getUserName(): any {
    return this.userService.userData.user;
  }

  ngOnInit() {
    console.log(this.router.url);
  }

  activeTab(tabname: any){
    return (this.router.url.indexOf(tabname) > -1) ? 'active' : '';
  }

  toggleState: string = 'collapsed';
  toggleState2: string = 'collapsed';


  toggle() {
    if(this.toggleState == 'collapsed') this.toggleState = 'expanded';
    else this.toggleState = 'collapsed';
  }

  toggle2() {
    if(this.toggleState2 == 'collapsed') this.toggleState2 = 'expanded';
    else this.toggleState2 = 'collapsed';
  }

  logout() {
    this.userService.logout();
  }



}
