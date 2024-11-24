import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../modules/material/material.module';
import { UserService } from '../../../../services/user.service';
import { Users } from '../../../../types/users';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-config',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, CommonModule],
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {
  selectedFile: File | null = null;
  
  user: Users = {
    name: '',
    email: '',
    location: 0,
    biography: '',
    image: '',
  };

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      parsedUser.location = +parsedUser.location; // Asegúrate de que sea un número
      this.user = parsedUser;
      console.log('Ubicación cargada:', this.user.location); // Depuración
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
  
    // Agregar los datos del usuario al FormData
    if (this.user.name) {
      formData.append('updatedData[name]', this.user.name);
    }
    if (this.user.email) {
      formData.append('updatedData[email]', this.user.email);
    }
    if (this.user.location !== null && this.user.location !== undefined) {
      formData.append('updatedData[location]', this.user.location.toString());
    }
    if (this.user.biography) {
      formData.append('updatedData[biography]', this.user.biography);
    }
  
    // Si se seleccionó un archivo, agrégalo al FormData con la clave "file"
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name); 
    }
  
    console.log("Datos: ", formData);

    // Enviar los datos al backend
    this.userService.updateUserData(formData).subscribe({
      next: (updatedUser) => {
        console.log('Datos del usuario actualizados:', updatedUser);
  
        // Actualizar el sessionStorage con los nuevos datos del usuario
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
  
        // Opcional: Actualizar el modelo del usuario en el componente
        this.user = updatedUser;
  
        // Redirigir al perfil después de confirmar
        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
      },
      error: (error) => {
        console.error('Error al actualizar los datos del usuario:', error);
      },
    });
  }  
}