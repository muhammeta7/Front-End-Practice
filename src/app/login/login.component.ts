import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    username = "javainuse";
    password = '';
    invalidLogin = false;

    constructor(private router: Router, private loginService: AuthenticationService) {

    }

    ngOnInit(){
    }

    checkLogin(){
      if(this.loginService.authenticate(this.username, this.password)){
        this.router.navigate(['/channels']);
        this.invalidLogin = false;
      } else {
        this.invalidLogin = true;
      }
    }
}
