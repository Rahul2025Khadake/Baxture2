import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css',
})
export class UserlistComponent {
  @ViewChild(AddUserComponent) addUserComponent!: AddUserComponent;
  User_data: any = [];
  headers: any = [];
  userlist: any[] = [];
  searchText: string = '';
  constructor(public dialog: MatDialog, private service: UserService) {}
  ngOnInit(): void {
    this.service.isRefreshrequired.subscribe(() => {
      this.userlistdata();
    });
    this.userlistdata();
  }

  userlistdata() {
    this.service.getuser_data().subscribe({
      next: (res: any) => {
        this.User_data = res;
        console.table(res);
      },
      error: (error: any) => {
        console.error('An error occurred:', error);
      },
      complete: () => {
        console.log('Observable completed');
      },
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      height: '550px',
      width: '600px',
      panelClass: 'mat-dialog-container',
    });
  }

  DeleteUser(id: number): void {
    this.service.DeleteUser_data(id).subscribe({
      next: (res) => {
        console.log('User deleted successfully:', res);
        Swal.fire({
          title: 'User Deleted!',
          html: '<span style="color: red;">The user has been successfully deleted.</span>',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
        });
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
      complete: () => {
        console.log('HTTP request completed');
        this.userlistdata();
      },
    });
  }

  ViweData(item: any): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      height: '550px',
      width: '600px',
      data: item,
    });

    dialogRef.componentInstance.userData = item;
    dialogRef.componentInstance.isViewOnly = true;
  }
  Edituser(item: any) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      height: '550px',
      width: '600px',
      data: item,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Edit dialog closed with result:', result);
    });
  }
}
