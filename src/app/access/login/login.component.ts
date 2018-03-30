import {AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../user.service";
import { Observable } from "rxjs/Observable";
import { MessageService } from "primeng/components/common/messageservice";
import 'rxjs/add/operator/do';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


  model: any = {};
  msgs: any = [];
  logger: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private us: UserService,
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.logger = this.route.queryParams.subscribe((params)=> {
      let self = this;
      if(params.registered) setTimeout(() => self.snackBar.open('User created succesfully', 'Succes', {duration: 3000}));
    });
  }

  ngOnDestroy() {
    this.logger.unsubscribe();
  }

  submit() {
    this.us.login(this.model.email, this.model.password)
      .do((d)=>{},(e) => {
        this.snackBar.open(e.error.msg, "info", {
          duration: 3000,
          verticalPosition: "top"
        });
      })
      .subscribe(data => {
        this.router.navigate(['/app']);
      });
  }

}
