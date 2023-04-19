import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
	path: ActivatedRouteSnapshot[];
	route: ActivatedRouteSnapshot;
	constructor(
		private _route:Router,
		private _userService: UserService
	){
		
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		let user = this._userService.getUserLogged();
		
		if(user.role == 'ROLE_ADMIN'){
			return true;
		}
		
		this._route.navigate(['dashboard/home']);
		return false;
		
	}
	


}
