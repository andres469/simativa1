import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Database, object, ref } from '@angular/fire/database';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  constructor(private database:Database) {}
  async ngOnInit() {

    const route = ref(this.database, "/noti" );
    object(route).subscribe(attributes => {
      const valores_db = attributes.snapshot.val();
      console.log(valores_db);//Imprimir valores obtenidos de la busqueda en la ruta 
    });

    await LocalNotifications.requestPermissions();//solicitar permisos de la app
    await LocalNotifications.schedule({//Elaboracion del objeto notificacion
      notifications: [
        {
          title: "Esta es una notificación emergente",
          body: "Esta notificación debería ejecutarse en segundo plano pero no cuando lapp esté cerrada",
          id: 1,
          schedule:{
            allowWhileIdle:true// Permite que la notificación se ejecute incluso durante el modo Reposo
          }
        }
      ]
    });
  }
  
}
