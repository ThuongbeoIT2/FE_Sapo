export class ProductOfStoreResponse {
  id: number;
  priceO: number;
  discount: number;
  CU: string = 'VND';
  view: number;
  status: boolean;
  proName: string;
  slug: string;
  category: string;
  storeName: string;
  storeCode: string; 

  constructor(
    id: number,
    priceO: number,
    discount: number,
    CU: string,
    view: number,
    status: boolean,
    proName: string,
    slug: string,
    category: string,
    storeName: string,
    storeCode: string
  ) {
    this.id = id;
    this.priceO = priceO;
    this.discount = discount;
    this.CU = CU;
    this.view = view;
    this.status = status;
    this.proName = proName;
    this.slug = slug;
    this.category = category;
    this.storeName = storeName;
    this.storeCode = storeCode;
  }
}
