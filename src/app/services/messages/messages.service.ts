import { Injectable } from '@angular/core';
import { messageStatus } from '../../../enums/messageStatus';
import { IMessage } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  readonly messagesTemplate: IMessage[] = [
    { id: 1, status: messageStatus.SUCCESS, text: 'Направления получены' },
    { id: 2, status: messageStatus.INFO, text: 'Стоимость отправлена на почту' },
    { id: 3, status: messageStatus.WARN, text: 'Программа недоступна' },
    { id: 4, status: messageStatus.ERROR, text: 'Материалы недоступны' },
  ];

  private _activeMessages: IMessage[] = [];

  get activeMessages(): IMessage[] {
    return this._activeMessages;
  }

  addMessage(messageObj: Omit<IMessage, 'id'>): void {
    const generatedId = Date.now();
    this._activeMessages.unshift({
      id: generatedId,
      status: messageObj.status,
      text: messageObj.text,
    });

    setTimeout(() => this.closeMessage(generatedId), 5000);
  }

  closeMessage(id: number): void {
    const message = this._activeMessages.find((m) => m.id === id);

    if (!message) return;

    message.isClosing = true;
    
    setTimeout(() => {
      this._activeMessages = this.activeMessages.filter((message) => message.id !== id);
    }, 500);
  }
}
