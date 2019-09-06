import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  showHeader = false;
  showSidebar = false;
  title = 'session-ng';
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute){
  }

  ngOnInit(): void {
    this.http.get('https://api.sessia.com/api/directory/countries?version=v2').subscribe(data => {
      console.log(data);
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
        this.showSidebar = this.activatedRoute.firstChild.snapshot.data.showSidebar !== false;
      }
    });
  }
}
