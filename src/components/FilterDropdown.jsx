import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

// --- Filter dropdown ---
export default function FilterDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer select-none"
      >
        {value || label}
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1.5 z-50 w-40 bg-white border border-slate-100 rounded-xl shadow-lg py-1">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt === (value || label) ? null : opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${value === opt ? 'text-blue-600 bg-slate-50' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
