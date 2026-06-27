import { Injectable } from '@angular/core';
import { messageStatus } from '../../../enums/messageStatus';
import { IMessage } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private _activeMessages: IMessage[] = [];

  get activeMessages(): IMessage[] {
    return this._activeMessages;
  }

  private addMessage(messageObj: Omit<IMessage, 'id'>): void {
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

  showWarn(message: string): void {
    this.addMessage({ status: messageStatus.WARN, text: message });
  }

  showError(message: string): void {
    this.addMessage({ status: messageStatus.ERROR, text: message });
  }

  showSuccess(message: string): void {
    this.addMessage({ status: messageStatus.SUCCESS, text: message });
  }

  showInfo(message: string): void {
    this.addMessage({ status: messageStatus.INFO, text: message });
  }
}
