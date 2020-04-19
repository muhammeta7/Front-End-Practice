import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserViewModel} from "../sign-up/sign-up.component";
import {Channel} from "../channels/model/channel";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private BASE_URL = "http://localhost:8080";
    // User Endpoints
    private BASE_USERS_URL = `${this.BASE_URL}/users`;
    private CREATE_USER = `${this.BASE_URL}/register`;
    private GET_BY_USERNAME = `${this.BASE_USERS_URL}/username/`;
    private UPDATE_USER_NAME = `${this.BASE_USERS_URL}/update/username/`;
    private GET_USER_CHANNELS = `${this.BASE_USERS_URL}/channels/`;

    constructor(private http: HttpClient) {

    }

    // USER CRUD Operations
    getAllUsers(): Observable<UserViewModel[]>{
        return this.http.get<UserViewModel[]>(this.BASE_USERS_URL);
    }

    getUserByUserName(username: string): Observable<any> {
        return this.http.get<UserViewModel>(this.GET_BY_USERNAME+ username);
    }

    createUser(user: UserViewModel): Observable<any> {
        return this.http.post<UserViewModel>(this.CREATE_USER, user);
    }

    updateUserName(user: UserViewModel): Observable<any> {
        return this.http.post<UserViewModel>(this.UPDATE_USER_NAME + user.id, user);
    }

    getAllChannelsByUser(username: string): Observable<any> {
        return this.http.get<Channel[]>(this.GET_USER_CHANNELS + username);
    }

}
