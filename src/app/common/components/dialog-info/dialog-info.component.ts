import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss'],
})
export class DialogInfoComponent {

 public icon: string = '';
 public color: string = '';

 public constructor(
  public dialogRef: MatDialogRef<DialogInfoComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) { }

public ngOnInit(): void {
  if (this.data) {
    this.icon = this.getIcon(this.data.type);
    this.color = this.getColor(this.data.type);
  }
}

public dissmiss(): void {
  this.dialogRef.close();
}

public getIcon(type: string): string {
  switch (type) {
    case 'success':
      return 'check_box';

    case 'info':
      return 'info';

    case 'error':
      return 'error_outline';

      case 'warning':
        return 'warning';

    case 'delete' :
      return 'exclamation-circle-delete';

    case 'confirm':
      return '';

    default:
      return 'notification';
  }
}

public getColor(type: string): string {
  switch (type) {
    case 'success':
      return 'mat-success';

    case 'info':
      return 'mat-info';

    case 'error':
      return 'mat-error';
    case 'warning':
      return 'mat-warning';
    default:
      return 'mat-info';
  }
}


}
