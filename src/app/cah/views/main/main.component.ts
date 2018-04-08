import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { SocketService, socketServiceFactory } from "../../../helpers/socket.service";
import { MessageService } from "primeng/components/common/messageservice";
import { UserService } from "../../../access/user.service";
import { CahService } from "../../shared_services/cah.service";
import { trigger, state, transition, animate, style } from "@angular/animations";
import { RoomsDialogComponent } from "../rooms-dialog/rooms-dialog.component";

@Component({
  selector: 'app-dixit',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('toggleAnimation', [
      state('collapsed', style({
        height: '0px',
      })),
      state('expanded', style({
        height: '*',
      })),
      transition('collapsed <=> expanded', animate('500ms ease-in-out'))
    ])
  ]
})
export class MainComponent implements OnInit, OnDestroy {

  @ViewChild('dialog') dialog: RoomsDialogComponent;
  socket: SocketService;
  roomTitle: any = "";
  chooser: any = "";
  constructor(private messageService: MessageService, private cahService: CahService) { }

  ngOnInit() {
    this.cahService.connectIfNeeded();
    this.socket = this.cahService.socket;
    this.cahService.room.subscribe((room)=> {
      if(room){
        this.roomTitle = room.title;
        this.backButtonState = true;
        this.createButtonState = false;
        this.viewState = false;
        this.leaveButtonState = true;
      } else {
        this.roomTitle = "";
        this.chooser = "";
        this.backButtonState = false;
        this.createButtonState = true;
        this.viewState = true;
        this.leaveButtonState = false;
      }
    });
    this.cahService.chooser.subscribe((chooser)=>{
      this.chooser = chooser;
    });
    this.cahService.stage.subscribe((stage)=>{
      this.chooser = stage === 0 ? "" : this.chooser;
    });

  }

  ngOnDestroy(): void {
    this.cahService.socket.disconnect();
  }

  openDialog(){
    this.dialog.show();
  }

  viewState: boolean = true;
  createButtonState:boolean = true;
  backButtonState: boolean = false;
  leaveButtonState: boolean = false;

  leaveRoom(): void {
    this.cahService.leaveRoom();
  }

  switchView() {
    this.viewState = !this.viewState;
  }



}
