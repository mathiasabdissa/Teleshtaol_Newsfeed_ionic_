import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Http, Response, Headers } from "@angular/http";
import { News } from './news.interface';
import "rxjs/Rx";
import { Observable, BehaviorSubject } from "rxjs";
import { NewsObject } from './news.objects';
import { Storage } from '@ionic/storage';

//const API_URL = environment.apiUrl;
//const API_KEY = environment.apiKey;
const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class NewsService {
 // url = environment.url;
  user = null; //user object
  authenticationState = new BehaviorSubject(false);
  news: News[];
  currentArticle: any;
  constructor(private http: Http,
    private storage: Storage) { }

  getnews(): Observable<any> {
    console.log(`${url}/api/showapproved?token=` + localStorage.getItem("access_token"));
    return this.http.get(`${url}/api/showapproved?token=` + localStorage.getItem("access_token")).map(
      (response: Response) => {
        return response.json().news;
      }
    );
    console.log('clicked');
  }
  getcomments(id: Number) {
    return this.http.get(`${url}/api/getcomments/` + id).map(
      (response: Response) => {
        return response.json().comments;
      }
    );
  }
  like(news_like: NewsObject) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const new_header = new Headers();
    //console.log(localStorage.getItem("access_token"));
    const formData: FormData = new FormData();
    formData.append('news_post_id', news_like.id + '');
    return this.http.post(`${url}/api/news_post_like?token=` + localStorage.getItem("access_token"), formData, { headers: new_header });
  }
  unlike(news_unlike: NewsObject) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const new_header = new Headers();
    const formData: FormData = new FormData();
    formData.append('news_post_id', news_unlike.id + '');
    console.log(news_unlike.id);
    return this.http.post(`${url}/api/news_post_unlike?token=` + localStorage.getItem("access_token"), formData, { headers: new_header });
  }

  comment(news_comment: NewsObject) {
    const new_header = new Headers();
    const formData: FormData = new FormData();
    formData.append('news_post_id', news_comment.id + '');
    formData.append('comment', news_comment.comment);
    console.log(`${url}/api/newspostcomment?token=` + localStorage.getItem("access_token"));
    return this.http.post(`${url}/api/newspostcomment?token=` + localStorage.getItem("access_token"), formData, { headers: new_header });
  }
}
