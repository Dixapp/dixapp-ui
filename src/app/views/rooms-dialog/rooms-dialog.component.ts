import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { SocketService } from "../../helpers/socket.service";

@Component({
  selector: 'app-rooms-dialog',
  templateUrl: './rooms-dialog.component.html',
  styleUrls: ['./rooms-dialog.component.css']
})
export class RoomsDialogComponent implements OnInit {

  constructor() { }
  @Input() socket: SocketService;
  visible: boolean = false;
  model: any = {};

  ngOnInit() {

  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  submit() {
    this.socket.createRoom(this.model);
    this.hide();
  }

}
