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
        console.log('=============================');
        console.log(this.currentUser);
        console.log('=============================');
    }

    // updateUserName(updatedUser: UserViewModel){
    //     this.userService.updateUserName(updatedUser).subscribe(
    //         result => {
    //             sessionStorage.setItem(updatedUser.userName, result.userName);
    //         },error => {
    //             alert("Error updating user name")
    //         }
    //     );
    // }
}
