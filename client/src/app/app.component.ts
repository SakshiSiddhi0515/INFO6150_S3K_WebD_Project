import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
	title = 'hello word';
	public identity;
	  
	ngDoCheck(){
		this.userExist();
	}

	userExist(){
		let currentUser = localStorage.getItem('currentUser');

		if(currentUser != null && typeof currentUser !== undefined){
			this.identity = currentUser
		}else{
			this.identity = false;
		}

		
	}
}
