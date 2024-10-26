export class CategoryResponse {
  id: number;
  cateName: string;
  description: string;
  thumbnail: string;
  slug: string;

  constructor(id: number, cateName: string, description: string, thumbnail: string, slug: string) {
    this.id = id;
    this.cateName = cateName;
    this.description = description;
    this.thumbnail = thumbnail;
    this.slug = slug;
  }
}
