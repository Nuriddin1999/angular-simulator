import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/color';
import './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  companyName: string = 'румтибет';

  isPrimaryColor(color: string): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  constructor() {
    this.saveLastVisit();
    this.saveNumberOfVisits();
    console.log(localStorage.getItem('lastVisitTime'));
    console.log(localStorage.getItem('NumberOfVisits'));
  }

  saveLastVisit(): void {
    const time = new Date().toLocaleString();
    localStorage.setItem('lastVisitTime', time);
  }

  saveNumberOfVisits(): void {
    const numberOfVisitsBefore = Number(localStorage.getItem('NumberOfVisits')) || 0;
    localStorage.setItem('NumberOfVisits', String(numberOfVisitsBefore + 1));
  }
}
