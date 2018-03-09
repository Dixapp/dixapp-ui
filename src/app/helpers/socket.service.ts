import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { UserService } from "../access/user.service";
import { environment } from '../../environments/environment';

@Injectable()
export class SocketService extends Socket{

    constructor(private _user:UserService, private namespace: string = '') {
        super({ url: environment.socketUrl + namespace, options: {query: 'auth_token=' + _user.getToken() }});
    }

    sendMessage(msg: string){
        this.emit("message", msg);
    }

    getMessage() {
        return this.fromEvent("message");
    }

    getRooms() {
      return this.fromEvent("room_list");
    }

    createRoom(room_data){
      this.emit('create_room', room_data);
    }

    joinRoom(room_id){
      this.emit('join_room', room_id);
    }


    getGlobalChatMessages():any {
       return this.fromEvent('chat_msg_global');
    }

    sendGlobalChatMessage(chat_msg){
        this.emit('chat_msg_global', chat_msg);
    }

    getLocalChatMessages():any {
      return this.fromEvent('chat_msg_local');
    }

    sendLocalChatMessage(chat_msg){
      this.emit('chat_msg_local', chat_msg);
    }

    getRoomUsers():any {
      return this.fromEvent('room_users')
    }

    connectIfNeeded(){
      if(!this.ioSocket.connected) this.connect();
    }

    getErrors(){
        return this.fromEvent("error_msg");
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

