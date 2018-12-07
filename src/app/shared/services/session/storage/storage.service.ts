import { Injectable } from '@angular/core';
import { v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  generateUUID() {
    localStorage.setItem('uuid', uuid());
  }

  getUUID() {
    return localStorage.getItem('uuid');
  }

  removeUUID() {
    localStorage.clear();
  }
}
