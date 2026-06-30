import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CampaignEmptyState from './components/CampaignEmptyState';
import CampaignModal from './components/CampaignModal';
import CampaignTable from './components/CampaignTable';
import CampaignWorkflow from './components/CampaignWorkflow';
import LookalikeModal from './components/LookalikeModal';
import { Search, ChevronDown } from 'lucide-react';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Active Tab in Sidebar
  const [activeTab, setActiveTab] = useState('campaign');

  // View States
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'workflow'
  const [workflowMode, setWorkflowMode] = useState('advanced'); // 'advanced' or 'standard'

  // Campaigns State - Initialized empty to match the user's empty state screenshot
  const [campaigns, setCampaigns] = useState(() => {
    const saved = localStorage.getItem('campaigns');
    return saved ? JSON.parse(saved) : [];
  });

  // UI Control States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Lookalike modal states
  const [isLookalikeModalOpen, setIsLookalikeModalOpen] = useState(false);
  const [lookalikeLists, setLookalikeLists] = useState([]);
  const [selectedLookalikeListId, setSelectedLookalikeListId] = useState(null);

  // Sync theme with DOM
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync campaigns with localStorage
  // useEffect(() => {
  //   localStorage.setItem('campaigns', JSON.stringify(campaigns));
  // }, [campaigns]);

  // Handlers
  const handleSaveCampaign = (newCampaign, redirect = true) => {
    setCampaigns((prev) => [newCampaign, ...prev]);
    if (redirect) {
      setCurrentView('list');
    }
    setIsModalOpen(false);
  };

  const handleCancelWorkflow = () => {
    setCurrentView('list');
  };

  const handleDeleteCampaign = (id) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
    }
  };
    

  // Filter & Search Logic
  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="activeSidebar min-h-screen bg-[#F8F8F8] dark:bg-slate-950 flex flex-row transition-colors duration-200">
      {/* Sidebar navigation */}
      <Sidebar
        theme={theme}
        setTheme={setTheme}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'campaign') {
            setCurrentView('list');
          }
        }}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 pt-3 px-4 sm:px-5 lg:pt-3 lg:px-5">
        {/* Header toolbar */}
        <Header
          breadcrumbs={
            currentView === 'workflow'
              ? [
                { label: 'Campaign', onClick: () => setCurrentView('list') },
                { label: workflowMode === 'advanced' ? 'Advance Campaign' : 'Standard Campaign' }
              ]
              : [{ label: 'Campaign' }]
          }
        />

        {/* Content Viewport */}
        <main className='flex-1 p-4 sm:p-8 my-6 w-full mx-auto space-y-6 transition-all duration-300 bg-white dark:bg-slate-900'>

          {currentView === 'workflow' ? (
            <CampaignWorkflow
              mode={workflowMode}
              onCancel={handleCancelWorkflow}
              onSave={handleSaveCampaign}
              lookalikeLists={lookalikeLists}
              selectedLookalikeListId={selectedLookalikeListId}
              setIsLookalikeModalOpen={setIsLookalikeModalOpen}
            />
          ) : (
            <>
              

              {/* Main Content Area */}
              <div className="transition-all duration-300">
                {campaigns.length === 0 ? (
                  <>
                  {/* Controls Bar (Filter select & Search bar) */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">

                      {/* Filter Dropdown */}
                      <div className="flex flex-wrap gap-3">
                        <div className="relative w-full sm:w-56">
                          <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all cursor-pointer shadow-xs select-none"
                          >
                            <span>{statusFilter === 'All' ? 'All' : statusFilter}</span>
                            <ChevronDown className={`${isDropdownOpen ? 'transform rotate-180' : ''} w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-200`} />
                          </button>

                          {isDropdownOpen && (
                            <>
                              {/* Overlay click catcher */}
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsDropdownOpen(false)}
                              ></div>

                              {/* Dropdown Menu options */}
                              <div className="absolute left-0 mt-2 w-full sm:w-44 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-lg z-20 py-1.5 overflow-hidden animate-fade-in">
                                {['All', 'Active', 'Draft', 'Scheduled', 'Completed'].map((statusOption) => (
                                  <button
                                    key={statusOption}
                                    onClick={() => {
                                      setStatusFilter(statusOption);
                                      setIsDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${statusFilter === statusOption
                                      ? 'bg-slate-50 dark:bg-slate-800/80 text-brand-blue'
                                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200'
                                      }`}
                                  >
                                    {statusOption === 'All' ? 'All Statuses' : statusOption}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                        {/* Search Bar */}
                        <div className="relative flex-1 w-full sm:w-56">
                          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                          <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm text-slate-800 dark:text-slate-150 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all shadow-xs"
                          />
                        </div>


                      </div>
                    </div>
                    {/* Empty State (Matches screenshot) */}
                    <CampaignEmptyState onCreateCampaign={() => setIsModalOpen(true)} />
                  </>
                ) : filteredCampaigns.length === 0 ? (
                  // Empty State for Search/Filters
                  <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl py-20 px-4 text-center">
                    <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">
                      No campaigns match your search term or status filter.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('All');
                      }}
                      className="text-brand-blue hover:text-brand-blue-hover text-sm font-semibold underline cursor-pointer"
                    >
                      Clear search and filters
                    </button>
                  </div>
                ) : (
                  // Campaigns List Table
                  <CampaignTable
                    campaigns={filteredCampaigns}
                    onDeleteCampaign={handleDeleteCampaign}
                    onCreateCampaign={() => setIsModalOpen(true)}
                  />
                )}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Creation Modal */}
      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={(mode) => {
          setWorkflowMode(mode);
          setCurrentView('workflow');
          setIsModalOpen(false);
        }}
      />
      
      <LookalikeModal
          isOpen={isLookalikeModalOpen}
          onClose={() => setIsLookalikeModalOpen(false)}
          lists={lookalikeLists}
          onCreateList={(newList) => setLookalikeLists(prev => [...prev, newList])}
          selectedListId={selectedLookalikeListId}
          onSelectConfirm={(id) => setSelectedLookalikeListId(id)}
        />
    </div>
  );
}
