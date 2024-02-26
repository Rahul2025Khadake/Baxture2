import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  constructor(
    private user_service: UserService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  data: any;

  ngOnInit(): void {
    this.GetData();
  }
  GetData() {
    this.spinner.show();
    setTimeout(() => {
      this.user_service.Getuserdata().subscribe(
        (res: any) => {
          this.data = res;
          this.spinner.hide();
          console.log(this.data);
        },
        (error: any) => {
          this.spinner.hide();
          console.error('Error fetching data:', error);
        }
      );
    }, 4000);
  }
}
