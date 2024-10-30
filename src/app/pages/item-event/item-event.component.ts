import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-item-event',
  templateUrl: './item-event.component.html',
  styleUrls: ['./item-event.component.scss']
})
export class ItemEventComponent {
@Input() imageUrl!: string;
}
