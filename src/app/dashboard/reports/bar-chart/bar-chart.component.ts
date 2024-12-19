import { Component, computed, effect, ElementRef, HostListener, inject, OnInit, Signal, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {
  themeService = inject(ThemeService);
  theme: Signal<string> = computed(() => this.themeService.currentTheme());
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  chartInstance: any;

  constructor() {}

  ngOnInit(): void {
    this.initChart();
    this.themeService.currentThemeObserver.subscribe((val) => {
      this.initChart();
    })
  }

  initChart(): void {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
    const chartDom = this.chartContainer.nativeElement;
    this.chartInstance = echarts.init(chartDom, this.themeService.currentActive());

    // Define the chart options
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Rainfall', 'Evaporation'],
        left: 'left',
      },
      backgroundColor: 'transparent',
      grid: {
        left: '2%',   // Adjust this to control left margin
        right: '2%',  // Adjust this to control right margin
        bottom: '5%', // Adjust as needed to control bottom margin
        containLabel: true  // Ensures labels are still fully visible
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
          magicType: { type: ['line', 'bar'] }, // Switch between line and bar charts
          restore: {},                // Restore chart to its original state
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          // prettier-ignore
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Rainfall',
          type: 'bar',
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ],
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          }
        },
        {
          name: 'Evaporation',
          type: 'bar',
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
          ],
          markPoint: {
            data: [
              { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
              { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
            ]
          },
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          }
        }
      ]
    };

    // Use the option to set the chart configuration
    this.chartInstance.setOption(option);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  }

  ngOnDestroy(): void {
    // Dispose of the chart when the component is destroyed to free up resources
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  }
}
