import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../modules/material/material.module';
import { UserService } from '../../../../services/user.service';
import { Users } from '../../../../types/users';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-config',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule],
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {
  selectedFile: File | null = null;
  
  user: Users = {
    name: '',
    email: '',
    location: '',
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
      this.user = JSON.parse(storedUser);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;  // Asignamos el archivo seleccionado a la propiedad selectedFile
    }
  }
  
  triggerFileInput(): void {
    document.getElementById('fileInput')?.click();
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
    if (this.user.location) {
      formData.append('updatedData[location]', this.user.location);
    }
    if (this.user.biography) {
      formData.append('updatedData[biography]', this.user.biography);
    }
  
    // Si se seleccionó un archivo, agrégalo al FormData con la clave "file"
  if (this.selectedFile) {
    formData.append('file', this.selectedFile, this.selectedFile.name); // Cambia 'file' por la clave esperada en tu backend
  }
  
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
