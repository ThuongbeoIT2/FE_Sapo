import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.scss']
})
export class EvaluateComponent {
  @Input() rating: number = 0;  // Giá trị mặc định là 0
  stars = Array(5).fill(0);     // Tạo mảng sao

  rate(starIndex: number) {
    this.rating = starIndex;    // Cập nhật giá trị đánh giá khi nhấp vào sao
  }
  }
