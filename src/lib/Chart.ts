export class Chart {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private options: ChartOptions;
    private width: number;
    private height: number;
    private scaleX: number = 0;
    private scaleY: number = 0;
    private marginX: number;
    private marginY: number;
    private colors: string[];
  
    constructor(selector: string, options: Partial<ChartOptions>) {
      this.canvas = document.querySelector(selector) as HTMLCanvasElement;
      if (!this.canvas) throw new Error("Canvas element not found");
  
      this.ctx = this.canvas.getContext("2d")!;
      this.options = this.mergeOptions(options);
  
      this.width = this.canvas.width = this.canvas.clientWidth;
      this.height = this.canvas.height = this.canvas.clientHeight;
  
      this.colors = ["orange", "limegreen", "steelblue", "red", "yellow"];
      this.marginX = 50;
      this.marginY = 50;
  
      this.calculateScales();
      this.initializeCanvas();
    }
  
    private mergeOptions(options: Partial<ChartOptions>): ChartOptions {
      return {
        xAxis: {
          title: "",
          min: Infinity,
          max: -Infinity,
          ticks: undefined,
          timeSeries: undefined,
          ...options.xAxis,
        },
        yAxis: {
          title: "",
          min: Infinity,
          max: -Infinity,
          ticks: undefined,
          ...options.yAxis,
        },
        lines: options.lines || [],
        bars: options.bars || [],
        dots: options.dots || [],
        pie: options.pie || [],
        barSep: options.barSep || true,
      };
    }
  
    private calculateScales() {
      const series = [
        ...(this.options.lines?.map((line) => line.data) || []),
        ...(this.options.bars?.map((bar) => bar.data) || []),
      ];
  
      const [xMin, xMax] = this.calculateLimits(series, this.options.xAxis.min, this.options.xAxis.max, (d) => d[0]);
      const [yMin, yMax] = this.calculateLimits(series, this.options.yAxis.min, this.options.yAxis.max, (d) => d[1]);
  
      this.options.xAxis.min = xMin;
      this.options.xAxis.max = xMax;
      this.options.yAxis.min = yMin;
      this.options.yAxis.max = yMax;
  
      this.scaleX = (this.width - 2 * this.marginX) / (xMax - xMin);
      this.scaleY = (this.height - 2 * this.marginY) / (yMax - yMin);
    }
  
    private calculateLimits(series: number[][][], min: number, max: number, callback: (d: number[]) => number): [number, number] {
      series.forEach((data) => {
        min = Math.min(...data.map(callback), min);
        max = Math.max(...data.map(callback), max);
      });
      return [min, max];
    }
  
    private initializeCanvas() {
      this.ctx.translate(this.marginX, this.height - this.marginY);
      this.ctx.textAlign = "center";
      this.ctx.lineWidth = 1;
      this.ctx.lineJoin = "round";
      this.ctx.font = "12px Arial";
    }
  
    private drawAxes() {
      this.ctx.save();
      this.ctx.beginPath();
  
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(0, -this.height + 2 * this.marginY);
      this.ctx.stroke();

      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.width - 2 * this.marginX, 0);
  
      this.ctx.stroke();
  
      this.ctx.textBaseline = "bottom";
      this.ctx.fillText(this.options.xAxis.title, (this.width - 2 * this.marginX) / 2, this.marginY - this.height);
  
      this.ctx.rotate(-Math.PI / 2);
      this.ctx.textBaseline = "top";
      this.ctx.fillText(this.options.yAxis.title, -this.marginX, -(this.height - 2 * this.marginY) / 2);
  
      this.ctx.restore();
    }
  
    private drawTicks() {
      this.ctx.save();
      this.ctx.setLineDash([2, 2]);
  
      // X-Axis Ticks
      if (this.options.xAxis.ticks) {
        for (let x = this.options.xAxis.min; x <= this.options.xAxis.max; x += this.options.xAxis.ticks) {
          this.drawText(x, x, this.options.yAxis.min - 10);
          this.drawLine(x, this.options.yAxis.min, x, this.options.yAxis.max);
        }
      }
  
      // Y-Axis Ticks
      if (this.options.yAxis.ticks) {
        for (let y = this.options.yAxis.min; y <= this.options.yAxis.max; y += this.options.yAxis.ticks) {
          this.drawText(y, this.options.xAxis.min - 10, y);
          this.drawLine(this.options.xAxis.min, y, this.options.xAxis.max, y);
        }
      }
  
      this.ctx.stroke();
      this.ctx.restore();
    }
  
    private drawText(text: string | number, x: number, y: number) {
      this.ctx.fillText(text.toString(), (x - this.options.xAxis.min) * this.scaleX, -(y - this.options.yAxis.min) * this.scaleY);
    }
  
    private drawLine(x1: number, y1: number, x2: number, y2: number) {
      this.ctx.moveTo((x1 - this.options.xAxis.min) * this.scaleX, -(y1 - this.options.yAxis.min) * this.scaleY);
      this.ctx.lineTo((x2 - this.options.xAxis.min) * this.scaleX, -(y2 - this.options.yAxis.min) * this.scaleY);
    }
  
    private plotLine(data: number[][], color: string) {
      this.ctx.save();
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2;
  
      this.ctx.beginPath();
      data.forEach(([x, y], index) => {
        if (index === 0) this.ctx.moveTo((x - this.options.xAxis.min) * this.scaleX, -(y - this.options.yAxis.min) * this.scaleY);
        else this.ctx.lineTo((x - this.options.xAxis.min) * this.scaleX, -(y - this.options.yAxis.min) * this.scaleY);
      });
  
      this.ctx.stroke();
      this.ctx.restore();
    }
  
    private plotBars(data: number[][], color: string) {
      this.ctx.save();
      this.ctx.fillStyle = color;
  
      data.forEach(([x, y]) => {
        const barWidth = this.scaleX / 2;
        this.ctx.fillRect((x - this.options.xAxis.min) * this.scaleX - barWidth / 2, -(y - this.options.yAxis.min) * this.scaleY, barWidth, (y - this.options.yAxis.min) * this.scaleY);
      });
  
      this.ctx.restore();
    }
    private drawPieChart(series: SeriesOptions) {

      const center = {
        x: this.canvas.width / 4,
        y: this.canvas.height / 4
      };
      console.log(center);
      const radius = series.radius || Math.min(center.x, center.y) * 0.8;
      
      const total = series.data.reduce((sum, item) => sum + (item.value || 0), 0);
      let currentAngle = 0;
      console.log(radius, total);
      series.data.forEach((slice: ChartDataPoint, index: number) => {
      this.ctx.save();

        const sliceAngle = 2 * Math.PI * (slice.value || 0) / total;
        console.log(sliceAngle);
        this.ctx.beginPath();
        this.ctx.moveTo(center.x, -center.y);
        this.ctx.arc(
          center.x,
          -center.y,
          radius,
          currentAngle,
          currentAngle + sliceAngle
        );
        this.ctx.fillStyle = this.getColor(index % this.colors.length);
        this.ctx.fill();
        this.ctx.restore();
        // Etiketler
        if (slice.label) {
          const labelAngle = currentAngle + sliceAngle / 2;
          const labelX = center.x + (radius * 0.7) * Math.cos(labelAngle);
          const labelY = -center.y + (radius * 0.7) * Math.sin(labelAngle);
  
          this.ctx.fillStyle = '#000';
          this.ctx.textAlign = 'center';
          this.ctx.fillText(
            `${slice.label}: ${((slice.value || 0) / total * 100).toFixed(1)}%`,
            labelX,
            labelY
          );
        }
  
        currentAngle += sliceAngle;
      });

    }
  
    private drawScatter(series: SeriesOptions) {
      this.ctx.save();

      const pointSize = series.pointSize || 5;
      console.log(pointSize);
      series.data.forEach((point: ChartDataPoint) => {
        const x = (point.x - this.options.xAxis.min) * this.scaleX;
        const y = -(point.y - this.options.yAxis.min) * this.scaleY;
        console.log(x, y);
        this.ctx.beginPath();
        this.ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
        this.ctx.fillStyle = series.color || this.getColor(0);
        this.ctx.fill();
      });

    }
    private getColor(index: number): string {
      const colors = [
        '#FF6384', // kırmızı
        '#36A2EB', // mavi
        '#FFCE56', // sarı
        '#4BC0C0', // turkuaz
        '#9966FF', // mor
        '#FF9F40'  // turuncu
      ];
      return colors[index % colors.length];
    }
    public render() {
      this.drawAxes();
      this.drawTicks();
      console.log("pointSize", this.options);
  
      this.options.lines?.forEach((line, index) => this.plotLine(line.data, this.colors[index % this.colors.length]));
      this.options.bars?.forEach((bar, index) => this.plotBars(bar.data, this.colors[index % this.colors.length]));
      this.options.dots?.forEach((dot) => this.drawScatter(dot));
      this.options.pie?.forEach((pie) => this.drawPieChart(pie));
    }
  }
  
  // ChartOptions Interface
export interface ChartOptions {
    xAxis: AxisOptions;
    yAxis: AxisOptions;
    lines?: Line[];
    bars?: Bar[];
    barSep?: boolean;
    dots?: SeriesOptions[];
    pie?: SeriesOptions[];
  }
  
  interface AxisOptions {
    title: string;
    min: number;
    max: number;
    ticks?: number;
    timeSeries?: Intl.DateTimeFormatOptions;
  }
  
  interface Line {
    data: number[][];
    color?: string;
  }
  
  interface Bar {
    data: number[][];
    color?: string;
  }
  
  export interface ChartDataPoint {
    x: number;
    y: number;
    label?: string; // Pie chart için etiket
    value?: number; // Pie chart için değer
    color?: string;
  }

  export interface SeriesOptions {
    data: ChartDataPoint[];
    label?: string;
    color?: string;
    radius?: number; // Pie chart için
    pointSize?: number; // Scatter plot için
  }