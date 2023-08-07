import { Component, OnInit, ViewChild } from '@angular/core';
import { UserInfo } from 'src/app/common/models/data-config';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexTooltip,
  ApexPlotOptions,
  ApexGrid,
  ApexLegend,
  ApexResponsive,
  ApexNonAxisChartSeries
} from 'ng-apexcharts';
import { HttpClientResponse } from 'src/app/core/models/http-response';
import { ReportFile, ReportMessage, ReportPost, ReportReaction, ReportUserAccessByHour, ReportUserRegister, ReportUserRegisterByMonth } from '../../models/home/home';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;
  public chartLineOptions!: Partial<ChartOptions>;
  public visitorsChart!: Partial<ChartOptions>;
  public chartOptionsMessage!: Partial<ChartOptions>;


  public reportPost? : ReportPost;
  public postBar : number =0;

  public reportUserRegister? : ReportUserRegister;
  public regBar : number =0;

  public reportReaction? : ReportReaction;
  public reactBar : number =0;

  public reportFile? : ReportFile;
  public fileBar : number =0;


  dataMessage =[0,0,0,0,0,0,0,0,0,0,0,0];
  public reportMessage!: ReportMessage[];


  dataUserRegisterByMonth = [0,0,0,0,0,0,0,0,0,0,0,0];
  userRegisterByMonth! : ReportUserRegisterByMonth[];

  dataAcess = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  userAccessByHour! : ReportUserAccessByHour[];


  private fetchData! : HttpClientResponse;

  constructor(private homeService : HomeService) {
    this.visitorsChart = {
      series: [76, 67, 61, 90],
      chart: {
        height: 390,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
      labels: ['VietNam', 'China', 'USA', 'Russia'],
      legend: {
        show: true,
        floating: true,
        fontSize: '16px',
        position: 'left',
        offsetX: 50,
        offsetY: 10,
        labels: {
          useSeriesColors: true,
        },
        formatter: function (
          seriesName: string,
          opts: {
            w: { globals: { series: { [x: string]: string } } };
            seriesIndex: string | number;
          }
        ) {
          return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    };
  }
  ngOnInit(): void {
    this.homeService.getDataForHomePage().subscribe({
      next: (res) =>{
        this.fetchData = res;
        console.log(res)
        if(this.fetchData){
          this.userRegisterByMonth = this.fetchData.data.reportUserRegisterByMonth;
          this.userRegisterByMonth.forEach(e =>{
            this.dataUserRegisterByMonth[this.convertTonumber(e.month)-1] = this.convertTonumber(e.total);
          })
          this.userAccessByHour = this.fetchData.data.reportUserAccessByHour;
          this.userAccessByHour.forEach(e =>{
            this.dataAcess[e.hour -1] = e.total;
          })
          console.log(this.dataAcess)
          this.reportMessage = this.fetchData.data.reportMessage;;
          this.reportMessage.forEach(e =>{
            this.dataMessage[this.convertTonumber(e.month)-1] = this.convertTonumber(e.total);
          })
          console.log(this.reportMessage)
          this.reportPost = this.fetchData.data.reportPost;
          console.log(this.reportPost);
          this.postBar = this.calPercent(this.reportPost!.postThisMonth,this.reportPost!.postTotal);

          this.reportUserRegister = this.fetchData.data.reportUserRegister;
          this.regBar = this.calPercent(this.reportUserRegister?.userThisMonth,this.reportUserRegister?.userTotal);

          this.reportReaction = this.fetchData.data.reportReaction;
          this.reactBar = this.calPercent(this.reportReaction?.reactionThisMonth,this.reportReaction?.reactionTotal);

          this.reportFile = this.fetchData.data.reportFile;
          this.fileBar = this.calPercent(this.reportFile?.fileThisMonth,this.reportFile?.fileTotal);
        }

        this.renderUserRegisterByMonth(this.dataUserRegisterByMonth);
        this.renderLoginStatictisAccess(this.dataAcess);
        this.renderMessage(this.dataMessage);
      }
    })
  }

  renderUserRegisterByMonth(d : any):void{
    this.chartOptions = {
      series: [
        {
          name: 'Total',
          data: d,
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: 'Statistics User Register By Month In' + new Date().getFullYear(),
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
      },
    };
  }

  renderMessage(d : any):void{
    this.chartOptionsMessage = {
      series: [
        {
          name: 'Total',
          data: d,
        },
      ],
      chart: {
        height: 390,
        type: 'line',
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Statistics Message By Month In' + new Date().getFullYear(),
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
      },
    };
  }

  renderLoginStatictisAccess(d: any): void {
    this.chartLineOptions = {
      series: [
        {
          type: 'line',
          name: 'Total Access',
          data: d
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        show : true
      },
      xaxis: {
        type: 'datetime',
        categories: [
          new Date().toISOString().slice(0,10)+'T00:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T01:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T02:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T03:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T04:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T05:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T06:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T07:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T08:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T09:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T10:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T11:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T12:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T13:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T14:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T15:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T16:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T17:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T18:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T19:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T20:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T21:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T22:00:00.000Z',
          new Date().toISOString().slice(0,10)+'T23:00:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
  }

  convertTonumber(s:any):number{
    return s as unknown as number;
  }

  calPercent(a:any,t:any):number{
    return this.convertTonumber(((a/t)*100).toFixed(0));
  }
}

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  colors: string[];
  grid: ApexGrid;
  responsive: ApexResponsive | ApexResponsive[] | any;
  labels : string[];
  legend: ApexLegend;
};
