import { Injectable } from "@angular/core";
import { GLOBAL } from 'src/global';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Song } from '../models/song';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable()

export class SongService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = GLOBAL.url
    }

    save(token: string, song: Song):Observable<any>{
        let param = JSON.stringify(song);
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })

        return this._http.post(this.url+'song',param,{headers : headers});
    }

    getSongs(token: string,albumId: string):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })
        return this._http.get(this.url+'songs/'+albumId, { headers: headers });
    }

    getSong(token:string, songId: string):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })
        return this._http.get(this.url+'song/'+songId, { headers: headers });
    }

    upload(token: string, song:Song, songId:String):Observable<any>{
        let param = JSON.stringify(song);
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })
        return this._http.put(this.url+'update_song/'+songId,param,{ headers: headers });
    }

    delete(token: string,songId: string):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })
        return this._http.delete(this.url+'delete_song/'+songId,{headers : headers });
    }

    playback(token: string, user: User, song: Song):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })
        let param = JSON.stringify({ user : user._id, song: song._id });
        return this._http.post(this.url+'playback',param,{headers : headers});
    }

    getTopSongs(token: string):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })
        return this._http.get(this.url+'playcounter/',{headers : headers });
    }

    getSongsByGenre(token: string, genre: string, page: string):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })
        return this._http.get(this.url+'filter/'+genre.toUpperCase()+'/'+page,{headers: headers});
    }
}