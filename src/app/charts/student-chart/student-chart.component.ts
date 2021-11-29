import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { Jadual } from 'src/app/models/jadual.model';
import { JadualServiceService } from 'src/app/services/jadual-service.service';

@Component({
  selector: 'app-student-chart',
  templateUrl: './student-chart.component.html',
  styleUrls: ['./student-chart.component.css']
})
export class StudentChartComponent implements OnInit {


  jaduals: Jadual[];
  tarikh = [];
  totaljadual = [];
  @ViewChild('canvas', {static: true}) private chartRef;

  constructor(public service: JadualServiceService) { 
    this.service.getSchedule().subscribe(list => {
      let array = list.map(item => {
        return {
          ...item.payload.doc.data() as Jadual
        } 
      })
      array.forEach(item => {
        this.tarikh.push(item.tarikh)
      })
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    var myChart = new Chart(this.chartRef.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
          labels: this.tarikh,
          datasets: [{
              fill: false,
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
      }
  });
}

}
