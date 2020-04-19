import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Channel} from "../channels/model/channel";
import {Message} from "../messages/model/message";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class ChannelService {
    private BASE_URL = "http://localhost:8080";
    private BASE_MESSAGES_URL = `${this.BASE_URL}/messages`;
    // CHANNEL ENDPOINTS
    private BASE_CHANNELS_URL = `${this.BASE_URL}/channels`;
    // TODO Channels Always Being created by user 1
    private GET_CHANNEL_BYID = `${this.BASE_CHANNELS_URL}`;
    private CREATE_CHANNEL_URL = `${this.BASE_CHANNELS_URL}/create/user/`;
    private DELETE_CHANNEL_URL = `${this.BASE_CHANNELS_URL}/`;

    constructor(private http: HttpClient) {

    }

    //
    getAllChannels(): Observable<Channel[]> {
        return this.http.get<Channel[]>(this.BASE_CHANNELS_URL);
    }

    getChannelById(id: number): Observable<Channel> {
        return this.http.get<Channel>(this.GET_CHANNEL_BYID + '/' + id)
    }

    createChannel(id:number, channel:Channel){
      return this.http.post<Channel>(this.CREATE_CHANNEL_URL + id, channel);
    }

    deleteChannel(id: number): Observable<any> {
        return this.http.delete(this.DELETE_CHANNEL_URL + id);
    }

}
