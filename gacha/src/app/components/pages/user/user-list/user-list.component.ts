import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../modules/material/material.module';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

}
