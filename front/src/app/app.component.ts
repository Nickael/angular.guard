import { Component, OnInit } from '@angular/core';
import { StorageService } from './shared/services/session/storage/storage.service';
import { ChatService } from './shared/services/chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'guard';
  logged;

  constructor(
    private storageService: StorageService,
    private chatService: ChatService,
    ) {}

  ngOnInit() {
    if (this.storageService.getUUID() == null) {
      this.logged = false;
    } else {
      this.logged = true;
    }
  }

  logout() {
    console.log('logout');
    if ( this.storageService.getUUID() != null) {
      this.storageService.removeUUID();
      this.logged = false;
      this.chatService.disconnect();
    }
  }

  log() {
    console.log('log');
    if ( this.storageService.getUUID() == null) {
      this.storageService.generateUUID();
      this.logged = true;
      this.chatService.connect();
      this.chatService.sendMessage(this.storageService.getUUID());
    }
  }
}
