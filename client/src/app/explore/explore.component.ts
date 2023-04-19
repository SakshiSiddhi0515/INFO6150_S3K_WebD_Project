import { Component, OnInit } from '@angular/core';
import { transAnimation } from "../animation/animation";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
  animations: [transAnimation]
})
export class ExploreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
