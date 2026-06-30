import { useState } from 'react';
import advance from '../assets/advance.svg';
import standard from '../assets/standard.svg';

export default function CampaignModal({ isOpen, onClose, onNext }) {
  const [workflowMode, setWorkflowMode] = useState('advanced');

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  const handleNext = () => {
    onNext(workflowMode);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={handleClose}
      ></div>

      {/* Modal Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-md w-full max-w-2xl shadow-2xl relative z-10 overflow-hidden transform scale-100 transition-all duration-300 max-h-[95vh] flex flex-col">
        {/* Step 1: Header */}
        <div className="flex items-center justify-between p-6 pb-4 bg-[#F8F8F8] dark:bg-slate-900">
          <div>
            <h3 className="text-lg font-medium text-[#5E5873] dark:text-slate-100 tracking-tight">
              Select Workflow Mode
            </h3>
            <p className="text-sm text-[#5E5873] dark:text-slate-450 font-normal">
              Choose how you want your campaign to behave
            </p>
          </div>
          <button
            onClick={handleClose}
            className="transition-all cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Step 1: Body (Workflow Modes) */}
        <div className="px-8 py-4 space-y-5 flex-1 overflow-y-auto">

          {/* Card 1: Advanced Workflow */}
          <div
            onClick={() => setWorkflowMode('advanced')}
            className={`relative flex flex-col sm:flex-row items-center justify-between p-6 rounded-lg border-1 transition-all duration-300 cursor-pointer ${workflowMode === 'advanced'
              ? 'bg-[#F6F8FF] dark:bg-blue-950/20 border-[#CFDAFE] shadow-xs'
              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700'
              }`}
          >
            <div className="flex items-start gap-4 flex-1 w-full">
              {/* Custom Radio Button */}
              <div className="mt-1 flex-shrink-0">
                {workflowMode === 'advanced' ? (
                  <div className="w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-transparent"></div>
                )}
              </div>

              {/* Text Details */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#5E5873] dark:text-slate-150 text-sm">
                    Advanced Workflow
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#28C76F1F] dark:bg-emerald-950/40 text-[#28C76F] dark:text-emerald-450">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-[#5E5873] dark:text-slate-450 font-normal">
                  Best for high-volume outreach
                </p>
                {/* Horizontal Bullets */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1.5">
                  <div className="flex items-center gap-1.5 text-sm text-[#5E5873] dark:text-slate-450 font-normal">
                    <span className="size-2 rounded-full bg-[#B1B1B1] dark:bg-slate-700"></span>
                    <span>Conditional logic</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-[#5E5873] dark:text-slate-450 font-normal">
                    <span className="size-2 rounded-full bg-[#B1B1B1] dark:bg-slate-700"></span>
                    <span>Multiple paths</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-[#5E5873] dark:text-slate-450 font-normal">
                    <span className="size-2 rounded-full bg-[#B1B1B1] dark:bg-slate-700"></span>
                    <span>More control</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SVG Illustration */}
            <div className="hidden md:block flex-shrink-0 ml-4 pointer-events-none select-none">
              <img src={advance} alt="advance" />
            </div>
          </div>

          {/* Card 2: Standard Workflow */}
          <div
            onClick={() => setWorkflowMode('standard')}
            className={`relative flex flex-col sm:flex-row items-center justify-between p-6 rounded-lg border-1 transition-all duration-300 cursor-pointer ${workflowMode === 'standard'
              ? 'bg-[#F6F8FF] dark:bg-blue-950/20 border-[#CFDAFE] shadow-xs'
              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700'
              }`}
          >
            <div className="flex items-start gap-4 flex-1 w-full">
              {/* Custom Radio Button */}
              <div className="mt-1 flex-shrink-0">
                {workflowMode === 'standard' ? (
                  <div className="w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-650 bg-transparent"></div>
                )}
              </div>

              {/* Text Details */}
              <div className="space-y-1.5 flex-1">
                <span className="font-bold text-[#5E5873] dark:text-slate-150 text-sm">
                  Standard Workflow
                </span>
                <p className="text-sm text-[#5E5873] dark:text-slate-450 font-normal">
                  Best for beginners
                </p>
                {/* Horizontal Bullets */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1.5">
                  <div className="flex items-center gap-1.5 text-sm text-[#5E5873] dark:text-slate-450 font-normal">
                    <span className="size-2 rounded-full bg-[#B1B1B1] dark:bg-slate-700"></span>
                    <span>Linear steps</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-[#5E5873] dark:text-slate-450 font-normal">
                    <span className="size-2 rounded-full bg-[#B1B1B1] dark:bg-slate-700"></span>
                    <span>No conditions</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-[#5E5873] dark:text-slate-450 font-normal">
                    <span className="size-2 rounded-full bg-[#B1B1B1] dark:bg-slate-700"></span>
                    <span>Easy Setup</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SVG Illustration */}
            <div className="hidden md:block flex-shrink-0 ml-4 pointer-events-none select-none">
              <img src={standard} alt="standard" />
            </div>
          </div>
        </div>

        {/* Step 1: Footer */}
        <div className="flex items-center justify-end gap-3 px-8 pb-5">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2.5 rounded-sm bg-[#E8E8E8] text-[#9692A4] dark:bg-[#141B34] dark:text-slate-400 text-sm font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-sm bg-linear-to-r from-grideant-2 from-30% to-grideant-1 via-100% hover:from-grideant-2 hover:to-grideant-2 text-white text-sm font-medium shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
