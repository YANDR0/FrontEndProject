import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/shared/auth.service';
import { Restaurants } from '../../../types/restaurants';
import { RestaurantService } from '../../../services/shared/restaurant.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-restaurant',
  standalone: true,
  imports: [MaterialModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.scss']
})
export class CreateRestaurantComponent {
  selectedFile: File | null = null;
  
  restaurant: Restaurants = {
    name: '',
    rating: 0,
    description: '',
    image: '',
    category: [''],
    location: 0,
    price: 0
  };

  constructor(private router: Router, private authService: AuthService, private restaurantService: RestaurantService) {
    // Verifica si el usuario está logueado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']); 
    }
  }

  triggerFileInput(): void {
    document.getElementById('fileInput')?.click();
  }
  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Archivo seleccionado:', file.name);
    }
  }

  onConfirm(): void {
    const formData = new FormData();
    
    if (this.restaurant.name) {
      formData.append('name', this.restaurant.name);
    }
    if (this.restaurant.location) {
      formData.append('location', this.restaurant.location.toString());
    }
    if (this.restaurant.rating) {
      formData.append('rating', this.restaurant.rating.toString());
    }
    if (this.restaurant.description) {
      formData.append('description', this.restaurant.description);
    }
    if (this.restaurant.category) {
      formData.append('category', JSON.stringify(this.restaurant.category)); //aqui cambia el coso
    }
    if (this.restaurant.price) {
      formData.append('price', this.restaurant.price.toString());
    }
    
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name); 
    }
    
    console.log('Datos: ', formData);

    // Enviar los datos al backend
    this.restaurantService.createRestaurant(formData).subscribe({
      next: (newRestaurant) => {
        console.log('Restaurante creado:', newRestaurant);
        this.router.navigate(['/home']); // Redirigir a home
      },
      error: (error) => {
        console.error('Error al crear el restaurante:', error);
      },
    });
  }
  
}
