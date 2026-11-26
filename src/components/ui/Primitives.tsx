import React from 'react';
import { Loader2, Sparkles, AlertCircle, Info } from 'lucide-react';

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost' | 'violet' | 'danger';
    size?: 'sm' | 'md' | 'lg';
  }
> = ({ variant = 'primary', size = 'md', className = '', children, ...props }) => {
  const variants = {
    primary:
      'bg-[#00D9FF] text-[#080D18] font-semibold hover:bg-[#3CE4FF] shadow-[0_0_20px_rgba(0,217,255,0.28)]',
    secondary:
      'bg-[#101B2D] text-[#EAF4FF] border border-[#91A3BA]/25 hover:border-[#00D9FF]/50 hover:text-[#00D9FF]',
    ghost: 'bg-transparent text-[#91A3BA] hover:text-[#EAF4FF] hover:bg-white/5',
    violet:
      'bg-[#7565FF] text-white font-semibold hover:bg-[#897BFF] shadow-[0_0_20px_rgba(117,101,255,0.3)]',
    danger:
      'bg-red-500/15 text-red-300 border border-red-400/30 hover:bg-red-500/25',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-xl',
  };

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-45 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Badge: React.FC<{
  children: React.ReactNode;
  tone?: 'cyan' | 'violet' | 'muted' | 'success' | 'warning';
  className?: string;
}> = ({ children, tone = 'cyan', className = '' }) => {
  const tones = {
    cyan: 'bg-[#00D9FF]/12 text-[#00D9FF] border-[#00D9FF]/30',
    violet: 'bg-[#7565FF]/15 text-[#B4ACFF] border-[#7565FF]/35',
    muted: 'bg-[#91A3BA]/10 text-[#91A3BA] border-[#91A3BA]/20',
    success: 'bg-emerald-500/12 text-emerald-300 border-emerald-400/30',
    warning: 'bg-amber-500/12 text-amber-300 border-amber-400/30',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
};

export const ScientificSlider: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}> = ({ label, value, min, max, step = 0.1, unit = '', onChange }) => {
  return (
    <label className="block space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#91A3BA] font-medium">{label}</span>
        <span className="font-mono text-[#00D9FF] font-semibold">
          {Number.isInteger(step) ? value.toFixed(0) : value.toFixed(2)}
          {unit ? ` ${unit}` : ''}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="dx-slider w-full"
      />
    </label>
  );
};

export const MetricTile: React.FC<{
  label: string;
  value: string;
  unit?: string;
  accent?: 'cyan' | 'violet' | 'ice';
  tooltip?: string;
}> = ({ label, value, unit, accent = 'cyan', tooltip }) => {
  const colorMap = {
    cyan: 'text-[#00D9FF]',
    violet: 'text-[#9F94FF]',
    ice: 'text-[#EAF4FF]',
  };
  return (
    <div
      title={tooltip}
      className="rounded-xl border border-[#91A3BA]/15 bg-[#080D18]/75 p-3.5"
    >
      <div className="text-[11px] uppercase tracking-wider text-[#91A3BA]">{label}</div>
      <div className={`mt-1 font-mono text-lg font-bold ${colorMap[accent]}`}>
        {value}
        {unit && <span className="ml-1 text-xs font-normal text-[#91A3BA]">{unit}</span>}
      </div>
    </div>
  );
};

export const LoadingState: React.FC<{ label?: string }> = ({
  label = 'Initializing scientific environment...',
}) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <Loader2 className="h-8 w-8 animate-spin text-[#00D9FF]" />
    <p className="mt-3 text-sm text-[#91A3BA]">{label}</p>
  </div>
);

export const EmptyState: React.FC<{
  title: string;
  description: string;
  action?: React.ReactNode;
}> = ({ title, description, action }) => (
  <div className="rounded-2xl border border-dashed border-[#91A3BA]/25 bg-[#101B2D]/40 p-8 text-center">
    <Sparkles className="mx-auto h-7 w-7 text-[#00D9FF]/80" />
    <h3 className="mt-3 font-display text-base font-bold text-[#EAF4FF]">{title}</h3>
    <p className="mx-auto mt-1 max-w-md text-sm text-[#91A3BA]">{description}</p>
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export const ErrorState: React.FC<{ title?: string; message: string }> = ({
  title = 'Validation Notice',
  message,
}) => (
  <div className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
    <AlertCircle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
    <div>
      <div className="font-semibold">{title}</div>
      <div className="text-red-200/80">{message}</div>
    </div>
  </div>
);

export const AssumptionsBar: React.FC<{ assumptions: string[] }> = ({ assumptions }) => (
  <div className="flex items-start gap-2.5 rounded-xl border border-[#7565FF]/25 bg-[#7565FF]/10 px-3.5 py-2.5 text-xs text-[#C8C2FF]">
    <Info className="h-4 w-4 shrink-0 text-[#7565FF] mt-0.5" />
    <div>
      <span className="font-semibold text-[#EAF4FF]">Model Assumptions: </span>
      {assumptions.join(' • ')}
    </div>
  </div>
);
