import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../modules/material/material.module';


@Component({
  selector: 'app-user-config',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './user-config.component.html',
  styleUrl: './user-config.component.scss'
})
export class UserConfigComponent {

}
