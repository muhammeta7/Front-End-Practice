import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Message} from "../messages/model/message";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private BASE_URL = "http://localhost:8080";
    // Message Endpoints
    private BASE_MESSAGES_URL = `${this.BASE_URL}/messages`;
    private GET_MESSAGE_URL = `${this.BASE_URL}/messages`;
    private CREATE_MESSAGE_URL = `${this.BASE_MESSAGES_URL}/channel/1/sender/1`;
    private GET_CHANNEL_MESSAGES = `${this.BASE_URL}/channels/chat/`;
    private ACTUAL_CREATE_MESSAGE = `${this.BASE_MESSAGES_URL}/channel/`;

    constructor(private http: HttpClient) {

    }

    getMessage(id: number): Observable<any> {
        return this.http.get<Message>(this.GET_MESSAGE_URL + '/' + id);
    }

    getAllMessages(): Observable<Message[]> {
        return this.http.get<Message[]>(this.BASE_MESSAGES_URL);
    }

    createMessage(message: Message) {
        return this.http.post<Message>(this.CREATE_MESSAGE_URL, message);
    }

    createMessageWorks(channelId:number, userId:number, message: Message){
        return this.http.post<Message>(this.ACTUAL_CREATE_MESSAGE + channelId + '/sender/' + userId, message);
    }

    getChannelMessages(id: number): Observable<Message[]> {
        return this.http.get<Message[]>(this.GET_CHANNEL_MESSAGES + id);
    }


}
