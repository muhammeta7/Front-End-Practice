import { Component, OnInit } from '@angular/core';
import {Message} from "./model/message";
import {ApiService} from "../shared/api.service";
import {UserViewModel} from "../sign-up/sign-up.component";
import {Channel} from "../channels/model/channel";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {


  messageModel : {
    id: null,
    content: '',
    timestamp: null,
    sender: null,
    channel: null
  };

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }



}
