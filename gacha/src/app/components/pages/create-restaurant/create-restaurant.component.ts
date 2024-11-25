import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/shared/auth.service';
import { Restaurants } from '../../../types/restaurants';
import { RestaurantService } from '../../../services/shared/restaurant.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../../types/category';
import { CategoriesService } from '../../../services/shared/categories.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-create-restaurant',
  standalone: true,
  imports: [MaterialModule, FormsModule, CommonModule, RouterModule], 
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.scss']
})
export class CreateRestaurantComponent {
  selectedFile: File | null = null;
  categories: Category[] = [];
  
  restaurant: Restaurants = {
    name: '',
    rating: 0,
    description: '',
    image: '',
    category: [],
    location: 0,
    price: 0
  };

  constructor(private router: Router, private authService: AuthService, private restaurantService: RestaurantService, private categoryService: CategoriesService) {
    // Verifica si el usuario está logueado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']); 
    }
  }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
    })
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

  onCheckboxChange(event: MatCheckboxChange, val: string){
    if(event.checked){
      this.restaurant.category.push(val);
      return
    }
    const index = this.restaurant.category.indexOf(val);
    if(index !== -1)
      this.restaurant.category.splice(index, 1);
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
    if (this.restaurant.category && this.restaurant.category.length > 0) {
        this.restaurant.category.forEach((category) => {
            formData.append('category', category);
        });
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