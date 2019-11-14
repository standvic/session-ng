import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { uriPrefix } from "../../config";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  currrentUrl: string = this.router.url
  routeList: any[] = [ { url: '/feed', name: 'Лента', icon: '../../../' + uriPrefix + '/assets/img/feed-icon.png'},
                       { url: '/shop',name: 'Магазин', icon: '../../../' + uriPrefix + '/assets/img/shop-icon.png'},
                       { url: '/events', name: 'События', icon: '../../../' + uriPrefix + '/assets/img/events-icon.png'},
                       { url: '/reports', name: 'Отчеты', icon: '../../../' + uriPrefix + '/assets/img/reports-icon.png'},
                       { url: '/registration', name: 'Регистрация', icon: '../../../' + uriPrefix + '/assets/img/registration-icon.png'},
                       { url: '/account', name: 'Моя Sessia', icon:  '../../../' + uriPrefix + '/assets/img/account-icon.png'}
                     ]

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.currrentUrl = event.url
      }
    });
  }
}
