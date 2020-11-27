import { Component, OnInit } from '@angular/core';
import {SpinnerService} from './shared/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EmployeeManagement';
  shouldSpinnerVisible: boolean = false;

  constructor(
    private spinnerService: SpinnerService,
  ){}

  ngOnInit() {
    this.subscribeToSpinnerService();
  }

  subscribeToSpinnerService() {
    this.spinnerService.showSpinner.subscribe(result => {
      this.shouldSpinnerVisible = result;
    });
  }

}
