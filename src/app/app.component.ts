import { Component, OnInit } from '@angular/core';
import { AuthInfoService } from './services/auth/auth-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'wriststone-ui';

  constructor(
    private authInfoService: AuthInfoService){
  }

  ngOnInit(): void {
    this.authInfoService.initializePermissions();
  }
}
