import React, { useEffect, useRef } from "react";
import { Chart, ChartOptions } from "@/lib/Chart";

interface ChartComponentProps {
  options: ChartOptions;
  selector: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ options, selector }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Create a new Chart instance
      const chart = new Chart(`#${selector}`, options);
      chart.render();

      const handleResize = () => {
        chart.render();
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    
    }
  }, [options]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <canvas ref={canvasRef} id={selector} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default ChartComponent;
