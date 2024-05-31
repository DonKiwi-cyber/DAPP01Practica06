import { Component } from '@angular/core';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  content: any[] = []

  user = {
    nombre: '',
    direccion: '',
    telefono: ''
  }

  ID: number = 0
  
  constructor(private back: BackendService){}

  traerTodos(){
    this.back.getAll().subscribe((data: any[])=>{
      let blank: any[] = []
      data.forEach((uniq)=>{
        console.log(uniq);  
        let order = {
          id: uniq.clave,
          nombre: uniq.nombre,
          direccion: uniq.direccion,
          telefono: uniq.telefono
        }
        blank.push(order)
      })
      this.content = blank
    },
    (error)=>{
      console.error("Error fetching data", error);
    })
  }

  traerUno(){
    this.back.getOne(this.ID).subscribe((data: any)=>{
      let blank: any[] = []
      let order = {
        id: data.clave,
        nombre: data.nombre,
        direccion: data.direccion,
        telefono: data.telefono
      }
      blank.push(order)
      this.content = blank
    },
    (error)=>{
      console.error("Error fetching data", error);
    })
  }

  nuevo(){
    this.ID = 0
    this.user.nombre = ''
    this.user.direccion = ''
    this.user.telefono = ''
  }

  guardar(){
    this.back.post(this.user).subscribe((data: any)=> {
      console.log('se ha registrado un usuario ', data);
    })
  }

  actualizar(){
    this.back.put(this.user, this.ID).subscribe((data: any)=>{
      console.log('se ha actualizado un usuario ', data);
    })
  }

  eliminar(){
    this.back.delete(this.ID).subscribe(()=>{
      console.log('se ha eliminado un usuario ');
    })
  }
}