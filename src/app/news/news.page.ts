import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';
import { News,Quote} from '../news.interface';
import { HttpClient } from '@angular/common/http';
import {Response} from '@angular/http';
import { NewsObject,Data } from '../news.objects';
import { Storage } from '@ionic/storage';
import { Key } from 'protractor';
import { resolve } from 'url';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  news:News[];
  quotes:Quote[];
  data:any;
  dataa =new Data();
  page = 1;
  datas = [];
  public news_list = new NewsObject();
  constructor(private newsService: NewsService,
     private router: Router,
     private storage:Storage,
    private http:HttpClient) {}
  ngOnInit() {
    /* this.newsService
      .getData(
        `top-headlines?country=us&category=business&pageSize=5&page=${
          this.page
        }`
      )
      .subscribe(data => {
        console.log(data);
        this.data = data;
      }); */
      const token=this.storage.get("access_token").then((dataa) => {

        this.dataa.token=dataa;
        return this.dataa.token;
        console.log(this.dataa.token);       
      }); 
      //this.gettoken()
        //console.log(this.dataa.token);
        console.log(this.storage.get('access_token'));
        
        //console.log(this.storage.get('access_token'));
        

      this.newsService.getnews().subscribe(
        (news:News[])=>this.news=news,
        //(news:News[])=>console.log(this.news),
        
        (error:Response)=>console.log(error)
      );
      //this.storage.get('token')
      //console.log(this.storage.get('access_token'));
  }
  onGoToNewsSinglePage(new_s) {
    this.newsService.currentArticle = new_s;
    this.router.navigate(['/news-detail']);
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
    //console.log(this.storage.get("access_token").catch);
    return this.storage.get("access_token")
     .then(
      (data) => {
        this.data=data;
        return data;         
      }); 
      
   }
}
