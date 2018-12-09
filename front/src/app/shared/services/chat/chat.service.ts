import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SocketService } from '../socket/socket.service';
import { StorageService } from '../session/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  message: Subject<MessageEvent>;

  constructor(
    private socketService: SocketService,
    private storageService: StorageService,
    ) {
    // this.message = new Subject<any>();
    // this.message = <Subject<any>> this.socketService.connect();

  }

  connect(): void {
    if (this.storageService.getUUID() != null) {
      this.message = <Subject<any>> this.socketService.connect();
      console.log('connected');
    }
  }

  disconnect(): void {
    if (this.storageService.getUUID() == null) {
      this.socketService.disconnect();
    }
  }

  sendMessage(message: any) {
    if (this.storageService.getUUID() != null) {
      this.message.next(message);
    }
  }
}
