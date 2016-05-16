import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';

import { User, UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: 'app/user/user.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class UserComponent implements OnInit {
  @Input() user: User;

 errorMessage: string;

  constructor(
    private _userService: UserService,
    private _routeParams: RouteParams,
    private _router: Router) { }

  ngOnInit() {
    if (!this.user && this._routeParams.get('id')){
      let id = this._routeParams.get('id');
      this._userService.getUser(id)
        .subscribe(user => console.log(user));
    }
  }
  
  loginClicked(email, firstName) {
    let user = new User();
    user.email = email;
    user.firstName = firstName;
    
    this._userService.loginUser(user)
                    .subscribe(
                       user  => {
                         console.log(user);
                       },
                       error =>  this.errorMessage = <any>error);
  }

//   private _gotoCharacters() {
//     let route = ['Characters', { id: this.character ? this.character.id : null }]
//     this._router.navigate(route);
//   }

//   private _setEditCharacter(character: Character) {
//     if (character) {
//       this.character = character;
//     } else {
//       this._gotoCharacters();
//     }
//   }
}
