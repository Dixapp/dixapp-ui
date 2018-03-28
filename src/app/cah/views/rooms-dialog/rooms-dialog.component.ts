import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { DixioService } from "../../shared_services/dixio.service";

@Component({
  selector: 'app-rooms-dialog',
  templateUrl: './rooms-dialog.component.html',
  styleUrls: ['./rooms-dialog.component.css']
})
export class RoomsDialogComponent implements OnInit {

  constructor(private dixioService: DixioService) { }
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
    this.dixioService.createRoom(this.model);
    this.hide();
  }

}
