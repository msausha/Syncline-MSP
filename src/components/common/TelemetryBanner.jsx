import React, { useEffect, useRef } from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, Activity } from 'lucide-react';
import gsap from 'gsap';

const NEWS_ITEMS = [
  { tag: "M365", title: "Microsoft 365 Copilot Agent updates rolled out for enterprise security." },
  { tag: "AZURE", title: "Azure Virtual Networks security protocols updated for multi-tenant environments." },
  { tag: "SECURITY", title: "New Victorian SMB cybersecurity compliance guidelines released." },
  { tag: "BACKUP", title: "Automated cloud backup verification sequences optimized." }
];

function getWeatherDetails(code) {
  if (code === 0) return { label: 'Clear Sky', icon: Sun, color: 'text-amber-400' };
  if (code >= 1 && code <= 3) return { label: 'Partly Cloudy', icon: Cloud, color: 'text-cyan-400' };
  if (code >= 51 && code <= 67) return { label: 'Light Rain', icon: CloudRain, color: 'text-blue-400' };
  if (code >= 95) return { label: 'Thunderstorm', icon: CloudLightning, color: 'text-purple-400' };
  return { label: 'Mild', icon: Sun, color: 'text-cyan-400' };
}

export default function TelemetryBanner({ weatherData }) {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  const weatherInfo = weatherData ? getWeatherDetails(weatherData.code) : { label: 'Loading...', icon: Activity, color: 'text-cyan-400' };
  const WeatherIcon = weatherInfo.icon;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const totalWidth = el.scrollWidth / 2;
    
    tweenRef.current = gsap.to(el, {
      x: `-${totalWidth}px`,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-between bg-slate-950/40 backdrop-blur-md border-b border-white/10 px-7 py-2 text-xs text-slate-300 shadow-md">
      <div className="flex items-center gap-2 border-r border-white/10 pr-6 shrink-0">
        <WeatherIcon className={`w-3.5 h-3.5 ${weatherInfo.color} animate-pulse`} />
        <span>Melbourne: <strong className="text-white font-medium">{weatherData ? `${weatherData.temp}°C, ${weatherInfo.label}` : 'Connecting...'}</strong></span>
      </div>

      <div 
        className="flex-grow overflow-hidden ml-6 relative whitespace-nowrap"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.play()}
      >
        <div className="inline-flex gap-10" ref={trackRef}>
          {[...NEWS_ITEMS, ...NEWS_ITEMS].map((item, idx) => (
            <div key={idx} className="inline-flex items-center gap-2 cursor-default">
              <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {item.tag}
              </span>
              <span className="text-slate-300 hover:text-white transition-colors">{item.title}</span>
              <span className="text-slate-600 ml-2">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}