import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable()
export class SpotifyService {
  static BASE_URL = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) { }

  runQuery(url: string, params?: Array<string>): Observable<any[]> {
    let queryUrl = `${SpotifyService.BASE_URL}${url}`;

    if (params) {
      queryUrl = `${queryUrl}?${params.join('&')}`;
    }

    const apiKey = environment.spotifyApiKey;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${apiKey}`
    });

    return this.http
      .get(queryUrl, { headers })
      .pipe(
        map((result: any) => result)
      );
  }

  search(query: string, type: string): Observable<any[]> {
    return this.runQuery('/search', [`q=${query}`, `type=${type}`]);
  }
  

  searchTrack(query: string): Observable<any[]> {
    return this.runQuery('/search', [`q=${query}`, 'type=track']);
  }
  

  getTrack(id: string): Observable<any[]> {
    return this.runQuery(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any[]> {
    return this.runQuery(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<any[]> {
    return this.runQuery(`/albums/${id}`);
  }
}
