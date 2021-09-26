import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from './users.objects';
import { NewsPage } from '../news/news.page';
import { NewsDetailPage } from '../news-detail/news-detail.page';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public user_data = new User();
  constructor(private authService:AuthService,
    private newpage:NewsPage,
    private newsdetail:NewsDetailPage,
    ) { }

  ngOnInit() {
    this.UserProfileComponent();
    console.log(this.authService.authenticationState.value);
    this.authService.UserProfileDataEmitter.subscribe(
      data=>{
        this.user_data = data; 
        //console.log(this.user_data.name)
      }
    );
  }
  public UserProfileComponent(){
    this.authService.getprofile();
  }
  logout(){
    this.authService.logout();
    
    
  }

}
