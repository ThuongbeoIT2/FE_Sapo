export class ProductOfStoreResponse {
  id: number;
  priceI: number;
  priceO: number;
  discount: number;
  CU: string = 'VND';
  view: number;
  quantity: number;
  status: boolean;
  proName: string;
  slug: string;
  description: string;
  evaluate: number;
  thumbnail: string;
  category: string;
  storeName: string;
  storeCode: string;
  sold: number; 

  constructor(
    id: number,
    priceI: number,
    priceO: number,
    discount: number,
    CU: string = 'VND',
    view: number,
    evaluate: number,
    quantity: number,
    status: boolean,
    proName: string,
    slug: string,
    thumbnail: string,
    description: string,
    category: string,
    storeName: string,
    storeCode: string,
    sold: number
  ) {
    this.id = id;
    this.priceI = priceI;
    this.priceO = priceO;
    this.discount = discount;
    this.CU = CU;
    this.evaluate = evaluate;
    this.view = view;
    this.quantity = quantity;
    this.status = status;
    this.proName = proName;
    this.slug = slug;
    this.thumbnail = thumbnail;
    this.description = description;
    this.category = category;
    this.storeName = storeName;
    this.storeCode = storeCode;
    this.sold = sold;
  }
}
