import {Component, OnInit} from '@angular/core';
import {Message} from "../messages/model/message";
import {Channel} from "../channels/model/channel";
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    userModel: UserViewModel = {
        id: null,
        firstName: '',
        lastName: '',
        connected: true,
        userName: '',
        password: '',
        messages: [],
        channels: []
    };

    constructor(private userService: UserService, private router:Router) {
    }

    ngOnInit(): void {
    }

    createUser(): void {
        this.userService.createUser(this.userModel).subscribe(
                res => {
                    this.router.navigate(['/login'])
                },
                err => {
                    alert("An error has occurred while creating user!");
                }
        );
    }



}

export interface UserViewModel {
    id: number;
    firstName: string;
    lastName: string;
    connected: boolean;
    userName: string;
    password: string;
    messages: Message[];
    channels: Channel[];
}
