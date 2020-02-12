import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string;
  password: string;
  passwordR: string;

  constructor(
    private auth:AuthService, 
    private router:Router
    ) { }

  ngOnInit() {
  }

  onSubmitRegister(){
    if(this.password != this.passwordR){
      alert("Las contraseñas no coinciden");
    }
    else{
      this.auth.register(this.email, this.password).then(auth => {

        this.router.navigate(['/login']);

      }).catch(err => console.log(err));
    }
  }

}
