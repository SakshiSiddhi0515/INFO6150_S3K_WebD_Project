import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DashboardModule } from "./dashboard/dashboard.module";

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';

import { AppRouting } from './app.routing';

/* user */
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

/* Artist */
import { ArtistListComponent } from './artist/artist-list/artist-list.component';
import { ArtistCreateComponent } from "./artist/artist-create/artist-create.component";
import { ArtistEditComponent } from './artist/artist-edit/artist-edit.component';

/* Album */
import { AlbumListComponent } from "./album/album-list/album-list.component";
import { AlbumCreateComponent } from "./album/album-create/album-create.component";
import { AlbumEditComponent } from "./album/album-edit/album-edit.component";

/* songs */
import { SongCreateComponent } from "./song/song-create/song-create.component";
import { SongListComponent } from "./song/song-list/song-list.component";
import { SongEditComponent } from "./song/song-edit/song-edit.component";

/* Message */
import { MessagesComponent } from './messages/messages.component';

/* ngx-bootstrap */
import { ModalModule, AlertModule, ButtonsModule,PaginationModule  } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ArtistDetailComponent } from './artist/artist-detail/artist-detail.component';
import { ExploreComponent } from './explore/explore.component';

import { FilterComponent } from './filter/filter.component';

import {Ng7BootstrapBreadcrumbModule} from "ng7-bootstrap-breadcrumb";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LiveMusicComponent } from './live-music/live-music.component';
import { SpotifyService } from './spotify.service';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LiveMusicArtistComponent } from './live-music-artist/live-music-artist.component';
import { LiveMusicAlbumComponent } from './live-music-album/live-music-album.component';
import { LiveMusicTrackComponent } from './live-music-track/live-music-track.component';
import { InputFileComponent } from './input-file/input-file.component';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    UserCreateComponent,
    UserListComponent,
    UserEditComponent,
    MessagesComponent,
    UserDetailComponent,
    ArtistListComponent,
    ArtistCreateComponent,
    ArtistEditComponent,
    AlbumListComponent,
    AlbumCreateComponent,
    AlbumEditComponent,
    SongCreateComponent,
    SongListComponent,
    SongEditComponent,
    ArtistDetailComponent,
    ExploreComponent,
    FilterComponent,
    LiveMusicComponent,
    LiveMusicArtistComponent,
    LiveMusicAlbumComponent,
    LiveMusicTrackComponent,
    InputFileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRouting,
    DashboardModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: SpotifyService, useClass: SpotifyService },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
