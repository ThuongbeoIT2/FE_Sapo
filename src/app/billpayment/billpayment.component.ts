import { Component, Input } from '@angular/core';
import { BillPaymentResponse } from '../model/BillPaymentResponse.model';

@Component({
  selector: 'app-billpayment',
  templateUrl: './billpayment.component.html',
  styleUrls: ['./billpayment.component.scss']
})
export class BillpaymentComponent {
  @Input() bill!: BillPaymentResponse;
  
}
