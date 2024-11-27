export class BillPaymentResponse {
  billID: number ;
  orderID: number;
  isPayment: boolean;
  shipperAccount: string;
  fullName: string;
  phone: string;
  address: string;
  transID: number;
  paymentMethod: string;
  orderStatus: number;

  constructor(
      billID: number,
      orderID: number,
      isPayment: boolean,
      shipperAccount: string,
      fullName: string,
      phone: string,
      address: string,
      transID: number,
      paymentMethod: string,
      orderStatus: number
  ) {
      this.billID = billID;
      this.orderID = orderID;
      this.isPayment = isPayment;
      this.shipperAccount = shipperAccount;
      this.fullName = fullName;
      this.phone = phone;
      this.address = address;
      this.transID = transID;
      this.paymentMethod = paymentMethod;
      this.orderStatus = orderStatus;
  }
}
