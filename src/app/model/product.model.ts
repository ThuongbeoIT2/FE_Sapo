export class ProductResponse {
  proId: number;
  proName: string;
  slug: string;
  thumbnail: string;
  description: string;
  category: string;

  constructor(proId: number, proName: string, slug: string, thumbnail: string, description: string, category: string) {
    this.proId = proId;
    this.proName = proName;
    this.slug = slug;
    this.thumbnail = thumbnail;
    this.description = description;
    this.category = category;
  }
}
