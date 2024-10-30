import { Component,Input } from '@angular/core';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-indentity',
  templateUrl: './indentity.component.html',
  styleUrls: ['./indentity.component.scss']
})
export class IndentityComponent {
@Input() user!: User;
}
