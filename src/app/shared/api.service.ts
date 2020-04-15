import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Channel} from "../channels/model/channel"
import {UserViewModel} from "../sign-up/sign-up.component";
import {Message} from "../messages/model/message";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8080";
  private BASE_USERS_URL = `${this.BASE_URL}\\users`;


  // User Endpoints
  private CREATE_USER_URL = `${this.BASE_USERS_URL}\\create`;
  // private CONNECT_USER_URL =  `${this.BASE_USERS_URL}\\:{id}\\connect`;
  
  // Message Endpoints

  constructor(private http: HttpClient) {

  }

  // Channel Endpoints & CRUD Operations
  private BASE_CHANNELS_URL = `${this.BASE_URL}\\channels`
  // TODO Channels Always Being created by user 1
  private CREATE_CHANNEL_URL = `${this.BASE_CHANNELS_URL}\\create\\user\\1`;
  // private CREATE_CHANNEL_URL1 = `${this.BASE_CHANNELS_URL}\\create\\user`;
  private DELETE_CHANNEL_URL = `${this.BASE_CHANNELS_URL}\\`;
  private GET_CHANNEL_MESSAGES = `${this.BASE_CHANNELS_URL}\\chat\\`;

  getAllChannels() : Observable<Channel[]>{
    return this.http.get<Channel[]>(this.BASE_CHANNELS_URL);
  }

  createUser(user: UserViewModel): Observable<any>{
    return this.http.post(this.CREATE_USER_URL, user);
  }

  // TODO Fix method to take in user after logging in
  createChannel(channel: Channel) {
    return this.http.post<Channel>(this.CREATE_CHANNEL_URL, channel);
  }

  // createChannelUser(user: UserViewModel, channel:Channel){
  //   return this.http.post<Channel>(this.CREATE_CHANNEL_URL1 + "/" + user.id, channel);
  // }

  deleteChannel(id:number): Observable<any>{
    return this.http.delete(this.DELETE_CHANNEL_URL + id)
  }

  getChannelMessages(id:number): Observable<Message[]>{
    return this.http.get<Message[]>(this.GET_CHANNEL_MESSAGES + id)
  }
}
