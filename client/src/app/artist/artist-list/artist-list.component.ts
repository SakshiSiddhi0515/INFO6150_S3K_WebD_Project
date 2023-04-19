import { Component, OnInit, TemplateRef } from "@angular/core";
import { Route, Router, ActivatedRoute, Params } from '@angular/router';

import { Artist } from "../../models/artist";
import { ArtistService } from "../artist.service";
import { UserService } from '../../user/user.service';
import { MessageService } from "../../messages/message.service";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { GLOBAL } from 'src/global';
import { Ng7BootstrapBreadcrumbService } from 'ng7-bootstrap-breadcrumb';
import { transAnimation } from "../../animation/animation";

@Component({
    selector : 'artist-list',
    templateUrl : './artist-list.component.html',
    styleUrls: ['./artist-list.component.css'],
    providers: [ArtistService, UserService, MessageService],
    animations: [transAnimation]
})

export class ArtistListComponent implements OnInit {
    public artists: Artist[];
    public token;
    public nextPage;
    public prePage;
    public idArtistToDelete:string;
    public modalRef: BsModalRef;
    public currentPage = 4;
    public page: number;
    public totalRows: number;
    public url:string;

    constructor(
        private _artistService: ArtistService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _messageService: MessageService,
        private modalService: BsModalService,
        private ng7BootstrapBreadcrumbService: Ng7BootstrapBreadcrumbService
    ){
        this.idArtistToDelete = null;
        this.token = this._userService.getTokenInLocalStorage();
        this.totalRows = 0;
        this.page = 1;
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        this.getArtist();
    }

    openModal(template: TemplateRef<any>, idArtist: string) {
		this.idArtistToDelete = idArtist;
        this.modalRef = this.modalService.show(template);
        
    }

    confirm(){
        if(this.idArtistToDelete){
            this._artistService.deleteArtist(this.token, this.idArtistToDelete).subscribe(
                response => {
                    if(response.artist){
                        this._messageService.sendMessage("Artist successfully removed","success");
                    }else{
                        this._messageService.sendMessage(response.message,"danger");
                    }
                    this.getArtist();
                    
                },
                error => {
                    console.log(error);
                }
            )
        }
        this.modalRef.hide();
    }
    
    decline(){
		this.idArtistToDelete = null;
		this.modalRef.hide();
	}

    getArtist(){
        this._artistService.getArtists(this.token, this.page.toString(),"10").subscribe(
            response => {
                if(response.artists){
                    this.artists = response.artists.docs;
                    this.totalRows = response.artists.total;
                }else{
                    this._messageService.sendMessage(response.message,'danger');
                }
            },
            error => {
                console.log(error);
            }
        )
    }

    pageChanged(event: any): void {
        this.page = event.page;
        this.getArtist();
    }
}