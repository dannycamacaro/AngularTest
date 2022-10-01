import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {WebSocketServiceService} from "../web-socket-service.service";
import {IMessage} from "./IMessage";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {


  formChat: FormGroup;
  messagesRecived: IMessage[] = [];

  constructor(private formBuilder: UntypedFormBuilder, private socketService: WebSocketServiceService) {
    this.formChat = this.formBuilder.group({
      message: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.socketService.open();
    this.socketService.message.subscribe(message => {
      console.log(message);
      this.messagesRecived.push(message);
    });
  }

  sendMessage() {
    console.log(this.formChat.value.message);
    this.addOwnMessage();
    const newMessage: IMessage = {
      name: 'Danny',
      text: this.formChat.value.message,
      date: new Date()
    };
    this.socketService.send(JSON.stringify(newMessage));
    this.formChat.reset();
  }

  private addOwnMessage() {
    const newMessage = {
      name: 'Danny',
      text: this.formChat.value.message,
      date: new Date()
    };
    this.messagesRecived.push(newMessage);
  }


  ngOnDestroy(): void {
    this.socketService.close();
  }
}
