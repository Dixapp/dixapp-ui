import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../user.service";
import { Observable } from "rxjs/Observable";
import { MessageService } from "primeng/components/common/messageservice";
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  msgs: any = [];

  constructor(
    private router: Router,
    private us: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
  }

  submit() {
    this.us.login(this.model.email, this.model.password)
      .do((d)=>{},(e) => {
        this.messageService.add({severity:'error', summary:'Internal Error', detail:'Login failed'});
      })
      .subscribe(data => {
        this.router.navigate(['/app']);
      });
  }

}
