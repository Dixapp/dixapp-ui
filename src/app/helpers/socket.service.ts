import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { UserService } from "../access/user.service";
import { environment } from '../../environments/environment';

@Injectable()
export class SocketService extends Socket{

    constructor(private _user:UserService, private namespace: string = '') {
        super({ url: environment.socketUrl + namespace, options: {query: 'auth_token=' + _user.getToken() }});
    }

}

export let socketServiceFactory = (userService: UserService, namespace: string = '') => {
    return new SocketService(userService, namespace);
};

export let socketServiceProvider = {
        provide: SocketService,
        useFactory: socketServiceFactory,
        deps: [UserService]
};

