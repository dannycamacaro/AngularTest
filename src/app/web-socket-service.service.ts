import {EventEmitter, Injectable, Output} from '@angular/core';
import {IMessage} from "./chat/IMessage";

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {
  ws!: WebSocket;
  @Output() message = new EventEmitter<IMessage>();


  constructor() {
    this.ws = new WebSocket('wss://webskocet.herokuapp.com');
    this.ws.onmessage = (e) => {
      console.log(e.data);
      this.message.emit(JSON.parse(e.data));
    };
  }

  send(message: string) {
    this.ws.send(message);
  }

  open() {

  }

  close() {

  }
}
