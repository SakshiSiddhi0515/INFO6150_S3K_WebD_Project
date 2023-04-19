import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router,CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
		private _route:Router,
		private _userService: UserService
	){
		
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		let user = this._userService.getUserLogged();
		
		if(user && (user.role == 'ROLE_ADMIN' || user.role == 'ROLE_USER')){
			return true;
		}
		
		this._route.navigate(['create']);
		return false;
		
	}
	
}
