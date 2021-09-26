import { Component,Injectable, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { News } from '../news.interface';
import { NewsObject } from '../news.objects';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { NewsPage } from '../news/news.page';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {
  public news_comment = new NewsObject();
  commentForm: FormGroup;
  news = new NewsObject();
  comments: Comment[];
  comment = new NewsObject();
  article;
  commenting = false;
  like:Boolean;
  //like=this.news_list.liked_by_auth_user;
  public news_list = new NewsObject();
  

  constructor(private newsService: NewsService,
    private router: Router,
    private authService: AuthService,
    private http: Http,
    private storage:Storage,
    private newpage:NewsPage,
    private formBuilder: FormBuilder,
    private alertController: AlertController) { }

  ngOnInit() {
   // Boolean like = this.news.liked_by_auth_user;
    this.news = this.newsService.currentArticle;
    this.news_list = this.news;
    this.like=this.news_list.liked_by_auth_user;
    const id = this.news_list.id;
    //console.log(this.news_list.liked_by_auth_user);
    //console.log(this.like);
    this.commentForm = this.formBuilder.group({
      comment: [],
    });
    this.newsService.getcomments(id).subscribe(
      (comments:Comment[])=>this.comments=comments,
    );

   // console.log(id);
  }
  false(){
    this.like=false;
    this.commenting=false;
  }
  onCommentSummit(){
    this.newsService.comment(this.news_list).subscribe(
      data=>{
       console.log('works');
       this.router.navigate(['/tabs/news']); 
      }
    );
   // console.log(this.news_comment.comment);
  }

  
  onComment() {
    if (this.authService.isAuthenticated()) {
      this.commenting = true;
      //this.showAlertSuccess('You can Comment');
    } else {
      this.showAlert('You can not Comment');
      this.commenting = false;
      this.router.navigate(['/login']);
    }

  }
  onCancel() {
    this.commenting = false;
  }
  Like() {
    if (this.authService.isAuthenticated()) {
      this.newsService.like(this.news_list).subscribe(
        data=>{
          this.newpage.reload();
          //this.like = false;
        }
      );
      this.showAlertSuccess('Liked');
      
    } else {
      this.showAlert('Login First');
      console.log('Not Authenticated');
      this.router.navigate(['/login']);
    }

    //this.router.navigate(['/login'])

  }
  UnLike(){
    if (this.authService.isAuthenticated()) {
      this.newsService.unlike(this.news_list).subscribe(
        data=>{
          console.log('unlike');
          this.newpage.reload();
          //this.router.navigate(['/tabs/news']);
          //this.like = false;
        }
      );
      this.showAlertSuccess('unliked');
      //console.log(this.news_list.id);
      //this.authService.logout();
    } else {
      this.showAlert('Login First');
      console.log('Not Authenticated');
      this.router.navigate(['/login']);
    }

  }
  Comment(){
    if (this.authService.isAuthenticated()) {
      this.showAlertSuccess('Comment works');
      
    }else {
      this.showAlert('Login First');
      console.log('Not Authenticated');
      this.router.navigate(['/login']);
    }

  }
  showAlertSuccess(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Congrats',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Not Allowed',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
  
  


}
