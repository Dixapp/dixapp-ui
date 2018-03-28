import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { socketServiceFactory, SocketService } from "../../../helpers/socket.service";
import { UserService } from "../../../access/user.service";
import { DixioService } from "../../shared_services/dixio.service";
import { MessageService } from "primeng/components/common/messageservice";
import { RoomsDialogComponent } from "../rooms-dialog/rooms-dialog.component";
import { trigger, state, transition, animate, style } from "@angular/animations";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],

})
export class RoomsComponent implements OnInit {

  @Output() onRoomSelect: EventEmitter<string> = new EventEmitter();
  rooms: any = [];

  constructor(private userService: UserService, private messageService: MessageService, private dixioService: DixioService) {}

  ngOnInit() {
    this.dixioService.roomList.subscribe((rooms)=>this.rooms = rooms);
  }

  joinToRoom(room_id) {
    this.dixioService.joinRoom(room_id)
    this.onRoomSelect.emit(room_id);
  }
}
