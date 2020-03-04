import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NewsDetailPageRoutingModule } from './news-detail-routing.module';
import { NewsDetailPage } from './news-detail.page';
import { IonicStorageModule,Storage } from '@ionic/storage';

const routes: Routes = [
  {
    path: '',
    component: NewsDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NewsDetailPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewsDetailPage]
})
export class NewsDetailPageModule {}
