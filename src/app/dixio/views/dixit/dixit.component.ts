import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { SocketService, socketServiceFactory } from "../../../helpers/socket.service";
import { MessageService } from "primeng/components/common/messageservice";
import { UserService } from "../../../access/user.service";
import { DixioService } from "../../shared_services/dixio.service";
import { trigger, state, transition, animate, style } from "@angular/animations";
import { RoomsDialogComponent } from "../../../views/rooms-dialog/rooms-dialog.component";

@Component({
  selector: 'app-dixit',
  templateUrl: './dixit.component.html',
  styleUrls: ['./dixit.component.css'],
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
export class DixitComponent implements OnInit, OnDestroy {

  @ViewChild('dialog') dialog: RoomsDialogComponent;
  socket: SocketService;
  constructor(private messageService: MessageService, private dixioService: DixioService) { }

  ngOnInit() {
    this.dixioService.socket.connectIfNeeded();
    this.socket = this.dixioService.socket;
    this.dixioService.socket.getMessage().subscribe((message:any)=>{
      this.messageService.add({severity:'info', summary:'Connected to servers', detail:message.msg});
    });
  }

  ngOnDestroy(): void {
    this.dixioService.socket.disconnect();
  }

  openDialog(){
    this.dialog.show();
  }

  toggleState: boolean = true;
  backButtonState: boolean = false;

  toggle(a:any) {
    console.log(a);
    this.toggleState = !this.toggleState;
    this.backButtonState = true;
    return this.toggleState;
  }

  switchView(room_id:string): void {
    this.toggle('');
  }



}
