import {Component, OnInit} from '@angular/core';
import {UserViewModel} from "../sign-up/sign-up.component";
import {UserService} from "../shared/user.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    currentUser: UserViewModel = undefined;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.userService.getUserByUserName(sessionStorage.getItem('username')).subscribe(
            data => {this.currentUser = data}
            );
    }

}
