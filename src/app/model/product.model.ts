export class ProductResponse {
  proId: number;
  proName: string;
  slug: string;
  thumbnail: string;
  description: string;
  category: string;
  isHotSale: boolean;

  constructor(proId: number, proName: string, slug: string, thumbnail: string, description: string, category: string, isHotSale: boolean) {
    this.proId = proId;
    this.proName = proName;
    this.slug = slug;
    this.thumbnail = thumbnail;
    this.description = description;
    this.category = category;
    this.isHotSale = isHotSale;
  }
}
