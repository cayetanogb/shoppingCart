import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartModalPage } from '../pages/cart-modal/cart-modal.page';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;

  constructor(private cartService: CartService, private modalCart: ModalController) {}

  ngOnInit() {
    this.products = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  addToCart(product) {
    this.animateCSS('tada');
    this.cartService.addProduct(product);
  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);

    let modal = await this.modalCart.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });

    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS('bounceOutLeft');
    })
    modal.present();
  }

  animateCSS(animationName, KeepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
      if (!KeepAnimated) {
        node.classList.remove('animated', animationName);
      }

      node.removeEventeListener('animationend', handleAnimationEnd)
    }

    node.addEventListener('animationend', handleAnimationEnd);
  }

}
