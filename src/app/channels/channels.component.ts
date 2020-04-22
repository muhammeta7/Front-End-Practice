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
    channelUsers: UserViewModel[] = [];
    currentChannelId:number = 0;
    isShow:boolean = false;

    publicChannels:Channel[] = [];

    currentUser:UserViewModel = {
        id: null,
        firstName: '',
        lastName: '',
        connected: true,
        userName: '',
        password: '',
        messages: [],
        channels: []
    };

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

    newMessage:Message = null;

    dmChannels:Channel[] = [];
    otherUser:Observable<any>;
    dmChannelModel:Channel;

    constructor(private channelService: ChannelService,
                private messageService: MessageService,
                private userService: UserService
    ) { }

    ngOnInit() {
        this.getChannelsByUser(sessionStorage.getItem("username"));
        this.userService.getUserByUserName(sessionStorage.getItem('username')).subscribe(
            data => {
                this.currentUser = data;
                data.connected = true;
                console.log(data);
            });
        this.getAllUsers();
        this.getAllPublicChannels();
    }

    public showHiddenElement(){
        this.isShow = !this.isShow;
    }

    public getAllUsers(){
        this.userService.getAllUsers().subscribe(
            res => {
                this.channelUsers = res;
            }, error => {
                alert("Error");
            }
        );
    }

    public getAllPublicChannels(){
        this.channelService.getAllPublicChannels().subscribe(
            res => {
                this.publicChannels = res;
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
        );
    }

    sendMessage(messageModel: Message) {
        this.messageService.createMessage(this.currentChannelId,this.currentUser.id, messageModel).subscribe(
            res => {
                this.newMessage = res;
                this.channelMessages.push(this.newMessage);
            },error => {
                alert("Error while sending message.");
            }
        );
    }

    createChannel() {
        this.channelService.createChannel(this.currentUser.id,this.channelModel).subscribe(
            res => {
                this.channelModel.id = res.id ;
                this.channels.push(this.channelModel);
                console.log(res);
            },error => {
                alert("An error has occurred while creating Channel.");
            }
        );
    }

    createDmChannel(otherUserName:string){
        this.channelService.createDmChannel(this.currentUser.userName, otherUserName, this.dmChannelModel).subscribe(
            res => {
                this.dmChannelModel.id = res.id;
                this.otherUser = this.userService.getUserByUserName(otherUserName);
                console.log(this.otherUser);
                this.dmChannelModel.channelName = this.currentUser.userName + 'and' + otherUserName;
                this.dmChannels.push(this.dmChannelModel);
                console.log(res);
            },error => {
                alert("An error has occurred while creating Channel.");
            }
        );
    }

    updateChannel(updatedChannel: Channel) {
        this.channelService.createChannel(this.currentUser.id,updatedChannel).subscribe(
            res => {

            },error => {
                alert("An error has occurred while updating Channel")
            }
        );
    }

    updateChannelPrivacy(updatedChannel: Channel){
        if(!updatedChannel.isPrivate){
            this.publicChannels = this.publicChannels.filter(obj => obj.id !== updatedChannel.id);
        } else {
            this.publicChannels.push(updatedChannel);
        }
        updatedChannel.isPrivate = !updatedChannel.isPrivate;
        this.channelService.updatePrivacy(updatedChannel).subscribe(
            res => {

            },error => {
                alert("error");
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
        this.currentChannelId = channel.id;
        this.messageService.getChannelMessages(channel.id).subscribe(
            res => {
                this.channelMessages = res;
            },
            error => {
                alert("Error occurred while retrieving messages");
            }
        );
    }

}
