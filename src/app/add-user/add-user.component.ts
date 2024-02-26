import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent implements OnInit {
  adduser!: FormGroup;
  isEditMode: boolean = false;
  isedit: boolean = false;
  dealerTargetSetItem: any;
  @Input() userData: any;
  @Input() isViewOnly: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.adduser = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      Address: ['', Validators.required],
    });
    if (this.isViewOnly) {
      this.adduser.disable();
    }
    if (this.data) {
      this.adduser.patchValue({
        FirstName: this.data.FirstName,
        LastName: this.data.LastName,
        Email: this.data.Email,
        Address: this.data.Address,
      });
      this.isEditMode = true;
    }
  }
  Cancel() {
    this.dialogRef.close();
  }

  saveData(): void {
    if (this.adduser.valid) {
      if (this.isEditMode) {
        const userId = this.data.id;
        this.service.update(userId, this.adduser.value).subscribe({
          next: (response) => {
            console.log('User data updated successfully:', response);
            Swal.fire({
              title: 'User data successfully updated!!',
              text: ' ',
              icon: 'success',
              timer: 3000,
              timerProgressBar: true,
            });
            this.dialogRef.close();
          },
          error: (error) => {
            console.error('An error occurred while updating user data:', error);
          },
        });
      } else {
        this.service.postdata(this.adduser.value).subscribe({
          next: (response: any) => {
            console.log('Data posted successfully:', response);
            Swal.fire({
              title: 'User data successfully added!!',
              text: ' ',
              icon: 'success',
              timer: 3000,
              timerProgressBar: true,
            });
            this.dialogRef.close();
          },
          error: (error: any) => {
            console.error('An error occurred:', error);
          },
          complete: () => {
            console.log('request completed');
          },
        });
      }
    }
  }
  Closedialog(): void {
    this.dialogRef.close();
  }
}
