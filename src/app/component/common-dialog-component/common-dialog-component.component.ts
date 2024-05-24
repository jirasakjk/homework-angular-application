import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData, DialogState } from '../../models/dialog-data';


@Component({
  selector: 'app-common-dialog-component',
  templateUrl: './common-dialog-component.component.html',
  styleUrl: './common-dialog-component.component.css'
})
export class CommonDialogComponentComponent {
  constructor(
    public dialogRef: MatDialogRef<CommonDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: DialogData
  ) { }


  public close(): void {
    this.dialogRef.close(DialogState.CLOSE);
  }

  public approve(): void {
    this.dialogRef.close(DialogState.APPROVE);
  }
}
