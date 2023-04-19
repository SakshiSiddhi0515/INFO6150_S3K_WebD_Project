import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { Route, Router, Params, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component'
import { MessageService } from 'src/app/messages/message.service';
import { transAnimation } from "../../animation/animation";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
	providers : [UserService, MessageService],
	animations: [ transAnimation]
})
export class UserListComponent implements OnInit {
	public users : User[];
	public nextPage;
	public prePage;
	public idUserToDelete: string;
	public modalRef: BsModalRef;
	public page: number;
    public totalRows: number;

  	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router,
		private modalService: BsModalService,
		private _messageService: MessageService
	) {
		this.idUserToDelete = null;
		this.page = 1;
		this.totalRows = 0;
	}

	ngOnInit() {
		this.getUsers();
	}

	getUsers(){
		this._userService.getUsers(this.page).subscribe(
			response => {
				if(response.users){
					this.users = response.users.docs;
					this.totalRows = response.users.total;
				}
			},
			error => {
				console.log(error);	
			}
		)
	}

	openModal(template: TemplateRef<any>, idUser: string) {
		this.idUserToDelete = idUser;
		this.modalRef = this.modalService.show(template);
	}

	confirm(){
		if(this.idUserToDelete != null){
			this._userService.deleteUser(this.idUserToDelete).subscribe(
				response => {
					if(!response.user){
						this._messageService.sendMessage(response.message, "danger");
					}else{
						this._messageService.sendMessage('User successfully removed', "success");
						this.getUsers();
					}
				},
				error => {
					console.log(error);
				}
			)
		}
		this.modalRef.hide();
	}

	decline(){
		this.idUserToDelete = null;
		this.modalRef.hide();
	}

	pageChanged(event: any): void {
		console.log(event.page);
        this.page = event.page;
        this.getUsers();
    }

}
