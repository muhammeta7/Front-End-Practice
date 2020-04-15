import { Component, OnInit } from '@angular/core';
import {Channel} from "./model/channel";
import {ApiService} from "../shared/api.service";
import {Message} from "../messages/model/message";
import {UserViewModel} from "../sign-up/sign-up.component";

@Component({
    selector: 'app-channels',
    templateUrl: './channels.component.html',
    styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
    channels: Channel[] = [];
    channelMessages: Message[] = [];
    channelUsers: UserViewModel[] = [];

    channelModel:Channel = {
        id: null,
        channelName:'',
        isPrivate: true,
        messages:[],
        users: []
    };

    // userModel: UserViewModel = {
    //     id: 2,
    //     firstName : '',
    //     lastName : '',
    //     connected: true,
    //     userName: '',
    //     password: '',
    //     messages: [],
    //     channels:[]
    // }

    constructor(private apiService: ApiService) { }

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
        this.apiService.createChannel(this.channelModel).subscribe(
            res => {
                this.channelModel.id = res.id ;
                this.channels.push(this.channelModel);
            },error => {
                {alert("An error has occurred while creating Channel")}
            }
        );
    }

    // createChannelUser() {
    //     this.apiService.createChannelUser(this.userModel, this.channelModel).subscribe(
    //         res => {
    //             this.channelModel.id = res.id ;
    //             this.channels.push(this.channelModel);
    //             this.userModel.channels.push(this.channelModel);
    //             this.channelUsers.push(this.userModel);
    //         },error => {
    //             {alert("An error has occurred while creating Channel")}
    //         }
    //     );
    // }

    updateChannel(updatedChannel: Channel) {
        this.apiService.createChannel(updatedChannel).subscribe(
            res => {

            },error => {
                {alert("An error has occurred while updating Channel")}
            }
        );
    }

    deleteChannel(channel: Channel) {
        if(confirm("Are you sure you would like to delete this channel")){
            this.apiService.deleteChannel(channel.id).subscribe(
                res => {
                    let index = this.channels.indexOf(channel);
                    this.channels.splice(index, 1);
                }, error => {
                    alert("Could not delete channel");
                }
            );
        }
    }

    getChannelMessages(channel: Channel){
        this.apiService.getChannelMessages(channel.id).subscribe(
            res => {
                this.channelMessages = res;
            },
            error => {
                alert("Error occurred while retrieving messages");
            }
        );
    }


}
