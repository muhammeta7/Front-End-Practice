import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  userModel:UserViewModel = {
    firstName : '',
    lastName : '',
    connected: true,
    userName: '',
    password: ''
  };
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  createUser(): void{
    let url = "http://localhost:8080/users/create";
    this.http.post(url, this.userModel).subscribe(
        res => {
          location.reload();
        },
        err => {
          alert("An error has occurred while creating user!")
        }
    );
  }

}

export interface UserViewModel{
  firstName : string;
  lastName : string;
  connected: boolean;
  userName: string;
  password: string;
}
