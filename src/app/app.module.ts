import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ChannelsComponent} from './channels/channels.component';
import {MessagesComponent} from './messages/messages.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';

import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { LogoutComponent } from './logout/logout.component';
import {BasicAuthHttpInterceptorService} from "./shared/basic-auth-http-interceptor.service";


const appRoutes: Routes = [
    {
        path: 'channels',
        component: ChannelsComponent
    },
    {
        path: 'messages',
        component: MessagesComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }

];

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        NotFoundComponent,
        ChannelsComponent,
        MessagesComponent,
        LoginComponent,
        SignUpComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot(appRoutes, {enableTracing: true})
    ],
    providers: [
        { provide:HTTP_INTERCEPTORS, useClass:BasicAuthHttpInterceptorService, multi:true }
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
