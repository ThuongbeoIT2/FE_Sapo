import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-process',
  templateUrl: './order-process.component.html',
  styleUrls: ['./order-process.component.scss']
})
export class OrderProcessComponent {
  @Input() status: number = 1; // Default to 1 (Order Placed)
}
