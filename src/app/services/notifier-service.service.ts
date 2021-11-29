import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifierServiceService {

  constructor(private snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  }

  showSuccess(displayMessage: string) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(displayMessage, '' , this.config);
  }

  showError(displayMessage: string) {
    this.config['panelClass'] = ['notification', 'error'];
    this.snackBar.open(displayMessage, '' , this.config);
  }
}
