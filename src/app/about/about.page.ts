import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
   
  async OpenModal() {
    const modal = await this.modalController.create({
      component: ModalPagePage
    });
    modal.present();
  }

  

}
