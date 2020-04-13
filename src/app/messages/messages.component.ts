import { Component, OnInit } from '@angular/core';
import {Message} from "./model/message";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }



}
