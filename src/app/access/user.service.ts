import { Injectable } from '@angular/core';
import { Subject} from "rxjs/Subject";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import 'rxjs/add/operator/do';
import { TranslateService } from "../translate/translate.service";


@Injectable()
export class UserService{
    language: string;
    token: string;
    userData: any = { logged: false };
    status: Subject<any> = new Subject<any>();

    constructor(private http: HttpClient, private router: Router, private translateService: TranslateService) {
      translateService.use('pl'); //temporary solution, should be loaded from api
    }

    login(username: string, password: string) {
      return this.http.post('/users/authenticate', { email: username, password: password })
        .do((response: any) => {
          let user = response;
          if (user) {
            this.userData = user;
            this.userData.logged = true;
            this.status.next(this.userData);
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
    }

    create(user: any) {
      return this.http.post('/users/register', user);
    }

    async logged() {
        if(this.userData.logged){
            return true;
        } else {
            var response : any = await this.http.post('/users/logged', {}).toPromise();
            if(response.logged){
                let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                this.userData = currentUser;
                this.userData.logged = true;
                this.status.next(this.userData);
                return true;
            } else {
                return false;
            }
        }
    }

    logout() {
      localStorage.removeItem('currentUser');
      this.userData = { logged: false };
      this.status.next(this.userData);
      this.router.navigate(['/login']);
    }

    registerOption() {
      return true;
    }

    getToken() {
        return JSON.parse(localStorage.getItem('currentUser')).token
    }
}
