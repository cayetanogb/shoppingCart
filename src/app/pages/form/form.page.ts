import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  constructor(public toast: ToastController) { }

  ngOnInit() {
  }

  async enviar() {
    let codPedido = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 6; i++) {
      codPedido += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const pedido = await this.toast.create({
      message: codPedido,
      duration: 5000
    });

    pedido.present();

    setTimeout(function(){
      Swal.fire('Gracias por la compra');
    }, 2000);
  }
}
