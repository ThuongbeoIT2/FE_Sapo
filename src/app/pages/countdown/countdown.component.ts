import { Component } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent {
  targetDate: Date = new Date('2024-11-01T00:00:00'); // Set your target date and time here
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown() {
    setInterval(() => {
      const currentTime = new Date().getTime();
      const targetTime = this.targetDate.getTime();
      const timeDifference = targetTime - currentTime;

      if (timeDifference > 0) {
        this.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      } else {
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
      }
    }, 1000);
  }
}
