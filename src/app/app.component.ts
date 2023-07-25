import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FormsModule } from '@angular/forms';
import { UserdataService } from './services/userdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Line-chart';
  data: any = [];
  public Highcharts = Highcharts;
  public lineChart: any;
  public xAxisData: any = [];
  public yAxisData: any = [];
  public asOnDateTime: any;
  public asOnDateTimeTo: any;
  asOnDateTimeformated: string = '';
  asOnDateTimeToformated: string = '';

  constructor(private userServise: UserdataService) {}

  ngOnInit() {
    this.getData();
  }
  getData() {
    // this.data = this.userServise.getUserData();
    this.userServise.getUserDataApi().subscribe((result) => {
      this.data = result;
    });
  }

  asOnDateTo() {
    const dateString = this.asOnDateTimeTo;
    const dateParts = dateString.split('-');
    const year = dateParts[0];
    const month = new Date(dateString + 'T00:00:00').toLocaleString('en-US', {
      month: 'short',
    });
    const day = dateParts[2];

    const formattedDate = `${day}-${month}-${year}`;
    this.asOnDateTimeToformated = formattedDate;
  }
  asOnDate() {
    const dateString = this.asOnDateTime;
    const dateParts = dateString.split('-');
    const year = dateParts[0];
    const month = new Date(dateString + 'T00:00:00').toLocaleString('en-US', {
      month: 'short',
    });
    const day = dateParts[2];

    const formattedDate = `${day}-${month}-${year}`;
    this.asOnDateTimeformated = formattedDate;
  }

  submit() {
    this.xAxisData = [];
    this.yAxisData = [];
    for (let a of this.data) {
      if (
        new Date(a.Date) >= new Date(this.asOnDateTimeformated) &&
        new Date(a.Date) <= new Date(this.asOnDateTimeToformated)
      ) {
        this.xAxisData.push(a.Date);
        this.yAxisData.push(a['Turnover (Rs. Cr)']);
      }
    }
    this.displayGraph();
  }

  displayGraph() {
    this.lineChart = {
      chart: {
        type: 'area',
        width: 1200,
      },
      title: {
        text: 'Line chart',
      },
      xAxis: {
        categories: this.xAxisData,
      },
      yAxis: {
        title: {
          text: 'Turnover',
        },
      },

      plotOptions: {
        series: {
          fillOpacity: 0.1,
          turboThreshold: 1000,
        },
      },

      series: [
        {
          name: 'Dates',
          data: this.yAxisData,
        },
      ],
    };
  }
}
