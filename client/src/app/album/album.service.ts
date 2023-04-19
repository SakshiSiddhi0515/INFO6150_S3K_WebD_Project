import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from 'src/global';
import { Observable } from 'rxjs';
import { Album } from '../models/album';

@Injectable({
    providedIn: 'root',
})
export class AlbumService {
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    getAlbums(token: string, artistId: string, page: string, limit):Observable<any>{
        if(!limit){
            limit = 10;
        }
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })
        return this._http.get(this.url+'albums/'+artistId+'/'+page+'/'+limit,{ headers: headers });
    }

    getLastAlbums(token: string, limit: any):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })
        return this._http.get(this.url+'last_albums/'+limit,{ headers: headers });
    }

    saveAlbum(token: string, albumParams: Album):Observable<any>{
        let album = JSON.stringify(albumParams);
        
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })
        return this._http.post(this.url+'album',album,{ headers : headers });
    }

    getAlbum(token:string, albumId: string):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })

        return this._http.get(this.url+'album/'+albumId,{ headers:headers });
    }

    updateAlbum(token:string, albumId: String, album:Album):Observable<any>{
        let param = JSON.stringify(album);
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })

        return this._http.put(this.url+'update_album/'+albumId,param,{headers : headers});
    }

    deleteAlbum(token:string, albumId: string):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })
        return this._http.delete(this.url+'delete_album/'+albumId,{ headers : headers });
    }

}
