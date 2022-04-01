import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  message: string = '';
  messages: string[] = [];
  socketClient: any = null;

  constructor() { }

  ngOnInit(): void {
    this.socketClient = socketIo.connect(environment.socketURL); 

    this.socketClient.on('recieveMessage', (data: any) => {
      this.messages.push(data.message);
    });
  }

  send(): void {
    console.log('Enviar mensaje');
    this.messages.push(this.message);
    this.socketClient.emit('newMessage', {
      message: this.message,
    });
    this.message = '';
  }
}
