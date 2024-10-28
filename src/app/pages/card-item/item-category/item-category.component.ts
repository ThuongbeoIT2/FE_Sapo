import { Component, Input } from '@angular/core';
import { CategoryResponse } from 'src/app/model/category.model';


@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.scss']
})
export class ItemCategoryComponent {
  @Input() categoryResponse!: CategoryResponse; 
}
