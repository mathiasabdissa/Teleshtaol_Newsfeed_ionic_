import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialsForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe();
  }
  register() {
    this.authService.logout();
    if(this.authService.isAuthenticated()){
      console.log('Authenticated');
  }else{
    this.router.navigate(['/register']);
    console.log('Not Authenticated');
  }
     //this.authService.isAuthenticated(); 
     //this.authService.logout();
      
    /*});*/
    
    //console.log(this.credentialsForm.value);
  }
}
