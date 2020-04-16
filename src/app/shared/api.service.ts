import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Channel} from "../channels/model/channel"
import {Message} from "../messages/model/message";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private BASE_URL = "http://localhost:8080";
    // Message Endpoints
    private BASE_MESSAGES_URL = `${this.BASE_URL}\\messages`;


    // private CONNECT_USER_URL =  `${this.BASE_USERS_URL}\\:{id}\\connect`;
    // TODO UPDATE TO MAKE DYNAMIC WITH USER AND CHANNEL
    private CREATE_MESSAGE_URL = `${this.BASE_MESSAGES_URL}\\channel\\1\\sender\\1`;
    // Channel Endpoints & CRUD Operations
    private BASE_CHANNELS_URL = `${this.BASE_URL}/channels`;
    // TODO Channels Always Being created by user 1
    private GET_CHANNEL_BYID = `${this.BASE_CHANNELS_URL}`;
    private CREATE_CHANNEL_URL = `${this.BASE_CHANNELS_URL}/create/user/1`;
    // private CREATE_CHANNEL_URL = `${this.BASE_CHANNELS_URL}\\create\\user`;
    private DELETE_CHANNEL_URL = `${this.BASE_CHANNELS_URL}\\`;
    private GET_CHANNEL_MESSAGES = `${this.BASE_CHANNELS_URL}/chat/`;

    constructor(private http: HttpClient) {

    }

    // MESSAGE CRUD Operations
    createMessage(message: Message) {
        return this.http.post<Message>(this.CREATE_MESSAGE_URL, message);
    }

    // TODO Fix method to take in user after logging in

    // CHANNEL CRUD Operations
    getAllChannels(): Observable<Channel[]> {
        return this.http.get<Channel[]>(this.BASE_CHANNELS_URL);
    }

    createChannel(channel: Channel) {
        return this.http.post<Channel>(this.CREATE_CHANNEL_URL, channel);
    }

    getChannelById(id: number): Observable<Channel> {
        return this.http.get<Channel>(this.GET_CHANNEL_BYID + '/' + id)
    }

    // createChannel(user: UserViewModel, channel:Channel){
    //   return this.http.post<Channel>(this.CREATE_CHANNEL_URL1 + "/" + user.id, channel);
    // }

    deleteChannel(id: number): Observable<any> {
        return this.http.delete(this.DELETE_CHANNEL_URL + id)
    }

    getChannelMessages(id: number): Observable<Message[]> {
        return this.http.get<Message[]>(this.GET_CHANNEL_MESSAGES + id)
    }
}
