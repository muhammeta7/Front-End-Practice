import { Component, OnInit } from '@angular/core';
import {Channel} from "./model/channel";
import {Message} from "../messages/model/message";
import {UserViewModel} from "../sign-up/sign-up.component";
import {ChannelService} from "../shared/channel.service";
import {MessageService} from "../shared/message.service";
import {UserService} from "../shared/user.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-channels',
    templateUrl: './channels.component.html',
    styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
    channels: Channel[] = [];
    channelMessages: Message[] = [];
    isShow:boolean = false;
    currentUser:UserViewModel = undefined;


    channelModel:Channel = {
        id: null,
        channelName:'',
        isPrivate: true,
        messages:[],
        users: []
    };

    messageModel: Message = {
        id: null,
        content: '',
        timestamp: null,
        sender: null,
        channel: null
    };

    constructor(private channelService: ChannelService,
                private messageService: MessageService,
                private userService: UserService) { }

    ngOnInit() {
        this.getChannelsByUser(sessionStorage.getItem("username"));
        // console.log(sessionStorage.getItem("username"));
    }

    public showHiddenElement(){
        this.isShow = !this.isShow;
    }

    public getAllChannels(){
        this.channelService.getAllChannels().subscribe(
            res => {
                this.channels = res;
            },
            error => {
                alert("An error has occurred.");
            }
        );
    }

    public getChannelsByUser(username: string){
        this.userService.getAllChannelsByUser(username).subscribe(
            res => {
                this.channels = res;
            }, error =>{
                alert("An error has occurred.");
            }
        );
    }

    public getChannelById(id: number){
        this.channelService.getChannelById(this.channelModel.id).subscribe(
            res => {
                this.channelModel = res;
            }, error => {
                alert("This channel does not exist.");
            }
        )
    }

    createChannel() {
        this.channelService.createChannel(this.channelModel).subscribe(
            res => {
                this.channelModel.id = res.id ;
                this.channels.push(this.channelModel);
            },error => {
                alert("An error has occurred while creating Channel.");
            }
        );
    }

    createChannelI() {
        // this.userService.getUserByUserName(sessionStorage.getItem("username")).subscribe(
        //     data => { this.currentUser = data}
        // );
        // this.channelService.createChannelI(this.currentUser.id,this.channelModel).subscribe(
        //     res => {
        //         this.channelModel.id = res.id ;
        //         this.channels.push(this.channelModel);
        //     },error => {
        //         alert("An error has occurred while creating Channel.");
        //     }
        // );
    }

    // createChannelUser() {
    //     this.channelService.createChannelUser(this.userModel, this.channelModel).subscribe(
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
        this.channelService.createChannel(updatedChannel).subscribe(
            res => {

            },error => {
                alert("An error has occurred while updating Channel")
            }
        );
    }

    deleteChannel(channel: Channel) {
        if(confirm("Are you sure you would like to delete this channel")){
            this.channelService.deleteChannel(channel.id).subscribe(
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
        this.messageService.getChannelMessages(channel.id).subscribe(
            res => {
                this.channelMessages = res;
            },
            error => {
                alert("Error occurred while retrieving messages");
            }
        );
    }

    sendMessage(message:Message){
        this.channelService.createMessage(message).subscribe(
            res => {
                this.messageModel.id = res.id;
                this.messageModel.sender = res.sender;
                this.channelMessages.push(this.messageModel);
            }, error => {
                alert("Error while creating message.");
            }
        );
    }

}
