import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import './training';
import { Color } from '../enums/color';
import './collection';
import { CommonModule } from '@angular/common';
import { IAboutBlockImage, IBestProgramsImage, IBestProgramsItem } from './interfaces';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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

  constructor() {
    this.saveLastVisit();
    this.saveNumberOfVisits();
    console.log(localStorage.getItem('lastVisitTime'));
    console.log(localStorage.getItem('NumberOfVisits'));
  }

  isPrimaryColor(color: string): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  saveLastVisit(): void {
    const time = new Date().toLocaleString();
    localStorage.setItem('lastVisitTime', time);
  }

  saveNumberOfVisits(): void {
    const numberOfVisitsBefore = Number(localStorage.getItem('NumberOfVisits')) || 0;
    localStorage.setItem('NumberOfVisits', String(numberOfVisitsBefore + 1));
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
}
