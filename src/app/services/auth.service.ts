import { Injectable,Output, EventEmitter } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

import { Storage } from '@ionic/storage';


const TOKEN_KEY = 'access_token';
const url = environment.url;
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //url = environment.url;
  user = null; //user object
  authenticationState = new BehaviorSubject(false);

  public is_authenticated: boolean;
  @Output() autheticate_emiter = new EventEmitter<boolean>();

  constructor(private storage:Storage,
    //private http:HttpClientModule,
    private plt:Platform,
    private router:Router,
    private http:HttpClient,
    private helper:JwtHelperService,
    private alertController: AlertController) {
      this.plt.ready().then(() => {
        this.checkToken();
     });
     }
     getprofile() {
      return this.http.get(`${url}/api/mobme?token=` + localStorage.getItem("access_token"));
    }

    checkToken() {
      this.storage.get(TOKEN_KEY).then(token => {
        if (token) {
          let decoded = this.helper.decodeToken(token);
          let isExpired = this.helper.isTokenExpired(token);
   
          if (!isExpired) {
            this.user = decoded;
            this.authenticationState.next(true);
          } else {
            this.storage.remove(TOKEN_KEY);
          }
        }
      });
    }

    register(registerationForm) {
      return this.http.post(`${url}/api/mobsignup`, registerationForm,{ headers : new HttpHeaders ({'Content-Type': 'application/json' }) }).pipe(
        tap(res => {
          this.showAlertSuccess('Successfully Register');
          this.router.navigate(['/']);
        }),
        catchError(e => {
          this.showAlert('Unable to Authenticate');
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      );
    }

    login(credentials) {
      const new_header = new Headers();
      return this.http.post(`${url}/api/moblogin`, credentials,{ headers : new HttpHeaders ({'Content-Type': 'application/json' }) })
        .pipe(
          tap(res => {
            this.storage.set(TOKEN_KEY, res['token']);
            localStorage.setItem(TOKEN_KEY, res['token']);
            this.user = this.helper.decodeToken(res['token']);
            this.authenticationState.next(true);
            console.log(this.authenticationState.value);
            this.showAlertSuccess('Successfully Authenticated');
            this.router.navigate(['/']);
          }),
          catchError(e => {
            this.showAlert('Unable to Authenticate');
            throw new Error(e);
          })
        );
    }
    isAuthenticated() {
      return this.authenticationState.value;
    }
    showAlert(msg) {
      let alert = this.alertController.create({
        message: msg,
        header: 'Error',
        buttons: ['OK']
      });
      alert.then(alert => alert.present());
    }
    showAlertSuccess(msg) {
      let alert = this.alertController.create({
        message: msg,
        header: 'Congrats',
        buttons: ['OK']
      });
      alert.then(alert => alert.present());
    }
    logout() {
      this.storage.remove(TOKEN_KEY).then(() => {
        this.authenticationState.next(false);
      });
    }






    //this is previously done





    
    /* public login(login_data){
      if(login_data){
        this.autheticate_emiter.emit(true);
        this.is_authenticated = true;
        console.log(login_data);
      }else {
        this.autheticate_emiter.emit(false);
        this.is_authenticated = false;
      }
    } */

    public storeUserToken( user_token: string ) {
      localStorage.setItem('token', user_token);
    }
    public getUserToken() {
      return localStorage.getItem('token');
    }
    get isLoggedIn(){
      if (this.is_authenticated === true ){
       return true;
        }
      else{
        return false;
       }
     }


}
