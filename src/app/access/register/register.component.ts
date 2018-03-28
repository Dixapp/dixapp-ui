import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  submit(): any {
    this.userService.create(this.model)
      .do((data)=>{},(err)=> {
        console.log("Error");
        return Observable.throw(err);
      })
      .subscribe((data)=>{
        console.log("Success");
        console.log(data);
      });
  }

}
