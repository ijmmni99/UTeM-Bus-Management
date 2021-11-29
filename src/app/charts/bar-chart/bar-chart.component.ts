import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {Chart} from 'chart.js';
import { Jadual } from 'src/app/models/jadual.model';
import { JadualServiceService } from 'src/app/services/jadual-service.service';
import { PelajarService } from 'src/app/services/pelajar.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  jaduals: Jadual[];
  tarikh = [];
  totaljadual = [];
  datas = [];
  myChart;
  @ViewChild('canvasbar', {static: true}) private chartRef;

  constructor(public service: JadualServiceService,
    public studentService: PelajarService) { 
    this.service.getScheduleLimit().subscribe(list => {
      let array = list.map(item => {
        return {
          ...item.payload.doc.data() as Jadual
        } 
      })

      array.forEach(item => {
        this.tarikh.push(item.plateNumber)
        this.studentService.getOnBoardStudents(item.id).subscribe(list => {
          if(list.length > 0)
            this.datas.push(list.length);
          else
            this.datas.push(0);

          if(this.datas.length == array.length){
            this.makeChart();
          }
        })
      })
    })
  }

  ngOnInit(): void {
  }

  makeChart() {
    this.myChart = new Chart(this.chartRef.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
          labels: this.tarikh.slice(0, 7),
          datasets: [{
              fill: false,
              label: 'Data Semasa Jumlah Pelajar',
              data: this.datas,
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
