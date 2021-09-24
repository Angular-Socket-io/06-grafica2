import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css'],
})
export class GraficaComponent implements OnInit {
  public barChartLabels: Label[] = [
    'Pregunta 1',
    'Pregunta 2',
    'Pregunta 3',
    'Pregunta 4',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  //public barChartPlugins = [pluginDataLabels];

  barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81], label: 'Preguntas' },
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  constructor( private http: HttpClient,public wsService:WebSocketService) {}

  ngOnInit(): void {
    this.getData();
    this.escucharSocket();
  }

  getData() {
    this.http
      .get('http://localhost:5000/grafica')
      .subscribe(({data}: any) => this.barChartData = data as ChartDataSets[]);
  }
  escucharSocket() {
    this.wsService.listen('cambiar-grafica').subscribe((data: any) => {
      console.log(data);
      this.barChartData = data as ChartDataSets[]
    });
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }


}
