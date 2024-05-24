import { Component } from '@angular/core';
import { UserForm } from '../../models/user-form';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { CommonDialogComponentComponent } from '../common-dialog-component/common-dialog-component.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogState } from '../../models/dialog-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public form: UserForm = new UserForm();


  constructor(
    private authService: AuthServiceService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  
  onSubmit() {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(response => {
      this.router.navigate(['/web/question-list']);
    }, error => {
      const dlgRef: MatDialogRef<CommonDialogComponentComponent> = this.dialog.open(CommonDialogComponentComponent, {
          hasBackdrop: true,
          data: {
            message: 'Login failed',
            title: 'Error',
            type: 'error',
            close: 'close'
          }
        });
        dlgRef.afterClosed().subscribe((result: DialogState) => {
          if (result === DialogState.CLOSE) {
            return;
          }
        });
    });
  }

}
