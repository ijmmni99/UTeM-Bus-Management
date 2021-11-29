import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {Chart} from 'chart.js';
import { Pelajar } from 'src/app/models/pelajar';
import { PelajarService } from 'src/app/services/pelajar.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  students: Pelajar[];
  facultys = [];
  faculty = [];
  totalstudent = [];
  myChart;
  @ViewChild('canvas', {static: true}) private chartRef;

  constructor(public service: PelajarService) { 
    this.service.getStudents().subscribe(list => {
      this.students = list.map(item => {
        return {
          ...item.payload.doc.data() as Pelajar
        }
      })

      this.facultys = Array.from(this.students.reduce((m, t) => m.set(t.Faculty, t), new Map()).values());
      this.facultys.forEach(item => {
        this.faculty.push(item['Faculty'])
        this.totalstudent.push(this.students.filter(err => err['Faculty'] === item['Faculty']).length)
      })

      this.makeChart()
    })
  }

  ngOnInit(): void {
    
  }

  makeChart() {
    this.myChart = new Chart(this.chartRef.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
          labels: this.faculty,
          datasets: [{
              label: ' Pelajar',
              data: this.totalstudent,
              backgroundColor: [
                  'rgba(0, 131, 143, 0.9)',
                  'rgba(0, 188, 212, 0.9)',
                  'rgba(255, 235, 59, 0.9)',
                  'rgba(255, 82, 82, 0.9)',
                  'rgba(83, 109, 254, 0.9)',
                  'rgba(96, 125, 139, 0.9)'
              ],
              borderColor: [
                'rgba(0, 131, 143, 1)',
                'rgba(0, 188, 212, 1)',
                'rgba(255, 235, 59, 1)',
                'rgba(255, 82, 82, 1)',
                'rgba(83, 109, 254, 1)',
                'rgba(96, 125, 139, 1)'
              ],
              borderWidth:1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
      }
  });
  }
}