import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { CahService } from "../../shared_services/cah.service";
import { merge } from 'rxjs/observable/merge';
import { combineLatest } from "rxjs/observable/combineLatest";
import {UserService} from "../../../access/user.service";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('chatWindow') chatWindow;
  @ViewChild('localChatWindow') localChatWindow;
  messages: any = [];
  messagesLocal: any = [];
  textAreaMsgGlobal: any;
  textAreaMsgLocal: any;
  userList: any = [];
  activeTab: number = 0;
  scores: any = {};
  roomChatActive: boolean = false;
  owner: any = "";
  startButtonActive: boolean = false;

  constructor(private cahService: CahService, private userService: UserService) { }

  ngOnInit() {
    let self = this;

    this.cahService.globalMsg.subscribe((msg)=> self.addMsg(msg.owner + ': ' +msg.msg));

    this.cahService.localMsg.subscribe((msg)=> {
      self.addMsgLocal(msg.owner + ': ' +msg.msg);
    });

    this.cahService.room.subscribe((room)=> {
        self.userList = room ? room.users : [];
        this.activeTab = room ? 1 : 0;
        this.roomChatActive = !!room;
        this.messagesLocal = [];
        this.scores = {};
    });

    combineLatest(this.cahService.stage, this.cahService.room).subscribe(([stage, room])=>{
      this.startButtonActive = (room && this.userService.userData.user == room.owner && stage === 0 && room.users.length >= 2);
    });

    this.cahService.scores.subscribe((scores)=>{
      this.scores = scores;
    });

  }

  addMsg(msg: any) {
    this.messages.push(msg);
  }

  addMsgLocal(msg: any) {
    this.messagesLocal.push(msg);
  }

  scroll() {
    this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
  }

  scrollLocal() {
    if(this.localChatWindow) this.localChatWindow.nativeElement.scrollTop = this.localChatWindow.nativeElement.scrollHeight;
  }

  sendGlobalMessage(e) {
    if(e[e.length - 1] == '\n'){
      this.cahService.sendGlobalChatMessage(this.textAreaMsgGlobal.slice(0,-1));
      this.textAreaMsgGlobal = "";
    }
  }

  sendLocalMessage(e) {
    if(e[e.length - 1] == '\n'){
      this.cahService.sendLocalChatMessage(this.textAreaMsgLocal.slice(0,-1));
      this.textAreaMsgLocal = "";
    }
  }

  startGame() {
    this.cahService.startGame();
  }

}
