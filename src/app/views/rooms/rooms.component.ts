import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { socketServiceFactory, SocketService } from "../../helpers/socket.service";
import { UserService } from "../../access/user.service";
import { MessageService } from "primeng/components/common/messageservice";
import { RoomsDialogComponent } from "../rooms-dialog/rooms-dialog.component";
import { trigger, state, transition, animate, style } from "@angular/animations";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],

})
export class RoomsComponent implements OnInit {

  @Input() socket: SocketService;
  @Output() onRoomSelect: EventEmitter<string> = new EventEmitter();
  rooms: any = [];

  constructor(private userService: UserService, private messageService: MessageService) {}

  ngOnInit() {
    this.socket.getRooms().subscribe((rooms)=>{
        console.log(rooms);
        this.rooms = rooms;
    });
  }

  joinToRoom(room_id) {
    console.log(room_id);
    this.socket.joinRoom(room_id);
    this.onRoomSelect.emit(room_id);
  }
}
