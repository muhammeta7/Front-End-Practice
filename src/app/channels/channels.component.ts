import { Component, OnInit } from '@angular/core';
import {Channel} from "./model/channel";
import {Message} from "../messages/model/message";
import {UserViewModel} from "../sign-up/sign-up.component";
import {ChannelService} from "../shared/channel.service";
import {MessageService} from "../shared/message.service";
import {UserService} from "../shared/user.service";

@Component({
    selector: 'app-channels',
    templateUrl: './channels.component.html',
    styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
    channels: Channel[] = [];
    channelMessages: Message[] = [];
    channelUsers: UserViewModel[] = [];
    isShow:boolean = false;
    currentUser:UserViewModel;
    currentChannelId:number = 0;

    publicChannels:Channel[] = [];

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
        );
    }

    sendMessage2(messageModel: Message) {
        console.log(this.currentChannelId);
        this.messageService.createMessageWorks(this.currentChannelId,this.currentUser.id, messageModel).subscribe(
            res => {
                this.messageModel = res;
                this.channelMessages.push(this.messageModel);
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

    updateChannel(updatedChannel: Channel) {
        this.channelService.createChannel(this.currentUser.id,updatedChannel).subscribe(
            res => {

            },error => {
                alert("An error has occurred while updating Channel")
            }
        );
    }

    // TODO fix it so you cant keep adding the channel to public channels array
    updateChannelPrivacy(updatedChannel: Channel){
        this.channelService.updatePrivacy(updatedChannel).subscribe(
            res => {
                updatedChannel.isPrivate = res.isPrivate;
                if(res.isPrivate === true){
                    this.channels.push(updatedChannel);
                } else {
                    this.publicChannels.push(updatedChannel);
                }
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
