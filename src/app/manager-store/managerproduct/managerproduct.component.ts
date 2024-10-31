import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryResponse } from 'src/app/model/category.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-managerproduct',
  templateUrl: './managerproduct.component.html',
  styleUrls: ['./managerproduct.component.scss']
})
export class ManagerproductComponent implements OnInit {
  action: string | null = '';
  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.action = params['action'] || '';
    });
  }
  insertAction(): void {
    const url = new URL(window.location.href);
    url.searchParams.set('action', 'add');
    window.history.pushState({}, '', url.toString());
    window.location.reload();
  }
}
