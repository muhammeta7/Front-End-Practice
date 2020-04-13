import { Component, OnInit } from '@angular/core';
import {Channel} from "./model/channel";
import {ApiService} from "../shared/api.service";
import {UserViewModel} from "../sign-up/sign-up.component";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  channels: Channel[] = [];

  constructor(private apiService: ApiService ) { }

  ngOnInit() {
    this.getAllChannels();
  }

  public getAllChannels(){
    this.apiService.getAllChannels().subscribe(
        res => {
          this.channels = res;
        },
        error => {
          alert("An error has occurred;")
        }
    );
  }

  createChannel() {
    let newChannel: Channel = {
      id: null,
      channelName:'New Channel',
      isPrivate: true
    }

    this.apiService.createChannel(newChannel).subscribe(
        res => {
          newChannel.id = res.id;
          this.channels.push(newChannel);
        },error => {
          {alert("An error has occurred while creating Channel")}
        }
    )
  }
}
