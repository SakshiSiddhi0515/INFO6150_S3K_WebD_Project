import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GLOBAL } from '../../global';
import { User } from '../models/user';
import { MessageService } from "../messages/message.service";

@Injectable()

export class UserService {
    public url: string;
    public token;
    public user: User;

    constructor(
        private _http: HttpClient,
        private messageService: MessageService
    ) { 
        this.url = GLOBAL.url;
    }

    logout(){
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }

    login(user: User):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'login', params ,{headers : headers});
    }

    getToken(user):Observable<any>{
        user.getToken = true;
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'login', params ,{headers : headers});
    }

    getUserLogged(){
        return JSON.parse(localStorage.getItem("currentUser"));
    }

    getTokenInLocalStorage(){
        let token = localStorage.getItem("token");

        if(token != undefined){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }

    newUser(user: User):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'user/create_user', params, { headers : headers });
    }

    getUsers(page):Observable<any>{
        let params = localStorage.getItem("currentUser");
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : this.getTokenInLocalStorage()
        });

        return this._http.post(this.url+'user/list/'+page, params, { headers :headers });
    }

    getUser(idUser: string): Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : this.getTokenInLocalStorage()
        });

        return this._http.get(this.url+'user/'+idUser,{ headers : headers } );
    }

    updateUser(idUser: string, user : User): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : this.getTokenInLocalStorage()
        });

        return this._http.put(this.url+'user/update/'+idUser, params, { headers : headers });
    }

    deleteUser(idUser: string): Observable<any>{
        
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : this.getTokenInLocalStorage()
        });

        return this._http.delete(this.url+'user/delete/'+idUser, { headers : headers });
    }

}