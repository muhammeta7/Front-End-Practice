import { Component, OnInit } from '@angular/core';
import {ApiService} from "../shared/api.service";
import {Message} from "../messages/model/message";
import {Channel} from "../channels/model/channel";

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
    password: '',
    messages: [],
    channels:[]
  };

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }

  createUser(): void{
    this.apiService.createUser(this.userModel).subscribe(
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
  messages: Message[];
  channels: Channel[];
}
