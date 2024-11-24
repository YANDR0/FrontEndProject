import { Component } from '@angular/core';
import { AuthService } from '../../../services/shared/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../modules/material/material.module';
import { CommonModule } from '@angular/common';
import { SocketsService } from '../../../services/shared/sockets.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  msg = "";
  show = false;
  role: number|undefined;

  constructor(private authService: AuthService, private socketService: SocketsService, private router: Router) {
    // Suscribirse al observable para detectar cambios en el estado de autenticación
    this.authService.tokenObservable.subscribe(token => {
      this.isLoggedIn = !!token; // Actualizar estado basado en la presencia del token
      
      if(this.isLoggedIn){
        socketService.openConnection();
        this.authService.userObservable.subscribe(user => {
          this.role = authService.getRole();
          socketService.joinRoom(this.role + '');  //Hacer que se una al chat de su rol después
          socketService.getMessage((data: any)=>{
            this.msg = data;
          })
        })
        
      }

    });
  }

  logout() {
    this.authService.deleteToken(); // Eliminar el token
    this.socketService.closeConnection()
    this.router.navigate(['home']); // Redirigir al usuario a la página de login
  }

  closeNotification(){
    this.msg = "";
  }

  showChat(){
    this.show = true;
  }

  closeChat(){
    this.show = false
  }

  sendMessage(room: string, globalMessage: string){
    if(!globalMessage) return
    this.socketService.sendMessage(room, globalMessage);
    this.closeChat()
  }
}
