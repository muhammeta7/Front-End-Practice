import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Channel} from "../channels/model/channel"
import {UserViewModel} from "../sign-up/sign-up.component";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8080";
  private BASE_USERS_URL = `${this.BASE_URL}\\users`;
  private BASE_CHANNELS_URL = `${this.BASE_URL}\\channels`

  // User Endpoints
  private CREATE_USER_URL = `${this.BASE_USERS_URL}\\create`;

  // Channel Endpoints
  private CREATE_CHANNEL_URL = `${this.BASE_CHANNELS_URL}\\create\\user\\1`;

  constructor(private http: HttpClient) {

  }

  getAllChannels() : Observable<Channel[]>{
    return this.http.get<Channel[]>(this.BASE_CHANNELS_URL);
  }

  createUser(user: UserViewModel): Observable<any>{
    return this.http.post(this.CREATE_USER_URL, user);
  }

  createChannel(channel: Channel) {
    return this.http.post<Channel>(this.CREATE_CHANNEL_URL, channel);
  }
}
