import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../home/home.component';
import { UserListComponent } from '../user/user-list/user-list.component';
import { UserEditComponent } from '../user/user-edit/user-edit.component';
import { UserDetailComponent } from '../user/user-detail/user-detail.component';
import { UserCreateComponent } from '../user/user-create/user-create.component';
import { ArtistListComponent } from '../artist/artist-list/artist-list.component';
import { ArtistCreateComponent } from '../artist/artist-create/artist-create.component';
import { ArtistEditComponent } from '../artist/artist-edit/artist-edit.component';
import { AlbumListComponent } from '../album/album-list/album-list.component';
import { AlbumCreateComponent } from '../album/album-create/album-create.component';
import { AlbumEditComponent } from '../album/album-edit/album-edit.component';
import { SongListComponent } from '../song/song-list/song-list.component';
import { SongCreateComponent } from '../song/song-create/song-create.component';
import { SongEditComponent } from '../song/song-edit/song-edit.component';
import { ArtistDetailComponent } from '../artist/artist-detail/artist-detail.component';
import { ExploreComponent } from '../explore/explore.component';
import { FilterComponent } from '../filter/filter.component';
import { AdminGuard } from "../services/admin.guard";
import { AuthGuard } from '../services/auth.guard';
import { LiveMusicComponent } from '../live-music/live-music.component';
import { LiveMusicArtistComponent } from '../live-music-artist/live-music-artist.component';
import { LiveMusicTrackComponent } from '../live-music-track/live-music-track.component';
import { LiveMusicAlbumComponent } from '../live-music-album/live-music-album.component';
import { SubscriptionPageComponent } from '../subscription-page/subscription-page.component';
import { AboutusPageComponent } from '../aboutus-page/aboutus-page.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { SubscriptionPlansComponent } from '../subscription-plans/subscription-plans.component';



const dashboardRoutes : Routes = [{
	path : 'dashboard',
	component : DashboardComponent,
	canActivate: [AuthGuard],
	children : [
		{ path : 'home',component : HomeComponent },
		{ path : 'home/:page',component : HomeComponent },
		{ 
			path: 'user-list', 
			component : UserListComponent,
			canActivate:[AdminGuard]
		},
		{ 
			path: 'user-edit/:id', 
			component: UserEditComponent,
			canActivate:[AdminGuard]
		},
		{ path: 'profile', component: UserDetailComponent },
		{ 
			path: 'user-create', 
			component : UserCreateComponent,
			canActivate:[AdminGuard]
		},
		{ 	
			path: 'artists', 
			component:ArtistListComponent,
			data: {
				title: 'artists',
				breadcrumb: [
					{
						label: 'Artists',
						url: ''
					}
				]
			},
			canActivate:[AdminGuard]
		},
		{ 
			path: 'artist/:id', 
			component:ArtistEditComponent,
			data: {
				title: 'artists',
				breadcrumb: [
					{
						label: '{{artist}}',
						url: 'artists'
					},
					{
						label: 'Edit',
						url: ''
					}
				]
			},
			canActivate:[AdminGuard]   
		},
		{ 
			path: 'artist-create', 
			component: ArtistCreateComponent,
			data: {
				title: 'artists',
				breadcrumb: [
					{
						label: 'Artists',
						url: 'artists'
					},
					{
						label: 'Create',
						url: ''
					}
				]
			},
			canActivate:[AdminGuard]
		},
		{ 
			path: 'albums/:id', 
			component: AlbumListComponent,
			data: {
				title: 'album',
				breadcrumb: [
					{
						label: '{{artist}}',
						url: 'artists'
					},
					{
						label: 'Albums',
						url: ''
					}
				]
			},
			canActivate:[AdminGuard]
		},
		{ 
			path: 'album-create/:idArtist', 
			component: AlbumCreateComponent,
			data: {
				title: 'album',
				breadcrumb: [
					{
						label: 'Artists',
						url: 'artists'
					},
					{
						label: 'Albums',
						url: 'albums/:idArtist'
					},
					{
						label: 'Create',
						url: ''
					}
				]
			},
			canActivate:[AdminGuard]
		},
		{ 
			path: 'album-edit/:idArtist/:id', 
			component: AlbumEditComponent,
			data: {
				title: 'album',
				breadcrumb: [
					{
						label: '{{artist}}',
						url: 'artists'
					},
					{
						label: '{{album}}',
						url: 'albums/:idArtist'
					},
					{
						label: 'Edit',
						url: ''
					}
				]
			},
			canActivate:[AdminGuard]	
		},
		{ 
			path: 'songs/:idArtist/:id', 
			component: SongListComponent,
			data: {
				title: 'song',
				breadcrumb: [
					{
						label: '{{artist}}',
						url: 'artists'
					},
					{
						label: '{{album}}',
						url: 'albums/:idArtist'
					},
					{
						label: 'Songs',
						url: ''
					}
				]
			},
			canActivate:[AdminGuard]	 
		},
		{ 
			path:'song-create/:idArtist/:albumId', 
			component: SongCreateComponent,
			data: {
				title: 'song',
				breadcrumb: [
					{
						label: 'Artists',
						url: 'artists'
					},
					{
						label: 'Albums',
						url: 'albums/:idArtist'
					},
					{
						label: 'Songs',
						url: 'songs/:idArtist/:albumId'
					},
					{
						label: 'Create',
						url: ''
					}
				]
			},
			canActivate:[AdminGuard] 
		},
		{ 
			path: 'song-edit/:idArtist/:albumId/:songId', 
			component:SongEditComponent,
			data: {
				title: 'song',
				breadcrumb: [
					{
						label: '{{artist}}',
						url: 'artists'
					},
					{
						label: '{{album}}',
						url: 'albums/:idArtist'
					},
					{
						label: '{{song}}',
						url: 'songs/:idArtist/:albumId'
					},
					{
						label: 'Edit',
						url: ''
					}
				]
			},
			canActivate:[AdminGuard]
		},
		{ path: 'artist-detail/:idArtist', component : ArtistDetailComponent },
		{ path: 'artist-detail/:idArtist/:idAlbum', component : ArtistDetailComponent },
		{ path: 'explore', component: ExploreComponent },
		{ path: 'liveData',component: LiveMusicComponent },
		{ path: 'liveArtists/:id', component: LiveMusicArtistComponent },
  		{ path: 'liveTracks/:id', component: LiveMusicTrackComponent },
  		{ path: 'liveAlbums/:id', component: LiveMusicAlbumComponent },
		{ path : 'explore/:gender',component : FilterComponent },
		{ path : 'explore/:gender/:page',component : FilterComponent },
		{ path: '', component: ExploreComponent },
		{ path: 'subscription-plans', component: SubscriptionPlansComponent },
		{ path: 'contactus', component:  ContactUsComponent },
		{ path: 'aboutus', component: AboutusPageComponent },
		{ path : 'subscription', component : SubscriptionPageComponent },
	]
	
}]

@NgModule({
  	declarations: [],
  	imports: [
		RouterModule.forChild(dashboardRoutes),
    	CommonModule
	  ],
	  exports:[
		  RouterModule
	  ]
})
export class Dashboard { }
