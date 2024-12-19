import { Component, computed, ElementRef, HostListener, inject, Signal, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  themeService = inject(ThemeService);
  theme: Signal<string> = computed(() => this.themeService.currentTheme());
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  chartInstance: any;

  constructor() { }

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
    this.chartInstance = echarts.init(chartDom, this.theme());

    // Define the chart options
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        bottom: 10,
        left: 'center',
        data: ['CityA', 'CityB', 'CityD', 'CityC', 'CityE']
      },
      backgroundColor: 'transparent',
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [
            {
              value: 1548,
              name: 'CityE',
            },
            { value: 735, name: 'CityC' },
            { value: 510, name: 'CityD' },
            { value: 434, name: 'CityB' },
            { value: 335, name: 'CityA' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
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
