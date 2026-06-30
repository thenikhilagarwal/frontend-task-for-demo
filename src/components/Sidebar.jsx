import { Sun, Moon, PanelLeftClose } from 'lucide-react';
import logo from '../assets/logo.svg';
import { useEffect, useState } from 'react';

export default function Sidebar({ theme, setTheme, activeTab, setActiveTab }) {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleResize = () =>{
    if(window.innerWidth < 768){
      setIsSidebarCollapsed(true)
    }else{
      setIsSidebarCollapsed(false)
    }
  }

  useEffect(()=>{
    handleResize(); // Run on initial load

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  },[])

  


  return (
    <aside className={`border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between h-screen top-0 transition-all duration-300 select-none ${isSidebarCollapsed ? 'w-15' : 'w-64'}`}>
      {/* Top Brand Header */}
      <div>
        <div className="flex items-center justify-between px-4 py-5">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" />
          </div>
          <button className={`text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors`} onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
            <PanelLeftClose className='size-5' />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          <button
            onClick={() => setActiveTab('campaign')}
            className={`w-full flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center' : 'px-4'} py-3 rounded-sm font-medium text-sm transition-all duration-150 cursor-pointer ${activeTab === 'campaign'
              ? 'bg-linear-to-r from-grideant-2 from-30% to-grideant-1 via-100% hover:from-grideant-2 hover:to-grideant-2 text-white shadow-md shadow-blue-500/10 transition-all duration-200'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 13.5C15.1569 13.5 16.5 10.8137 16.5 7.5C16.5 4.18629 15.1569 1.5 13.5 1.5C11.8431 1.5 10.5 4.18629 10.5 7.5C10.5 10.8137 11.8431 13.5 13.5 13.5Z" stroke="#F6F6F6" strokeWidth="1.125" />
              <path d="M13.5 1.5C11.1727 1.5 6.34884 3.28321 3.57829 4.39029C2.30956 4.89726 1.5 6.13374 1.5 7.5C1.5 8.86627 2.30956 10.1027 3.57829 10.6097C6.34884 11.7168 11.1727 13.5 13.5 13.5" stroke="#F6F6F6" strokeWidth="1.125" />
              <path d="M8.25 16.5L6.79255 15.6977C5.20573 14.8243 4.3099 13.06 4.5341 11.25" stroke="#F6F6F6" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={isSidebarCollapsed ? 'hidden' : ''}>Campaign</span>
          </button>
        </nav>
      </div>

      {/* Bottom Profile and Settings */}
      <div className="p-4 space-y-4">
        {isSidebarCollapsed ? 
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="John Doe"
            className="size-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-50 dark:border-slate-900 rounded-full"></span>
        </div>
        : <>
        <div className='bg-gray dark:bg-slate-800/40 p-3 rounded-lg'>
          {/* User Card */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="John Doe"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-50 dark:border-slate-900 rounded-full"></span>
              </div>
              <div>
                <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-tight">
                  John Doe
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  Admin
                </div>
              </div>
            </div>
            <button className="text-slate-400 bg-[#E1E7F1] hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.413 5.13644C12.3731 4.2004 12.2543 3.60395 11.9015 3.14502C11.7646 2.96694 11.6049 2.80754 11.4264 2.67089C10.7335 2.1402 9.72749 2.1402 7.71561 2.1402H7.2867C4.86062 2.1402 3.64758 2.1402 2.89388 2.8924C2.1402 3.6446 2.14018 4.85528 2.14018 7.27659L2.14017 13.2691C2.14016 15.6904 2.14015 16.9011 2.89385 17.6533C3.64754 18.4055 4.86059 18.4055 7.2867 18.4055H7.71556C9.72749 18.4055 10.7335 18.4055 11.4264 17.8748C11.6048 17.7382 11.7646 17.5788 11.9015 17.4007C12.2543 16.9417 12.3731 16.3452 12.413 15.4089" stroke="#141B34" strokeWidth="1.2841" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.5494 10.2728H7.27658M15.4092 13.2691C15.4092 13.2691 18.4055 11.0624 18.4055 10.2729C18.4055 9.4833 15.4092 7.27661 15.4092 7.27661" stroke="#141B34" strokeWidth="1.2841" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Email display below card */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
              Email
            </div>
            <div className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
              johndoe@gmail.com
            </div>
          </div>
        </div>
        {/* Theme Toggle Widget */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-100/50 dark:border-slate-800/50">
          <button
            onClick={() => setTheme('light')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${theme === 'light'
              ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Light</span>
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${theme === 'dark'
              ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Dark</span>
          </button>
        </div>
        </>
        }
        

        
      </div>
    </aside>
  );
}
