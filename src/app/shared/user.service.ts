import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserViewModel} from "../sign-up/sign-up.component";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private BASE_URL = "http://localhost:8080";

    constructor(private http: HttpClient) {
    }

    // User Endpoints
    private BASE_USERS_URL = `${this.BASE_URL}/users`;
    private CREATE_USER_URL = `${this.BASE_USERS_URL}/create`;
    private GET_USER_URL = `${this.BASE_USERS_URL}/`;


    getUserById(id: Number): Observable<UserViewModel> {
        return this.http.get<UserViewModel>(this.GET_USER_URL + id)
    }

    // USER CRUD Operations
    createUser(user: UserViewModel): Observable<any> {
        return this.http.post(this.CREATE_USER_URL, user);
    }


}
