import { Component, OnDestroy, OnChanges,DoCheck } from '@angular/core';
import { MessageService } from "./message.service";
import { Subscription } from 'rxjs';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnDestroy,OnChanges,DoCheck {

	message: any = {};
	subscription: Subscription;
	public alerts: any[];

    constructor(private messageService: MessageService) {
        // subscribe to app component messages
		this.subscription = this.messageService.getMessage().subscribe(message => { this.showMessage(message.text,message.type) });
		this.alerts = [];
	}
	
	showMessage(message:string, type : string): void {
		this.alerts.push({
		  	type: type,
		  	msg: message,
		  	timeout: 5000
		});
	}
	 
	onClosed(dismissedAlert: AlertComponent): void {
		this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
	}

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        //this.subscription.unsubscribe();
    }

	ngOnChanges(){
		//this.subscription.unsubscribe();
	}

	ngDoCheck(){
		//this.subscription.unsubscribe();
	}
}
