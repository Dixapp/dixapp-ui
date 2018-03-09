import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SocketService} from "../../helpers/socket.service";



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input('socket') socket: SocketService;
  @ViewChild('chatWindow') chatWindow;
  @ViewChild('localChatWindow') localChatWindow;
  messages: any = [];
  messagesLocal: any = [];
  textAreaMsgGlobal: any;
  textAreaMsgLocal: any;
  userList: any = [];
  constructor() { }

  ngOnInit() {
    let self = this;
    this.socket.getGlobalChatMessages().subscribe((data)=>{
      self.addMsg(data.owner + ': ' +data.msg);
    });
    this.socket.getLocalChatMessages().subscribe((data)=>{
      self.addMsgLocal(data.owner + ': ' +data.msg);
    });

    this.socket.getRoomUsers().subscribe((data)=>{
      console.log(data);
      self.userList = data;
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
    this.localChatWindow.nativeElement.scrollTop = this.localChatWindow.nativeElement.scrollHeight;
  }

  sendGlobalMessage(e) {
    if(e[e.length - 1] == '\n'){
      this.socket.sendGlobalChatMessage(this.textAreaMsgGlobal.slice(0,-1));
      this.textAreaMsgGlobal = "";
    }
  }

  sendLocalMessage(e) {
    if(e[e.length - 1] == '\n'){
      this.socket.sendLocalChatMessage(this.textAreaMsgLocal.slice(0,-1));
      this.textAreaMsgLocal = "";
    }
  }

}
