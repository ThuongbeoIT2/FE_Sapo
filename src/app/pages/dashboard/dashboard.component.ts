import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  slides = [
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSffWEId6QsC2WKp7FJehgjj-5xkLPvs4W00Q&s', alt: 'Slide 1' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBUqDjRW_X6WoJKEYs-JI2-20PdY5ZJjKvpQ&s', alt: 'Slide 2' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSffWEId6QsC2WKp7FJehgjj-5xkLPvs4W00Q&s', alt: 'Slide 3' },
  ];
}
