import { Injectable } from '@angular/core';
import { UserService } from "../../access/user.service";
import { SocketService, socketServiceFactory } from "../../helpers/socket.service";
import { Subject } from "rxjs/Subject";
import { MatSnackBar } from "@angular/material";


@Injectable()
export class DixioService {

  socket: SocketService;
  room: Subject<any> = new Subject<any>();
  localMsg: Subject<any> = new Subject<any>();
  globalMsg: Subject<any> = new Subject<any>();
  serverMsg: Subject<any> = new Subject<any>();
  roomList: Subject<any> = new Subject<any>();
  hand: Subject<any> = new Subject<any>();
  stage: Subject<any> = new Subject<any>();
  question: Subject<any> = new Subject<any>();
  answers: Subject<any> = new Subject<any>();
  chooser: Subject<any> = new Subject<any>();
  scores: Subject<any> = new Subject<any>();
  error: Subject<any> = new Subject<any>();

  constructor(private userService: UserService, private snackBar: MatSnackBar) {

    this.socket = socketServiceFactory(userService, '/dixio');

    this.socket.on('room_info', (room)=> this.room.next(room) );
    this.socket.on('chat_msg_local', (msg)=> this.localMsg.next(msg));
    this.socket.on('chat_msg_global', (msg)=> this.globalMsg.next(msg));
    this.socket.on('message', (msg) => this.serverMsg.next(msg));
    this.socket.on('room_list', (rooms)=> this.roomList.next(rooms));
    this.socket.on('cards_hand', (hand)=> this.hand.next(hand));
    this.socket.on('stage', (stage)=> this.stage.next(stage));
    this.socket.on('question', (question)=> this.question.next(question));
    this.socket.on('answers_cards', (answers)=> this.answers.next(answers));
    this.socket.on('chooser', (chooser)=> this.chooser.next(chooser));
    this.socket.on('scores', (scores)=> this.scores.next(scores));
    this.socket.on('error_msg', (err)=> this.error.next(err));

    this.serverMsg.subscribe((msg)=>{
      this.snackBar.open(msg.msg, "info", {duration: 3000});
    });

    this.stage.subscribe((stage)=>{
      console.log("Stage: "+stage);
    });

    this.error.subscribe((error)=>{
      console.log(error);
    });

  }

  connectIfNeeded(){
    if(!this.socket.ioSocket.connected) this.socket.connect();
  }

  createRoom(room_data){
    this.socket.emit('create_room', room_data);
  }

  joinRoom(room_id){
    this.socket.emit('join_room', room_id);
  }

  leaveRoom() {
    this.socket.emit('leave_room', {});
  }

  sendGlobalChatMessage(chat_msg){
    this.socket.emit('chat_msg_global', chat_msg);
  }

  sendLocalChatMessage(chat_msg){
    this.socket.emit('chat_msg_local', chat_msg);
  }

  startGame() {
    this.socket.emit('start_game', null);
  }

  sendAnswers(data) {
    this.socket.emit('chosen_cards', data);
  }

  pickWinner(winner) {
    this.socket.emit("choose", winner);
  }

}
