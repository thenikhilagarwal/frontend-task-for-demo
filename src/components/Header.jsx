import React from 'react';
import { Home, ChevronRight } from 'lucide-react';


export default function Header({ breadcrumbs }) {
  const items = breadcrumbs || [{ label: 'Campaign' }];

  return (
    <header className="h-16 bg-white dark:bg-slate-900 rounded-md flex items-center justify-between px-6 transition-colors duration-200 shadow-lg">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (items[0] && items[0].onClick) {
              items[0].onClick();
            }
          }}
          className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
        >
          <Home className="size-4 text-primary" />
        </a>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="size-4" />
            {item.onClick ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  item.onClick();
                }}
                className="truncate md:w-auto sm:w-20 w-10 font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
              >
                {item.label}
              </button>
            ) : (
              <span className="font-medium text-slate-700 dark:text-slate-300 truncate sm:w-40 w-10">
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Profile Info Top-Right */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <div className="text-slate-700 dark:text-slate-100 text-sm leading-tight">
            John Doe
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            Admin
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="John Doe"
            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-50 dark:border-slate-950 rounded-full"></span>
        </div>
      </div>
    </header>
  );
}
