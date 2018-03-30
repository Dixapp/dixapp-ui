import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import {TranslateService} from "../../translate/translate.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  constructor(private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar,
              private translateService: TranslateService) { }

  ngOnInit() {

  }

  submit(): any {
    this.userService.create(this.model)
      .do((data)=>{},(err)=> {
        this.snackBar.open(this.translateService.instant("access/unable_to_register"), "info", {duration: 3000});
      })
      .subscribe((data)=>{
        this.router.navigate(['/login'], { queryParams: {registered: true} });
      });
  }

}
