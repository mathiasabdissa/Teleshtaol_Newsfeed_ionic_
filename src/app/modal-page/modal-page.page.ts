import { Component, OnInit,Input  } from '@angular/core';
import { NavParams } from '@ionic/angular';
import {ModalController} from '@ionic/angular';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
    // Data passed in by componentProps
    @Input() firstName: string;
    @Input() lastName: string;
    @Input() middleInitial: string;
    
  constructor(private modalController:ModalController) {
    
   }

  ngOnInit() {
  }
  async closeModal(){
    await this.modalController.dismiss();
  }

  


}
