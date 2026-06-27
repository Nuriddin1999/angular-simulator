import { Component, inject } from '@angular/core';
import { MessagesService } from '../../app/services/messages/messages.service';
import { NgTemplateOutlet } from '@angular/common';
import { IMessage } from '../../app/interfaces';

@Component({
  selector: 'app-messages',
  imports: [NgTemplateOutlet],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  messagesService: MessagesService = inject(MessagesService);
}
