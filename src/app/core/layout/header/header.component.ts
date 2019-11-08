import { Component, OnInit } from '@angular/core';
import { currentUser } from "../../clientConfig";
import  {SignedInUserService } from "../../services/signed-in.service";
import {UserInfoService} from "../../services/user-info.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showAccount: boolean = false
  name: string
  surname: string
  memberId: string

  constructor(private signedInUser: SignedInUserService,
              private userInfo: UserInfoService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.userInfo.currentUser.subscribe( value => {
      this.name = value.name
      this.surname = value.surname
      this.memberId = value.member_id
    })
    this.signedInUser.IsUserSignedIn.subscribe( value => {
      this.showAccount = value
    })
  }

  logOut() {
    console.log('LOGOUTING...')
    this.userInfo.clearUser()
    this.authService.logout()
  }

}
