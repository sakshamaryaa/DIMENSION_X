import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

interface PlotlyChartProps {
  data: Plotly.Data[];
  layout?: Partial<Plotly.Layout>;
  config?: Partial<Plotly.Config>;
  className?: string;
  height?: number;
}

export const PlotlyChart: React.FC<PlotlyChartProps> = ({
  data,
  layout = {},
  config = {},
  className = '',
  height = 360,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mergedLayout: Partial<Plotly.Layout> = {
      autosize: true,
      height,
      paper_bgcolor: 'rgba(8, 13, 24, 0)',
      plot_bgcolor: 'rgba(16, 27, 45, 0.45)',
      font: {
        family: 'Inter, system-ui, sans-serif',
        color: '#EAF4FF',
        size: 12,
      },
      margin: { t: 36, r: 20, b: 44, l: 52 },
      xaxis: {
        gridcolor: 'rgba(145, 163, 186, 0.14)',
        zerolinecolor: 'rgba(0, 217, 255, 0.35)',
        ...(layout.xaxis ?? {}),
      },
      yaxis: {
        gridcolor: 'rgba(145, 163, 186, 0.14)',
        zerolinecolor: 'rgba(117, 101, 255, 0.35)',
        ...(layout.yaxis ?? {}),
      },
      legend: {
        bgcolor: 'rgba(8, 13, 24, 0.65)',
        bordercolor: 'rgba(145, 163, 186, 0.2)',
        borderwidth: 1,
        font: { color: '#EAF4FF', size: 11 },
      },
      ...layout,
    };

    const mergedConfig: Partial<Plotly.Config> = {
      responsive: true,
      displaylogo: false,
      modeBarButtonsToRemove: ['lasso2d', 'select2d'],
      ...config,
    };

    Plotly.react(el, data, mergedLayout, mergedConfig);

    const handleResize = () => {
      if (el) Plotly.Plots.resize(el);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data, layout, config, height]);

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden rounded-xl border border-[#91A3BA]/15 bg-[#080D18]/60 ${className}`}
      style={{ minHeight: height }}
    />
  );
};
