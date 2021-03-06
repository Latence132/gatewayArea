import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    /* eslint-disable no-console */
    console.log(window.history.state);
    /* eslint-enable no-console */
  }

}
