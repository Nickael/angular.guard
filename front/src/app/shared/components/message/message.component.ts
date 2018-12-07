import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../entities/message';
import { StorageService } from '../../services/session/storage/storage.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  uuid = '';

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    // if (this.storageService.getUUID() != null) {
    //   this.uuid = this.storageService.getUUID();
    // }

    this.uuid = this.storageService.getUUID() || '';
  }

}
