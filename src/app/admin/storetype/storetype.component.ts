import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoretypeService } from '../../services/storetype.service';
import { StoreType } from '../../model/store-type.model';

@Component({
  selector: 'app-storetype',
  templateUrl: './storetype.component.html',
  styleUrls: ['./storetype.component.scss']
})
export class StoretypeComponent implements OnInit {
  action: string | null = '';
  storeTypes: StoreType[] = [];

  constructor(private route: ActivatedRoute, private storeTypeService: StoretypeService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.action = params['action'] || '';
    });
    this.fetchStoreTypes();
  }

  fetchStoreTypes(): void {
    this.storeTypeService.getStoreTypes().subscribe({
      next: (data) => {
        this.storeTypes = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  insertAction(): void {
    const url = new URL(window.location.href);
    url.searchParams.set('action', 'add');
    window.history.pushState({}, '', url.toString());
    window.location.reload();
  }
}
