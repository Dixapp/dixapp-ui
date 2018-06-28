import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../../access/user.service";
import { Router } from "@angular/router";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.css']
})
export class BasicLayoutComponent {

  constructor(private userService: UserService,
              private router: Router,
              private http: HttpClient) { }

  toggleState: boolean = false;

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
