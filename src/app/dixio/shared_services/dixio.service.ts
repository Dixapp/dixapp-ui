import { Injectable } from '@angular/core';
import { UserService } from "../../access/user.service";
import { SocketService, socketServiceFactory } from "../../helpers/socket.service";

@Injectable()
export class DixioService {

  socket: SocketService;

  constructor(private userService: UserService) {
    this.socket = socketServiceFactory(userService, '/dixio');
  }

}
