import { Component, Input, OnInit } from '@angular/core';
import {BaseAuthComponent} from '../base.component.ts';
import { RouteConfig, RouteParams, Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Chat, ChatService } from './chat.service.ts';
import { User, UserService } from '../user/user.service.ts'
import { Observable } from 'rxjs/Rx';


@Component({
    selector: 'chat-create',
    templateUrl: 'app/chat/chat.create.component.html',
    styles: [`    
    a {
      text-decoration: none;
    }

    a:hover {
      text-decoration: none;
      cursor: pointer;
    }`],
    directives: [ROUTER_DIRECTIVES]
})
export class ChatCreateComponent extends BaseAuthComponent implements OnInit {
    errorMessage: string;

    observableUsers: Observable<User[]>;
    users: User[];
    selectedUsers: User[];

    constructor(
        private _chatService: ChatService,
        protected _userService: UserService,
        protected _router: Router
    ) {
        super(_router, _userService);
        super.registerService(_chatService);
     }

    ngOnInit() {
        this.observableUsers = this._userService.getUsers();
        if(this.observableUsers){
            this.observableUsers.subscribe(users => {
                this.users = users;
            });
        }
    }

    addUser(user: User) {

        if (!this.selectedUsers) {
            this.selectedUsers = [];
        }

        if (this.findUserIndex(this.selectedUsers, user) >= 0)
            return;


        this.removeUserFromArray(this.users, user);
        this.selectedUsers.push(user);
    }

    removeUser(user) {
        this.removeUserFromArray(this.selectedUsers, user);
        this.users.push(user);
    }

    createChat() {

        this._chatService
            .createChatroom(this.selectedUsers)
            .subscribe(
            chatroom => this._router.navigate(['Room', {id: chatroom._id}]),
            error => this.errorMessage = <any>error
            );
    }

    private removeUserFromArray(arry, user) {
        let index = this.findUserIndex(arry, user);
        arry.splice(index, 1);
    }

    private findUserIndex(arry, user) {
        return arry.findIndex(function (u) {
            return u._id === user._id;
        });
    }

}