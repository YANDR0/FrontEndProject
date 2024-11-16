import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  private socket: Socket | undefined;
  private server = environment.SERVER_URL;

  constructor(private authService: AuthService) { 
    this.socket = io(this.server, { auth: { token: authService.getToken() } }) 
  }

  joinRoom(roomId: string){
    if(!this.socket) return
    this.socket.emit('joinConnection', roomId)
  }

  getMessage(show: Function){
    if(!this.socket) return
    this.socket.on('getMessage', (data) => show())
  }

  sendMessage(room: string, msg: string){
    if(!this.socket) return
    const token = this.authService.getToken()
    const data = {room, msg, token}
    this.socket.emit('sendMessage', data);
  }

  //Creo que no se usará al final
  closeConnection(){
    if(!this.socket) return
  }
  
}
