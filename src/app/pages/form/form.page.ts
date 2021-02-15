import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  form: FormGroup;
  nombre: FormControl;
  apellidos: FormControl;
  direccion: FormControl;
  email: FormControl;
  telefono: FormControl;

  constructor(public toast: ToastController, private cartService: CartService, private route: Router) { }

  ngOnInit() {
    this.createForm();
  }

  async enviar() {
    let codPedido = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    if (this.form.valid) {
      for (let i = 0; i < 6; i++) {
        codPedido += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      const pedido = await this.toast.create({
        message: codPedido,
        duration: 5000
      });

      pedido.present();

      setTimeout(function(){
        Swal(
          'Pedido realizado',
          'Gracias por la compra',
          'success');
      }, 2000);
    }

    this.cartService.reset();
    this.route.navigate(['/home']);
  }

  createForm() {
    this.form = new FormGroup({
      nombre: new FormControl ('', Validators.required),
      apellidos: new FormControl ('', Validators.required),
      direccion: new FormControl ('', Validators.required),
      email: new FormControl ('', Validators.required),
      telefono: new FormControl ('', Validators.required)
    });

    this.validacion();
  }

  validacion() {
    this.nombre = this.form.controls.nombre as FormControl;
    this.apellidos = this.form.controls.apellidos as FormControl;
    this.direccion = this.form.controls.direccion as FormControl;
    this.email = this.form.controls.email as FormControl;
    this.telefono = this.form.controls.telefono as FormControl;
  }
}
