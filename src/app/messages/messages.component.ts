import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/api.service";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {


    messageModel: {
        id: null,
        content: '',
        timestamp: null,
        sender: null,
        channel: null
    };

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
    }


}
