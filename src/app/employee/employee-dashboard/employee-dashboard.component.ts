import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
  dispTime: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDate();
  }

  getDate(){
    let crrDate = new Date();

    setInterval(()=>{
      let seconds = (new Date().getTime() - crrDate.getTime()) / 1000;
       this.dispTime = toHHMMSS(seconds);
    }, 1000);

    let toHHMMSS = (secs) => {
        let sec_num = parseInt(secs, 10)
        let hours   = Math.floor(sec_num / 3600)
        let minutes = Math.floor(sec_num / 60) % 60
        let seconds = sec_num % 60

        return [hours,minutes,seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(":")
    }
  }

  logout(){
    this.router.navigate(['/login']);
  }

}
