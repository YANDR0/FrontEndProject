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

  // Mapa para traducir el ID de ubicación a texto
  locationMap: { [key: number]: string } = {
    0: 'Guadalajara, Jalisco',
    1: 'Zapopan, Jalisco',
    2: 'San Pedro Tlaquepaque, Jalisco',
    3: 'Tlajomulco de Zúñiga, Jalisco',
    4: 'Tonalá, Jalisco',
  };

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

  getLocationText(locationId?: number): string {
    if (locationId == null) {
      return 'Ubicación no especificada';
    }
    return this.locationMap[locationId] || 'Ubicación no especificada';
  }
  
}
