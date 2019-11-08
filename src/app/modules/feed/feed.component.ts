import { Component, OnInit } from '@angular/core'
import {AuthService} from "../../core/auth/auth.service"

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    /*console.log('LOGOUTING...')
    this.authService.logout()*/
  }

}
