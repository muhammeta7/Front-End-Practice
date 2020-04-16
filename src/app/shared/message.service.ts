import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Message} from "../messages/model/message";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private BASE_URL = "http://localhost:8080";

    constructor(private http: HttpClient) {

    }

    // Message Endpoints
    private BASE_MESSAGES_URL = `${this.BASE_URL}/messages`;
    private GET_MESSAGE_URL = `${this.BASE_URL}/messages`;
    private CREATE_MESSAGE_URL = `${this.BASE_MESSAGES_URL}/channel/1/sender/1`;


    displayMessage(id: number): Observable<any> {
        return this.http.get<Message>(this.GET_MESSAGE_URL + '/' + id);
    }

    createMessage(message: Message) {
        return this.http.post<Message>(this.CREATE_MESSAGE_URL, message);
    }


}
