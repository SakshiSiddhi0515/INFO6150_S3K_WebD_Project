import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }    from '@angular/common/http';
import { GLOBAL } from 'src/global';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
    public url: string;
    // public currentSong = new BehaviorSubject<any>('');
    // myObservable$ = this.currentSong.asObservable();

    constructor(
        private _http: HttpClient
    ) {

        this.url = GLOBAL.url;
    }

    // setCurrentSong(data) {
    //     this.currentSong.next(data);
    // }

    // getCurrentSong() {
    //     return this.currentSong.asObservable();
    // }

    deleteArtist(token:string, id:string):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })

        return this._http.delete(this.url+'deleteArtist/'+id,{ headers: headers });
    }

    getArtists(token: string, page: string, limit:string) :Observable<any>{ 
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })

        return this._http.get(this.url+'artists/'+page+'/'+limit, { headers: headers });
    }

    updateArtist(token:string, id:string, artist:Artist):Observable<any>{
        let params = JSON.stringify(artist);
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })

        return this._http.put(this.url+'updateArtist/'+id, params,{headers: headers});
    }

    getArtist(token:string, id: string):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })
        return this._http.get(this.url+'artist/'+id,{headers: headers});
    }

    saveArtist(token:string, artist : Artist):Observable<any>{
        let params = JSON.stringify(artist);
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })

        return this._http.post(this.url+'saveArtist', params,{ headers: headers });
    }

}