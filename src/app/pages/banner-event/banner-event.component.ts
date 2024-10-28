import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-banner-event',
  templateUrl: './banner-event.component.html',
  styleUrls: ['./banner-event.component.scss']
})
export class BannerEventComponent implements OnInit {
  slides = [
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSffWEId6QsC2WKp7FJehgjj-5xkLPvs4W00Q&s', alt: 'Slide 1' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBUqDjRW_X6WoJKEYs-JI2-20PdY5ZJjKvpQ&s', alt: 'Slide 2' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSffWEId6QsC2WKp7FJehgjj-5xkLPvs4W00Q&s', alt: 'Slide 3' },
  ];

  currentIndex = 0;

  ngOnInit() {
    // Tự động chuyển slide mỗi 5 giây
    interval(5000).subscribe(() => this.nextSlide());
  }

  // Hiển thị slide
  showSlide(index: number) {
    this.currentIndex = (index + this.slides.length) % this.slides.length;
  }

  // Chuyển đến slide tiếp theo
  nextSlide() {
    this.showSlide(this.currentIndex + 1);
  }

  // Quay lại slide trước
  prevSlide() {
    this.showSlide(this.currentIndex - 1);
  }
}
