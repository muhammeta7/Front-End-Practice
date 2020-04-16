import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Channel} from "../channels/model/channel";
import {Message} from "../messages/model/message";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ChannelService {
    private BASE_URL = "http://localhost:8080";
    private BASE_MESSAGES_URL = `${this.BASE_URL}/messages`;

    constructor(private http: HttpClient) {

    }

    // CHANNEL ENDPOINTS
    private BASE_CHANNELS_URL = `${this.BASE_URL}/channels`;
    // TODO Channels Always Being created by user 1
    private GET_CHANNEL_BYID = `${this.BASE_CHANNELS_URL}`;
    private CREATE_CHANNEL_URL = `${this.BASE_CHANNELS_URL}/create/user/1`;
    // private CREATE_CHANNEL_URL = `${this.BASE_CHANNELS_URL}\\create\\user`;
    private DELETE_CHANNEL_URL = `${this.BASE_CHANNELS_URL}\\`;
    private GET_CHANNEL_MESSAGES = `${this.BASE_CHANNELS_URL}/chat/`;
    private CREATE_MESSAGE_URL = `${this.BASE_MESSAGES_URL}/channel/1/sender/1`;


    //
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

    createMessage(message: Message) {
        return this.http.post<Message>(this.CREATE_MESSAGE_URL, message);
    }

    deleteChannel(id: number): Observable<any> {
        return this.http.delete(this.DELETE_CHANNEL_URL + id);
    }

    getChannelMessages(id: number): Observable<Message[]> {
        return this.http.get<Message[]>(this.GET_CHANNEL_MESSAGES + id);
    }
}