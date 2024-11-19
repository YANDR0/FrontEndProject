import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../modules/material/material.module';
import { Users } from '../../../../types/users';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-overview',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './user-overview.component.html',
  styleUrl: './user-overview.component.scss'
})
export class UserOverviewComponent implements OnInit {
  user: Users | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
    
    if (userData) {
      this.user = JSON.parse(userData); // Parsear el JSON almacenado en sessionStorage
      console.log(this.user);
    } else {
      // Manejar el caso en que no haya datos de usuario en sessionStorage
      console.error('No se encontró el usuario en sessionStorage');
    }
  }
}
