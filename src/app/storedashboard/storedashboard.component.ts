import { Component , OnInit} from '@angular/core';
import { StoreStatistical } from '../model/StoreStatistical.model';
import { AdminStatisticalService } from '../services/admin-statistical.service';

@Component({
  selector: 'app-storedashboard',
  templateUrl: './storedashboard.component.html',
  styleUrls: ['./storedashboard.component.scss']
})
export class StoredashboardComponent implements OnInit {

  constructor(private adminStatisticalService :AdminStatisticalService) { }
  ngOnInit(): void {
    this.adminStatisticalService.getStoreStatistical().subscribe({
      next: (data) => {
        this.storeStatistical = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  storeStatistical!: StoreStatistical;
}
