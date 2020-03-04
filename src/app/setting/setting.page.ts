import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private authService:AuthService ) { }

  ngOnInit() {
    this.authService.getprofile().subscribe(
      data=>{
        
      }
    );
  }

}
