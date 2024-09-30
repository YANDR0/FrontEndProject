import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../modules/material/material.module';

@Component({
  selector: 'app-user-overview',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './user-overview.component.html',
  styleUrl: './user-overview.component.scss'
})
export class UserOverviewComponent {

}
