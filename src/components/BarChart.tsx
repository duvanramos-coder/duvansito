import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Metric } from '../types';

Chart.register(...registerables);

interface BarChartProps {
  metrics: Metric[];
}

export default function BarChart({ metrics }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const percentMetrics = metrics.filter(m => String(m.value).includes('%'));
    const labels = percentMetrics.map(m => m.label);
    const values = percentMetrics.map(m => {
        const val = m.value;
        if (typeof val === 'number') return val > 1 ? val : val * 100;
        const cleaned = String(val).replace(',', '.').replace(/[^\d.]/g, '');
        return Number(cleaned) || 0;
    });

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Porcentaje',
          data: values,
          backgroundColor: '#2D2852',
          borderRadius: 12,
          barThickness: 32,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#2D2852',
            padding: 12,
            cornerRadius: 12,
            displayColors: false,
            callbacks: {
                label: (context) => ` ${context.parsed.y}%`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: '#F1F5F9' },
            ticks: {
                callback: (v) => v + '%',
                font: { weight: 'bold' }
            }
          },
          x: {
            grid: { display: false },
            ticks: { font: { weight: 'bold' } }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [metrics]);

  return <canvas ref={chartRef} />;
}
