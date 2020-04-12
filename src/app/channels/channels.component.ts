import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Channel} from "../models/channel";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  channels: Channel[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllChannels();
  }

  public getAllChannels(){
    let url = "http://localhost:8080/channels";
    this.http.get<Channel[]>(url).subscribe(
        res => {
          this.channels = res;
        },
        error => {
          alert("An error has occurred;")
        }
    );
  }
}
