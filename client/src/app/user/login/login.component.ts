import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from '../user.service';
import { MessageService } from "../../messages/message.service";
import { transAnimation } from "../../animation/animation";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [UserService,MessageService],
  animations: [transAnimation]
})
export class LoginComponent implements OnInit,OnDestroy {
	public user: User;
	public userToCreate: User;
	public message: String;
	public token;
	public loginForm: boolean;
	public title: string;
	public description: string;

	constructor(
		private _userService : UserService,
		private _route : ActivatedRoute,
		private _router : Router,
		private _messageService: MessageService
	) { 
		this.user = new User('','','','','','','');
		this.userToCreate = new User('','','','','','','ROLE_USER');
		this.loginForm = false;
		this.title = 'New user';
		this.description = '';
	}

	ngOnInit() {
		const body = document.getElementsByTagName('body')[0];
    	body.classList.add('login-background');
	}

	ngOnDestroy(){
		const body = document.getElementsByTagName('body')[0];
    	body.classList.remove('login-background');
	}

  	onSubmit(){
      	this._userService.login(this.user).subscribe(
			response =>{
			
				if(response.message){
					this._messageService.sendMessage(response.message,'danger');
				}else{
					
					this._userService.getToken(this.user).subscribe(
						resp =>{
							this.token = resp.token;
							if(this.token.length <= 0){
								this.message = resp.message;
							}else{
								this.user = response.user;
								localStorage.setItem('token',this.token);
								localStorage.setItem('currentUser', JSON.stringify(this.user));
								
								this._router.navigate(['/dashboard/home']);
							}
						},
						err => {
							this._messageService.sendMessage('Error in the request, try again','danger');;
						}
					)
				}
			},
			error => {
				this._messageService.sendMessage('Error in the request, try again','danger');;
			}
      	)
	}
	  
	showCreateForm(){
		this.title = 'New user';
		this.loginForm = false;
	}

	showLoginForm(){
		this.title = 'Log in';
		this.loginForm = true;
	}

	addUser() {
		this._userService.newUser(this.userToCreate).subscribe(
			response => {
				if(!response.user){
					this._messageService.sendMessage(response.message,'danger');
				}else{
					this.userToCreate = response.user;
					this._messageService.sendMessage('The user has been created successfully, please log in','success');
				}
			},
			error => {
				this._messageService.sendMessage('Error in the request, try again','danger');
			}
		)	
	}

}
