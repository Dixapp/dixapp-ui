import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { CahService } from "../../shared_services/cah.service";

@Component({
  selector: 'app-rooms-dialog',
  templateUrl: './rooms-dialog.component.html',
  styleUrls: ['./rooms-dialog.component.css']
})
export class RoomsDialogComponent implements OnInit {

  constructor(private cahService: CahService) { }
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
    this.cahService.createRoom(this.model);
    this.hide();
  }

}
