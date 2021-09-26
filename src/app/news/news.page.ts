import { Component,Injectable, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';
import { News} from '../news.interface';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { NewsObject, Data } from '../news.objects';
import { Storage } from '@ionic/storage';
import { Key } from 'protractor';
import { resolve } from 'url';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  news:News[];
  data:any;
  page = 1;
  datas = [];
  public news_list = new NewsObject();
  constructor(private newsService: NewsService,
     private router: Router,
     private storage:Storage,
     private authService:AuthService,
     private http:HttpClient) {}
  ngOnInit() {

      this.newsService.getnews().subscribe(
        (news:News[])=>this.news=news,
        
        
        (error:Response)=>console.log(error)
      );

  }
  onGoToNewsSinglePage(new_s) {
    this.newsService.currentArticle = new_s;
    this.router.navigate(['/news-detail']);
  }
  reload(){
    this.router.navigate(['/tabs/news']);
    window.location.replace('tabs');
    //this.reloading();
  }
  reloading(){
    
  }
  /* loadMoreNews(event) {
    this.page++; 
    console.log(event);
    this.newsService
      .getData(
        `top-headlines?country=us&category=business&pageSize=5&page=${
          this.page
        }`
      )
      .subscribe(
        (news:News[])=>this.news=news,
        (error:Response)=>console.log(error)
        
      );
  } */

  gettoken() {
    
    return this.storage.get("access_token")
     .then(
      (data) => {
        this.data=data;
        return data;         
      }); 
      
   }
}
