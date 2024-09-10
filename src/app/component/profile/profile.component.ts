import { Component, OnInit } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { RouterModule } from '@angular/router';
import { LoginService } from 'src/app/services/authentication/login.service';
import { 
  NgbDropdownModule, 
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ 
    NgbDropdownModule, 
    FeatherModule,
    RouterModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  public userData = this.loginService.getUser();

  constructor(private loginService: LoginService) { }

  

  ngOnInit(): void { 
  }
  logout() {
    this.loginService.logout();
    window.location.reload();
  }


}
