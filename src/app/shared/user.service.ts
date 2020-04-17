import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserViewModel} from "../sign-up/sign-up.component";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private BASE_URL = "http://localhost:8080";
    // User Endpoints
    private BASE_USERS_URL = `${this.BASE_URL}/users`;
    private CREATE_USER_URL = `${this.BASE_USERS_URL}/create`;
    private GET_USER_URL = `${this.BASE_USERS_URL}/`;
    private CREATE_USER = `${this.BASE_URL}/register`;

    constructor(private http: HttpClient) {

    }

    getUserById(id: number): Observable<UserViewModel> {
        return this.http.get<UserViewModel>(this.GET_USER_URL + id)
    }

    // USER CRUD Operations
    createUser(user: UserViewModel): Observable<any> {
        return this.http.post(this.CREATE_USER, user);
    }

}
