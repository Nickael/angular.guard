import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Message } from '../../entities/message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() { }

  connect(): Subject<MessageEvent> {
    this.socket = io(environment.apiUrl);

    const _observable = new Observable(observer => {
      this.socket.on('message', (data: string) => {
        observer.next(JSON.parse(data));
      });

      return () => {
        this.socket.disconnect();
      };
    });

    const _observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      },
    };

    return Subject.create(_observer, _observable);
  }

  disconnect(): void {
    this.socket.emit('disconnect');
  }
}
