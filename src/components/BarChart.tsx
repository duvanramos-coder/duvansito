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

    // Filter for percentage metrics and limit to 5 for clarity
    const percentMetrics = metrics.filter(m => String(m.value).includes('%')).slice(0, 5);
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
        datasets: [
          {
            // Background "track" bars
            data: labels.map(() => 100),
            backgroundColor: '#F8FAFC',
            borderRadius: 16,
            barThickness: 32,
            borderSkipped: false,
            // @ts-ignore
            grouped: false, // This makes them overlap the other dataset
            order: 2,
          },
          {
            // Actual value bars
            data: values,
            backgroundColor: (context) => {
                const label = labels[context.dataIndex]?.toLowerCase() || '';
                // Highlight Productivity or Satisfaction
                if (label.includes('productividad') || label.includes('satisfacción') || label.includes('calidad')) {
                    return '#3B82F6';
                }
                return '#E2E8F0';
            },
            borderRadius: 16,
            barThickness: 32,
            borderSkipped: false,
            // @ts-ignore
            grouped: false,
            order: 1,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#1E293B',
            padding: 12,
            cornerRadius: 12,
            displayColors: false,
            callbacks: {
                label: (context) => context.datasetIndex === 1 ? `Valor: ${context.parsed.y}%` : ''
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            display: false,
          },
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { font: { weight: 'bold', size: 10 }, color: '#94A3B8', padding: 15 }
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
