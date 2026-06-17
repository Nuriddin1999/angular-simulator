import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import './training';
import { Color } from '../enums/color';
import './collection';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  IAboutBlockImage,
  IBestProgramsImage,
  IBestProgramsItem,
  IBlog,
  IMessage,
  IPopularTourisms,
} from './interfaces';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { MessagesService } from './services/messages/messages.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoading: boolean = true;

  LocalStorageService: LocalStorageService = inject(LocalStorageService);
  MessagesService: MessagesService = inject(MessagesService);

  companyName: string = 'румтибет';
  tour = {
    location: '',
    date: '',
    participants: '',
  };

  interactive: 'counter' | 'date' = 'counter';
  count: number = 0;
  currentDate = new Date();
  private dateTimerId?: ReturnType<typeof setInterval>;

  liveInput: string = '';

  activeImageIndex: number = 1;

  aboutBlockImages: IAboutBlockImage[] = [
    {
      src: '/pictures/about-mountain.jpg',
      alt: 'mountain',
    },
    {
      src: '/pictures/about-forest.jpg',
      alt: 'forest',
    },
  ];

  bestProgramsList: IBestProgramsItem[] = [
    {
      id: 1,
      src: '/pictures/guide-icon.svg',
      alt: 'guide',
      backgroundColor: '#E5EEEB',
      title: 'Опытный гид',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 2,
      src: '/pictures/security-icon.svg',
      alt: 'security',
      backgroundColor: '#E3E6EE',
      title: 'Безопасный поход',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 3,
      src: '/pictures/price-icon.svg',
      alt: 'price',
      backgroundColor: '#F3F1E1',
      title: 'Лояльные цены',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
  ];

  bestProgramsImages: IBestProgramsImage[] = [
    {
      id: 1,
      src: '/pictures/waterAndGrass.jpg',
      alt: 'Water and grass',
    },
    {
      id: 2,
      src: '/pictures/personOnMountain.jpg',
      alt: 'Person on mountain',
    },
    {
      id: 3,
      src: '/pictures/personOnSled.jpg',
      alt: 'Person on sled',
    },
    {
      id: 4,
      src: '/pictures/grassAroundMountain.jpg',
      alt: 'Grass around mountain',
    },
  ];

  popularTourisms: IPopularTourisms[] = [
    {
      id: 1,
      title: 'Озеро возле гор',
      text: 'романтическое приключение',
      price: 480,
      rating: 4.9,
      image: '/pictures/lakeAroundMountains.jpg',
      alt: 'Lake around mountains',
    },
    {
      id: 2,
      title: 'Ночь в горах',
      text: 'в компании друзей',
      price: 500,
      rating: 4.5,
      image: '/pictures/nightOnMountains.jpg',
      alt: 'Night on mountains',
    },
    {
      id: 3,
      title: 'Растяжка в горах',
      text: 'для тех, кто забоится о себе',
      price: 230,
      rating: 5.0,
      image: '/pictures/stretchingOnMountains.jpg',
      alt: 'Stretching on mountains',
    },
  ];

  blog: IBlog[] = [
    {
      id: 1,
      title: 'Красивая Италия, какая она в реальности?',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      image: '/pictures/beautiful_Italy.jpg',
      alt: 'Beautiful Italy',
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
      image: '/pictures/airplane.jpg',
      alt: 'Airplane',
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку? ',
      text: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      image: '/pictures/aloneTravel.jpg',
      alt: 'Travel alone',
    },
    {
      id: 4,
      title: 'Индия ... летим?',
      text: 'Для современного мира базовый.',
      date: '01/04/2023',
      image: '/pictures/Taj_Mahal.jpg',
      alt: 'Taj Mahal',
    },
  ];

  constructor() {
    this.saveLastVisit();
    this.saveNumberOfVisits();
    console.log(this.LocalStorageService.getItem('lastVisitTime'));
    console.log(this.LocalStorageService.getItem('NumberOfVisits'));
  }

    private ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  private isPrimaryColor(color: string): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  private saveLastVisit(): void {
    const time = new Date().toLocaleString();
    this.LocalStorageService.setItem('lastVisitTime', time);
  }

  private saveNumberOfVisits(): void {
    const numberOfVisitsBefore = Number(this.LocalStorageService.getItem('NumberOfVisits')) || 0;
    this.LocalStorageService.setItem('NumberOfVisits', String(numberOfVisitsBefore + 1));
  }

  get isSearchDisabled(): boolean {
    return !this.tour.date || !this.tour.location || !this.tour.participants;
  }

  showDate(): void {
    this.currentDate = new Date();
    this.interactive = 'date';
    clearInterval(this.dateTimerId);

    this.dateTimerId = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  showCounter(): void {
    clearInterval(this.dateTimerId);
    this.interactive = 'counter';
  }

  openDatePicker(input: HTMLInputElement): void {
    input.focus();
    input.showPicker();
  }

  get activeMessages(): IMessage[] {
    return this.MessagesService.activeMessages;
  }

  addMessage(messageObj: Omit<IMessage, 'id'>) {
    this.MessagesService.addMessage(messageObj);
  }

  closeMessage(id: number): void {
    this.MessagesService.closeMessage(id);
  }

  addMessageFromTemplate(index: number): void {
    const message = this.MessagesService.messagesTemplate[index];
    if (message) {
      this.MessagesService.addMessage(message);
    }
  }
}
