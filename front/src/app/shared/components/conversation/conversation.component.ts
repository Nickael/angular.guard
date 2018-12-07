import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { StorageService } from '../../services/session/storage/storage.service';
import { Message } from '../../entities/message';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  @Input() _text: string;
  @Input() conversation = [];
  @Input() logged;

  constructor(
    private chatService: ChatService,
    private storageService: StorageService,
    ) {
    }

  ngOnInit() {
    if (this.logged) {
      this.chatService.connect();
      this.chatService.message.subscribe( message => {
        console.log(message);
        this.conversation.push(message);
      });
      this.chatService.sendMessage('connected');
    }

  }

  sendMessage(_message: string) {
    const message: Message =  {
      author: this.storageService.getUUID(),
      content: _message,
      type: 'new-message'
    };

    this.chatService.sendMessage(message);
  }

}
