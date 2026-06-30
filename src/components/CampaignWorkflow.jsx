import { useState } from 'react';
import zapier from '../assets/zapier.png';
import n8n from '../assets/n8n.png';
import webhooks from '../assets/webhooks.png';
import stats from '../assets/stats.png';
import crm from '../assets/crm.png';
import {
  ListChecks,
  User,
  Settings,
  BarChart3,
  ChevronDown,
  Info,
  ChevronUp,
  FileText,
  Users,
  Webhook,
  ChevronRight,
  Upload,
  Check,
  Sparkles,
  Copy,
  CornerDownLeft,
  CloudDownload,
  Search,
  Plus,
  Mail,
  Trash2,
  Clock,
  Bot,
  MessageCircleMore,
  Rocket,
  Pause,
  Megaphone,
  SquarePen,
  MessageSquare,
  Send,
  UserCheck,
  ExternalLink
} from 'lucide-react';
import SemiCircularProgress from './SemiCircularProgress';

const Linkedin = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function CampaignWorkflow({
  mode,
  onCancel,
  onSave,
  lookalikeLists = [],
  selectedLookalikeListId = null,
  setIsLookalikeModalOpen
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [importAccordionOpen, setImportAccordionOpen] = useState(true);
  const [isLaunched, setIsLaunched] = useState(false);

  // Form/State values
  const [selectedMethod, setSelectedMethod] = useState('linkedin');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [leadList, setLeadList] = useState('My Warm Leads');

  // Step 2: Sender Profiles State
  const [activeSenderTab, setActiveSenderTab] = useState('linkedin');
  const [senderSearchQuery, setSenderSearchQuery] = useState('');
  const [senderShowLimit, setSenderShowLimit] = useState(10);
  const [selectedSenderRows, setSelectedSenderRows] = useState(['linkedin-1']); // default selected matching screenshot

  const [linkedinSenders, setLinkedinSenders] = useState([
    {
      id: 'linkedin-1',
      name: 'Edgar Jones',
      connections: '1,250 connections',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      health: 72,
      limit: 'Invites: 40 / day',
      accountType: 'Premium',
      status: 'Connected'
    },
    {
      id: 'linkedin-2',
      name: 'Sarah Jenkins',
      connections: '850 connections',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      health: 94,
      limit: 'Invites: 60 / day',
      accountType: 'Standard',
      status: 'Connected'
    },
    {
      id: 'linkedin-3',
      name: 'Michael Brown',
      connections: '3,100 connections',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      health: 45,
      limit: 'Invites: 20 / day',
      accountType: 'Premium',
      status: 'Disconnected'
    }
  ]);

  const [emailSenders, setEmailSenders] = useState([
    {
      id: 'email-1',
      name: 'John Doe',
      connections: 'john.doe@company.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      health: 98,
      limit: 'Emails: 200 / day',
      accountType: 'Google Workspace',
      status: 'Connected'
    },
    {
      id: 'email-2',
      name: 'Jane Smith',
      connections: 'jane.smith@company.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      health: 85,
      limit: 'Emails: 150 / day',
      accountType: 'Microsoft 365',
      status: 'Connected'
    },
    {
      id: 'email-3',
      name: 'Sales Outreach',
      connections: 'info@salesreach.io',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      health: 60,
      limit: 'Emails: 50 / day',
      accountType: 'SMTP / Custom',
      status: 'Warning'
    }
  ]);

  const handleLimitChange = (id, newLimit) => {
    if (activeSenderTab === 'linkedin') {
      setLinkedinSenders(prev => prev.map(item => item.id === id ? { ...item, limit: newLimit } : item));
    } else {
      setEmailSenders(prev => prev.map(item => item.id === id ? { ...item, limit: newLimit } : item));
    }
  };

  const toggleRowSelection = (id) => {
    setSelectedSenderRows(prev => {
      if (prev.includes(id)) {
        return prev.filter(rowId => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const activeProfiles = activeSenderTab === 'linkedin' ? linkedinSenders : emailSenders;
  const filteredProfiles = activeProfiles.filter(profile =>
    profile.name.toLowerCase().includes(senderSearchQuery.toLowerCase()) ||
    profile.connections.toLowerCase().includes(senderSearchQuery.toLowerCase())
  );
  const visibleProfiles = filteredProfiles.slice(0, senderShowLimit);

  const toggleAllRows = (visibleRows) => {
    const visibleIds = visibleRows.map(r => r.id);
    const allSelected = visibleIds.every(id => selectedSenderRows.includes(id));
    if (allSelected) {
      setSelectedSenderRows(prev => prev.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedSenderRows(prev => {
        const unique = new Set([...prev, ...visibleIds]);
        return Array.from(unique);
      });
    }
  };

  // Step 3: Settings State
  const [timezone, setTimezone] = useState('America/New_York');
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Sat']);
  const [dailyLimits, setDailyLimits] = useState({ connections: 80, messages: 120, emails: 300 });
  const [tracking, setTracking] = useState({ opens: true, clicks: true, replies: true });

  // Additional Step 3 States from Screenshot
  const [sendingWindowName, setSendingWindowName] = useState('USA Outreach Time');
  const [timeRange, setTimeRange] = useState('11:30 AM - 04:00 PM');
  const [timezoneName, setTimezoneName] = useState('USA Timezone');

  const [aiAssistAutoMessage, setAiAssistAutoMessage] = useState(false);
  const [aiAssistAutoHandle, setAiAssistAutoHandle] = useState(false);
  const [aiAssistFollowUps, setAiAssistFollowUps] = useState('2');

  const [triggerZapier, setTriggerZapier] = useState(true);
  const [zapierEvents, setZapierEvents] = useState({
    responseReceived: true,
    inviteSent: false,
    invitationAccepted: false,
    invitationWithdrawn: false,
    followupSent: false
  });

  // Step 4: Final Campaign Stats/Setup State
  const [campaignDetails, setCampaignDetails] = useState({
    name: 'New Outreach Campaign',
    channel: 'Email',
    subject: '',
    description: '',
    status: 'Active'
  });
  const [errors, setErrors] = useState({});

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleLaunchCampaign = () => {
    const campaignName = campaignDetails.name || 'Tech Founder';
    const campaignSubject = campaignDetails.subject || 'Quick question regarding your pipeline...';

    onSave({
      id: Date.now().toString(),
      name: campaignName,
      channel: campaignDetails.channel || 'Email',
      subject: campaignSubject,
      status: 'Active',
      description: campaignDetails.description || 'Campaign created via Advanced Workflow',
      workflowMode: mode,
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      metrics: {
        sent: 988,
        openedRate: 61,
        clickedRate: 44,
      }
    }, false);

    setIsLaunched(true);
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      if (!isLaunched) {
        handleLaunchCampaign();
      }
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText("https://api.frontendtask.com/v1/webhooks/inbound/usr_9837a2810");
    alert("Webhook URL copied to clipboard!");
  };

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* 1. Horizontal Stepper */}
      <div className="bg-white dark:bg-slate-900 border border-[#E7EDF6] dark:border-slate-800 rounded-md md:px-6 px-4 py-4 shadow-xs flex flex-wrap items-center md:gap-x-5 gap-x-3 xl:gap-x-10 gap-y-4">
        {/* Step 1: Define Target Audience */}
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-lg flex items-center justify-center transition-all ${currentStep === 1
            ? 'bg-primary text-white shadow-md shadow-blue-500/20'
            : currentStep > 1
              ? 'bg-[#D0DCFF] text-primary'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}>
            <ListChecks className="size-5" />
          </div>
          <div className={`text-base font-medium ${currentStep === 1 ? 'text-[#444050] dark:text-slate-100' : 'text-[#444050] dark:text-slate-400'}`}>Define Target Audience</div>
        </div>

        <ChevronRight className="size-5 text-slate-700" />

        {/* Step 2: Sender Profiles */}
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-lg flex items-center justify-center transition-all ${currentStep === 2
            ? 'bg-primary text-white shadow-md shadow-blue-500/20'
            : currentStep > 2
              ? 'bg-[#D0DCFF] text-primary'
              : 'bg-[#E8E8E8] dark:bg-slate-800 text-slate-400'
            }`}>
            <User className="size-5" />
          </div>
          <div className={`text-base font-medium ${currentStep === 2 ? 'text-[#5E5873] dark:text-slate-100' : 'text-[#444050] dark:text-slate-400'}`}>Sender Profiles</div>
        </div>

        <ChevronRight className="size-5 text-slate-700" />

        {/* Step 3: Settings */}
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-lg flex items-center justify-center transition-all ${currentStep === 3
            ? 'bg-primary text-white shadow-md shadow-blue-500/20'
            : currentStep > 3
              ? 'bg-[#D0DCFF] text-primary'
              : 'bg-[#E8E8E8] dark:bg-slate-800 text-slate-400'
            }`}>
            <Settings className="size-5" />
          </div>
          <div className={`text-base font-medium ${currentStep === 3 ? 'text-[#5E5873] dark:text-slate-100' : 'text-[#444050] dark:text-slate-400'}`}>Settings</div>
        </div>

        <ChevronRight className="size-5 text-slate-700" />

        {/* Step 4: Stats */}
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-lg flex items-center justify-center transition-all ${currentStep === 4
            ? 'bg-primary text-white shadow-md shadow-blue-500/20' : currentStep > 4 ? 'bg-[#D0DCFF] text-primary' : 'bg-[#E8E8E8] dark:bg-slate-800 text-slate-400'
            }`}>
            <BarChart3 className="size-5" />
          </div>
          <div className={`text-base font-medium ${currentStep === 4 ? 'text-[#5E5873] dark:text-slate-100' : 'text-[#444050] dark:text-slate-400'}`}>Stats</div>
        </div>
      </div>

      {/* 2. Step View Content Container */}
      <div className="flex flex-col justify-between">

        {/* STEP 1: DEFINE TARGET AUDIENCE */}
        {currentStep === 1 && (
          <div className='h-[calc(100vh-366px)]'>
          <div className="relative pl-8 space-y-6 ">
            {/* Timeline Line */}
            <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-[#EAEFFF] dark:bg-slate-850"></div>

            {/* Sub-step 1: Choose Import Method */}
            <div className="relative space-y-4">
              {/* Node 1 */}
              <div className="absolute -left-8 top-2 size-5 rounded-full bg-emerald-500 flex items-center justify-center text-white z-10">
                <Check className="size-3 stroke-3" />
              </div>

              {/* Header Bar */}
              <button
                type="button"
                onClick={() => setImportAccordionOpen(!importAccordionOpen)}
                className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-[#E7EDF6] dark:border-slate-800 rounded-md text-left font-bold text-slate-800 dark:text-slate-100 hover:text-brand-blue transition-all cursor-pointer"
              >
                <span className="text-base font-medium text-[#444050] dark:text-slate-200">Choose Import Method</span>
                {importAccordionOpen ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
              </button>

              {/* Cards Content */}
              {importAccordionOpen && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 animate-fade-in">
                  {/* Method 1: LinkedIn Search */}
                  <div
                    onClick={() => setSelectedMethod('linkedin')}
                    className={`relative p-5 border rounded-xl cursor-pointer transition-all flex flex-col justify-between min-h-[170px] ${selectedMethod === 'linkedin'
                      ? 'bg-[#F6F8FF] dark:bg-[#F9FBFF] border-primary shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
                      }`}
                  >
                    {selectedMethod === 'linkedin' && (
                      <div className="absolute top-3 right-3 size-5 bg-primary text-white rounded-sm flex items-center justify-center shadow-xs">
                        <Check className="size-3 stroke-3" />
                      </div>
                    )}
                    <div className="space-y-4">
                      <div className={`size-4 rounded-lg flex items-center justify-center ${selectedMethod === 'linkedin' ? 'bg-[#F6F8FF] text-primary' : 'text-[#5E5873] dark:text-slate-400'}`}>
                        <Linkedin className="size-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#5E5873] dark:text-slate-200">LinkedIn Search</h4>
                        <p className="text-xs text-[#5E5873] dark:text-slate-500 font-normal leading-relaxed mt-1">
                          (Basic, Sales Nav, Post, Group or Event URL)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Method 2: Upload CSV File */}
                  <div
                    onClick={() => setSelectedMethod('csv')}
                    className={`relative p-5 border rounded-xl cursor-pointer transition-all flex flex-col justify-between min-h-[170px] ${selectedMethod === 'csv'
                      ? 'bg-[#F6F8FF] dark:bg-blue-950/20 border-brand-blue shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
                      }`}
                  >
                    {selectedMethod === 'csv' && (
                      <div className="absolute top-3 right-3 size-5 bg-brand-blue text-white rounded-md flex items-center justify-center shadow-xs">
                        <Check className="size-3 stroke-3" />
                      </div>
                    )}
                    <div className="space-y-4">
                      <div className={`size-4 rounded-lg flex items-center justify-center ${selectedMethod === 'csv' ? 'bg-[#F6F8FF] text-primary' : 'text-[#5E5873] dark:text-slate-400'}`}>
                        <FileText className="size-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#5E5873] dark:text-slate-200">Upload CSV File</h4>
                        <p className="text-xs text-[#5E5873] dark:text-slate-500 font-normal leading-relaxed mt-1">
                          Upload LinkedIn profiles via CSV. <span className="text-brand-blue font-semibold hover:underline">Download Sample</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Method 3: Lookalike Audience */}
                  <div
                    onClick={() => {
                      setSelectedMethod('list');
                      setIsLookalikeModalOpen(true);
                    }}
                    className={`relative p-5 border rounded-xl cursor-pointer transition-all flex flex-col justify-between min-h-[170px] ${selectedMethod === 'list'
                      ? 'bg-[#F6F8FF] dark:bg-blue-950/20 border-brand-blue shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
                      }`}
                  >
                    {selectedMethod === 'list' && (
                      <div className="absolute top-3 right-3 size-5 bg-brand-blue text-white rounded-md flex items-center justify-center shadow-xs">
                        <Check className="size-3 stroke-3" />
                      </div>
                    )}
                    <div className="space-y-4">
                      <div className={`size-4 rounded-lg flex items-center justify-center ${selectedMethod === 'list' ? 'bg-[#F6F8FF] text-primary' : 'text-[#5E5873] dark:text-slate-400'}`}>
                        <Users className="size-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#5E5873] dark:text-slate-200">Lookalike Audience</h4>
                        <p className="text-xs text-[#5E5873] dark:text-slate-500 font-normal leading-relaxed mt-1">
                          Use Lead Finder to find audience.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Method 4: Inbound Webhook */}
                  <div
                    onClick={() => setSelectedMethod('webhook')}
                    className={`relative p-5 border rounded-xl cursor-pointer transition-all flex flex-col justify-between min-h-[170px] ${selectedMethod === 'webhook'
                      ? 'bg-[#F6F8FF] dark:bg-blue-950/20 border-brand-blue shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
                      }`}
                  >
                    {selectedMethod === 'webhook' && (
                      <div className="absolute top-3 right-3 size-5 bg-brand-blue text-white rounded-md flex items-center justify-center shadow-xs">
                        <Check className="size-3 stroke-3" />
                      </div>
                    )}
                    <div className="space-y-4">
                      <div className={`size-4 rounded-lg flex items-center justify-center ${selectedMethod === 'webhook' ? 'bg-[#F6F8FF] text-primary' : 'text-[#5E5873] dark:text-slate-400'}`}>
                        <Webhook className="size-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#5E5873] dark:text-slate-200">Inbound Webhook</h4>
                        <p className="text-xs text-[#5E5873] dark:text-slate-500 font-normal leading-relaxed mt-1">
                          Sync leads from zapier, n8n make in real time
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sub-step 2: Paste URL / Method Details */}
            <div className="relative space-y-4">

              {selectedMethod === 'list' ? "" :
                <>
                  {/* Node 2 */}
                  <div className="absolute -left-8 top-5 size-5 rounded-full border-2 border-primary bg-white dark:bg-slate-900 flex items-center justify-center z-10">
                    <div className="size-1.5 rounded-full bg-primary"></div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 w-full p-4 bg-white dark:bg-slate-900 border border-[#E7EDF6] dark:border-slate-800 rounded-md font-bold text-[#444050] dark:text-slate-100">
                    <span className="text-base font-medium text-[#444050] dark:text-slate-200">
                      {selectedMethod === 'linkedin' && 'Paste LinkedIn Search URL'}
                      {selectedMethod === 'csv' && 'Upload CSV File'}
                      {selectedMethod === 'list' && 'Lookalike Audience Selection'}
                      {selectedMethod === 'webhook' && 'Inbound Webhook Configuration'}
                    </span>
                    {selectedMethod == 'csv' && (
                      <span className='bg-[#F8F8F8] px-3 py-1 rounded-sm font-semibold text-slate-700 text-xs'>Step 1 of 2</span>
                    )}
                  </div>
                </>
              }



              {/* Details Card */}

              {selectedMethod === 'linkedin' && (
                <div className="bg-white dark:bg-slate-900 border border-[#EBE9F1] dark:border-slate-800 rounded-md p-6">
                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-350 text-sm">
                        <div className="size-4 text-primary shrink-0">
                          <Linkedin className="size-4" />
                        </div>
                        <span className="font-normal text-slate-600 dark:text-slate-300">
                          Find your target audience with{" "}
                          <a href="#" onClick={(e) => e.preventDefault()} className="text-primary underline font-semibold">LinkedIn Search</a> or{" "}
                          <a href="#" onClick={(e) => e.preventDefault()} className="text-primary underline font-semibold">Sales Navigator</a> or{" "}
                          <a href="#" onClick={(e) => e.preventDefault()} className="text-primary underline font-semibold">Post URL</a> or{" "}
                          <a href="#" onClick={(e) => e.preventDefault()} className="text-primary underline font-semibold">Group URL</a>
                        </span>
                      </div>
                      <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 text-xs text-primary hover:text-brand-blue-hover font-medium shrink-0">
                        <Info className='size-3' />
                        Search Guide
                      </a>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="https://www.linkedin.com/search/results/people/?keywords="
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm text-slate-800 dark:text-slate-150 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                      />
                      <button
                        type="button"
                        className="px-6 py-2.5 bg-primary hover:bg-brand-blue-hover text-white rounded-md text-sm font-semibold transition-all cursor-pointer shadow-xs shrink-0"
                      >
                        Validate
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="size-2 rounded-full bg-primary/50 flex items-center justify-center">
                        <div className="size-1 rounded-full bg-primary"></div>
                      </div>
                      <span>Paste the search URL directly from Linkedin</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'csv' && (
                <div className="space-y-4">
                  <div className="border border-dashed border-primary dark:border-slate-700/60 rounded-sm p-8 text-center bg-[#F8FAFF] dark:bg-slate-900 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer">
                    <span className='flex justify-center items-center gap-1 size-12 bg-[#EAEFFF] rounded-md'>
                      <Upload className="size-8 text-primary dark:text-slate-650" />
                    </span>
                    <div className="text-sm font-medium text-primary dark:text-slate-400">
                      {csvFile ? csvFile.name : "Drag a File or click a browse"}
                    </div>
                    <div className="text-xs text-[#5E5873]">File with up to 100 rows works best</div>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={(e) => setCsvFile(e.target.files[0])}
                      className="hidden"
                      id="csv-upload-field"
                    />
                    <label htmlFor="csv-upload-field" className="px-4 py-1.5 bg-[#EAEFFF] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                      Select File
                    </label>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-[#5E5873] dark:text-slate-500 cursor-pointer'>
                    <CloudDownload className='text-primary' /> Download a sample file
                  </div>
                </div>
              )}


              {selectedMethod === 'webhook' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h5 className="font-normal text-slate-600 dark:text-slate-300">Inbound Webhook Url</h5>
                      <p className="text-xs text-slate-400 dark:text-slate-500 leading-normal">
                        Send JSON payloads to this address. Ensure you specify fields such as <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-[11px] text-brand-blue">email</code> and <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-[11px] text-brand-blue">linkedinUrl</code>.
                      </p>
                    </div>
                    <button
                      onClick={copyWebhookUrl}
                      className="flex items-center gap-1 text-xs text-brand-blue hover:text-brand-blue-hover font-semibold cursor-pointer shrink-0"
                    >
                      <Copy className="size-3.5" />
                      Copy URL
                    </button>
                  </div>
                  <div className="font-mono text-xs p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-md text-slate-600 dark:text-slate-400 break-all select-all">
                    https://api.frontendtask.com/v1/webhooks/inbound/usr_9837a2810
                  </div>
                </div>
              )}

            </div>
          </div>
          </div>
        )}

        {/* STEP 2: SENDER PROFILES */}
        {currentStep === 2 && (
          <div className="space-y-6 min-h-[calc(100vh-366px)]">
            {/* Tabs */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  setActiveSenderTab('linkedin');
                  setSelectedSenderRows(['linkedin-1']); // default selected row for this tab
                }}
                className={`px-5 py-2.5 text-sm font-medium border border-primary transition-all duration-200 rounded-l-md cursor-pointer ${activeSenderTab === 'linkedin'
                  ? 'bg-[#CFDAFE] text-primary dark:bg-primary/20 dark:text-blue-400'
                  : 'bg-white text-primary hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-350'
                  }`}
              >
                LinkedIn Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveSenderTab('email');
                  setSelectedSenderRows(['email-1']); // default selected row for this tab
                }}
                className={`px-5 py-2.5 text-sm font-medium border-y border-r border-primary transition-all duration-200 rounded-r-lg cursor-pointer ${activeSenderTab === 'email'
                  ? 'bg-[#EAEFFF] text-primary dark:bg-primary/20 dark:text-blue-400'
                  : 'bg-white text-primary hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-350'
                  }`}
              >
                Email Accounts
              </button>
            </div>

            {/* Card Content */}
            <div className="bg-white dark:bg-slate-900 border border-[#E0E0E0] dark:border-slate-800 rounded-lg shadow-xs overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-[#E0E0E0] dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    {activeSenderTab === 'linkedin' ? (
                      <div className="bg-[#0A66C2] text-white p-1 rounded-sm size-6 flex items-center justify-center shrink-0">
                        <Linkedin className="size-4" fill="currentColor" stroke="none" />
                      </div>
                    ) : (
                      <div className="bg-primary text-white p-1.5 rounded-sm size-6 flex items-center justify-center shrink-0">
                        <Mail className="size-4" />
                      </div>
                    )}
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-150">
                      {activeSenderTab === 'linkedin' ? 'LinkedIn Profile' : 'Email Accounts'}
                    </h3>
                  </div>
                  <p className="text-xs text-[#444050] font-normal leading-normal">
                    {activeSenderTab === 'linkedin'
                      ? 'Pick which LinkedIn profiles you want to use for this campaign.'
                      : 'Pick which email accounts you want to use for this campaign.'}
                  </p>
                </div>

                <button
                  type="button"
                  className="px-4 py-2 bg-primary hover:bg-[#2e5cd0] text-white rounded-md text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-xs active-scale-98"
                >
                  <Plus className="size-4" />
                  Add Account
                </button>
              </div>

              {/* Action Bar / Controls */}
              <div className="px-6 py-4 bg-white dark:bg-slate-900/10 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                {/* Page Size Selector */}
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span>Show</span>
                  <div className="relative">
                    <select
                      value={senderShowLimit}
                      onChange={(e) => setSenderShowLimit(parseInt(e.target.value))}
                      className="appearance-none bg-white dark:bg-slate-900 pl-3 pr-8 py-1.5 border border-slate-200 dark:border-slate-800 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={senderSearchQuery}
                    onChange={(e) => setSenderSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-xs text-slate-800 dark:text-slate-150 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse text-left text-sm text-slate-500 dark:text-slate-400">
                  <thead className="bg-[#F3F2F7] dark:bg-slate-850/30 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th scope="col" className="p-6 w-12 text-center">
                        <input
                          type="checkbox"
                          checked={visibleProfiles.length > 0 && visibleProfiles.every(p => selectedSenderRows.includes(p.id))}
                          onChange={() => toggleAllRows(visibleProfiles)}
                          className="size-4 rounded-sm border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/30 cursor-pointer"
                        />
                      </th>
                      <th scope="col" className="px-6 py-4 font-bold">Name</th>
                      <th scope="col" className="px-6 py-4 font-bold text-center">Health</th>
                      <th scope="col" className="px-6 py-4 font-bold text-center">Daily Limits</th>
                      <th scope="col" className="px-6 py-4 font-bold">Account Type</th>
                      <th scope="col" className="px-6 py-4 font-bold text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {visibleProfiles.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                          No profiles found matching search criteria.
                        </td>
                      </tr>
                    ) : (
                      visibleProfiles.map((profile) => {
                        const isSelected = selectedSenderRows.includes(profile.id);
                        return (
                          <tr
                            key={profile.id}
                            className={`hover:bg-slate-50/55 dark:hover:bg-slate-800/10 transition-colors duration-150 ${isSelected ? 'bg-[#F6F8FF] dark:bg-blue-950/20' : ''
                              }`}
                          >
                            <td className="p-6 text-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleRowSelection(profile.id)}
                                className="size-4 rounded-sm border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/30 cursor-pointer"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={profile.avatar}
                                  alt={profile.name}
                                  className="size-9 rounded-full object-cover border border-slate-100 dark:border-slate-800"
                                />
                                <div className="flex flex-col">
                                  <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">
                                    {profile.name}
                                  </span>
                                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                                    {profile.connections}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="relative flex items-center justify-center size-10 mx-auto">
                                <svg className="size-10" viewBox="0 0 36 36">
                                  <path
                                    className="text-slate-100 dark:text-slate-800"
                                    strokeWidth="3.5"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  />
                                  <path
                                    className={
                                      profile.health >= 80
                                        ? 'text-emerald-500'
                                        : profile.health >= 50
                                          ? 'text-amber-500'
                                          : 'text-rose-500'
                                    }
                                    strokeWidth="3.5"
                                    strokeDasharray={`${profile.health}, 100`}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  />
                                </svg>
                                <span className="absolute text-xs font-bold text-slate-700 dark:text-slate-250">
                                  {profile.health}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex justify-center">
                                <input
                                  type="text"
                                  value={profile.limit}
                                  onChange={(e) => handleLimitChange(profile.id, e.target.value)}
                                  className="w-36 px-2.5 py-1.5 text-center text-xs font-semibold border border-slate-200 dark:border-slate-750 rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {profile.accountType === 'Premium' && (
                                  <>
                                    <div className="bg-[#D79A2A] text-white p-0.5 rounded-xs size-5 flex items-center justify-center shrink-0">
                                      <Linkedin className="size-3.5" fill="currentColor" stroke="none" />
                                    </div>
                                    <span className="text-xs font-medium text-slate-650 dark:text-slate-300">Premium</span>
                                  </>
                                )}
                                {profile.accountType === 'Standard' && (
                                  <>
                                    <div className="bg-[#0A66C2] text-white p-0.5 rounded-xs size-5 flex items-center justify-center shrink-0">
                                      <Linkedin className="size-3.5" fill="currentColor" stroke="none" />
                                    </div>
                                    <span className="text-xs font-medium text-slate-650 dark:text-slate-300">Standard</span>
                                  </>
                                )}
                                {profile.accountType === 'Google Workspace' && (
                                  <>
                                    <svg className="size-5 shrink-0" viewBox="0 0 24 24">
                                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.66-.35-1.36-.35-2.09z" />
                                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                    </svg>
                                    <span className="text-xs font-medium text-slate-650 dark:text-slate-300">Google Workspace</span>
                                  </>
                                )}
                                {profile.accountType === 'Microsoft 365' && (
                                  <>
                                    <svg className="size-4.5 shrink-0" viewBox="0 0 23 23">
                                      <rect x="0" y="0" width="10.5" height="10.5" fill="#F25022" />
                                      <rect x="11.5" y="0" width="10.5" height="10.5" fill="#7FBA00" />
                                      <rect x="0" y="11.5" width="10.5" height="10.5" fill="#00A1F1" />
                                      <rect x="11.5" y="11.5" width="10.5" height="10.5" fill="#FFB900" />
                                    </svg>
                                    <span className="text-xs font-medium text-slate-650 dark:text-slate-300">Microsoft 365</span>
                                  </>
                                )}
                                {profile.accountType === 'SMTP / Custom' && (
                                  <>
                                    <Mail className="size-4.5 text-indigo-500 shrink-0" />
                                    <span className="text-xs font-medium text-slate-650 dark:text-slate-300">SMTP / Custom</span>
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${profile.status === 'Connected'
                                ? 'bg-[#00C875] text-white'
                                : profile.status === 'Warning'
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-slate-400 text-white'
                                }`}>
                                {profile.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SETTINGS */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in min-h-[calc(100vh-366px)]">
            <div class="flex flex-col gap-5 border border-[#EBE9F1] p-5">
              {/* Campaign Name */}
              <div className="space-y-1.5">
                <label className="text-base font-medium text-[#444050] dark:text-slate-200 mb-2 block">Campaign name</label>
                <input
                  type="text"
                  value={campaignDetails.name}
                  onChange={(e) => setCampaignDetails({ ...campaignDetails, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-slate-150 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-xs"
                  placeholder="Campaign Name"
                />
              </div>

              <div className="flex flex-col gap-3">
                {/* Sending Window Header */}
                <div className="space-y-1">
                  <h3 className="text-base font-medium text-[#444050] dark:text-slate-100">Sending Window</h3>
                  <p className="text-xs text-[#444050] dark:text-slate-500 font-normal">Define when the campaign runs</p>
                </div>

                {/* Two-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* Left Column: Sending Window Configuration */}
                  <div className="border border-[#EBE9F1] dark:border-slate-800 rounded-lg sm:p-5 p-3 bg-white dark:bg-slate-900 space-y-4 flex flex-col justify-between min-h-[220px]">

                    {/* Dropdown */}
                    <div className="relative">
                      <select
                        value={sendingWindowName}
                        onChange={(e) => setSendingWindowName(e.target.value)}
                        className="w-full appearance-none px-4 py-2.5 bg-white dark:bg-slate-900 border border-[#D8D6DE] rounded-md text-sm text-[#444050] dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary pr-10 cursor-pointer"
                      >
                        <option value="USA Outreach Time">USA Outreach Time</option>
                        <option value="Europe Outreach Time">Europe Outreach Time</option>
                        <option value="Asia Outreach Time">Asia Outreach Time</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>

                    {/* Day selector & delete */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex gap-1.5 flex-wrap flex-1">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                          const isActive = selectedDays.includes(day);
                          return (
                            <button
                              key={day}
                              type="button"
                              onClick={() => toggleDay(day)}
                              className={`sm:w-15 w-[48%] py-2 text-[11px] font-medium rounded-md border transition-all cursor-pointer text-center ${isActive
                                ? 'bg-[#D0DCFF] dark:bg-primary/20 text-primary dark:text-blue-400 border-primary'
                                : 'bg-white dark:bg-slate-900 text-[#B9B9C3] dark:text-slate-500 border-[#D0D0D0] dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
                                }`}
                            >
                              {day.toUpperCase()}
                            </button>
                          );
                        })}
                        <button
                        type="button"
                        onClick={() => setSelectedDays([])}
                        className="sm:w-auto w-[48%] p-2 border border-[#D0D0D0] dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-800 rounded-md text-slate-400 dark:text-slate-500 hover:text-rose-500 transition-colors cursor-pointer shrink-0 flex justify-center"
                      >
                        <Trash2 className="size-4" />
                      </button>
                      </div>
                      
                    </div>

                    {/* Time range & timezone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Time Range */}
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                          <Clock className="size-4 text-primary" />
                        </span>
                        <input
                          type="text"
                          value={timeRange}
                          onChange={(e) => setTimeRange(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-[#D8D6DE] dark:border-slate-800 rounded-lg text-sm text-[#444050] dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          placeholder="11:30 AM - 04:00 PM"
                        />
                      </div>

                      {/* Timezone */}
                      <div className="relative">
                        <input
                          type="text"
                          value={timezoneName}
                          onChange={(e) => setTimezoneName(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-[#D8D6DE] dark:border-slate-800 rounded-lg text-sm text-[#444050] dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          placeholder="USA Timezone"
                        />
                      </div>
                    </div>

                    {/* Add New Window */}
                    <div>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 text-sm font-normal text-primary hover:text-[#254bce] transition-colors cursor-pointer"
                      >
                        <Plus className="size-3.5 stroke-[2.5]" />
                        Add New Window
                      </button>
                    </div>
                  </div>

                  {/* Right Column: AI Assist (Optional) */}
                  <div className="border border-[#EBE9F1] dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 flex flex-col min-h-[220px]">

                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-[#F0F0F0]">
                      <div className="flex flex-col gap-2">
                        <div class="flex flex-wrap items-center gap-3">
                          <div className="size-10 bg-linear-to-r from-grideant-2 from-30% to-grideant-1 via-100% text-white rounded-sm flex items-center justify-center shrink-0">
                            <Bot className="size-5" />
                          </div>
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-base font-semibold text-[#444050] dark:text-slate-100">AI Assist</h4>
                              <span className="text-sm text-[#6D6B77] dark:text-slate-500 font-normal uppercase tracking-wider">Optional</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-[#444050] dark:text-slate-500 leading-normal">Define when the campaign runs</p>
                      </div>
                      <button
                        type="button"
                        className="px-4 py-2 bg-primary hover:bg-[#254bce] text-white text-sm font-medium rounded-md transition-colors cursor-pointer"
                      >
                        Train AI
                      </button>
                    </div>

                    <div className="flex flex-col gap-4 p-5">
                      {/* Row 1: Auto message */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-wrap items-start gap-3">
                          <div className="text-primary mt-1">
                            <MessageCircleMore className="size-6" />
                          </div>
                          <div className="space-y-0.5">
                            <h5 className="text-base font-medium text-[#444050] dark:text-slate-200">Auto message after reply detected</h5>
                            <p className="text-xs text-[#444050] dark:text-slate-500 leading-normal">AI auto-replies to leads who message you back</p>
                          </div>
                        </div>

                        {/* Toggle */}
                        <label className="relative inline-flex items-center cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={aiAssistAutoMessage}
                            onChange={(e) => setAiAssistAutoMessage(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-6 bg-[#CACACA] dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-3 after:content-[''] after:absolute after:top-1 after:left-1.5 after:bg-white after:rounded-full after:size-4 after:transition-all peer-checked:bg-[#00C875] dark:peer-checked:bg-[#00C875]"></div>
                        </label>
                      </div>

                      {/* Row 2: Auto handle */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-wrap items-start gap-3">
                          <div className="mt-1">
                            <svg width="20" height="20" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.0625 3.9375H8.4375V1.08476C8.4375 0.79632 8.67135 0.5625 8.95972 0.5625C9.105 0.5625 9.24368 0.622965 9.34245 0.72939L13.8073 5.5377C13.9714 5.71433 14.0625 5.94645 14.0625 6.1875C14.0625 6.42855 13.9714 6.66067 13.8073 6.8373L9.34245 11.6456C9.24368 11.7521 9.105 11.8125 8.95972 11.8125C8.67135 11.8125 8.4375 11.5786 8.4375 11.2903V8.4375C4.27166 8.4375 2.02266 11.4497 1.45649 12.326C1.36303 12.4707 1.20535 12.5625 1.03313 12.5625C0.773205 12.5625 0.5625 12.3518 0.5625 12.0919V11.4375C0.5625 7.2954 3.92036 3.9375 8.0625 3.9375Z" stroke="#3666EE" stroke-width="1.125" stroke-linejoin="round" />
                            </svg>
                          </div>
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h5 className="text-base font-medium text-[#444050] dark:text-slate-200">Auto handle leads after</h5>
                              <input
                                type="text"
                                value={aiAssistFollowUps}
                                onChange={(e) => setAiAssistFollowUps(e.target.value)}
                                className="w-8 h-6 text-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-md text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                              />
                              <h5 className="text-base font-medium text-[#444050] dark:text-slate-200">Follow-ups</h5>
                            </div>
                            <p className="text-xs text-[#444050] dark:text-slate-500 leading-normal">AI takes over after two follow-ups.</p>
                          </div>
                        </div>

                        {/* Toggle */}
                        <label className="relative inline-flex items-center cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={aiAssistAutoHandle}
                            onChange={(e) => setAiAssistAutoHandle(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-6 bg-[#CACACA] dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-3 after:content-[''] after:absolute after:top-1 after:left-1.5 after:bg-white after:rounded-full after:size-4 after:transition-all peer-checked:bg-[#00C875] dark:peer-checked:bg-[#00C875]"></div>
                        </label>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
            {/* Zapier Integration Box */}
            <div className="border border-[#EBE9F1] dark:border-slate-800 overflow-hidden">
              {/* Header */}
              <div className="bg-[#EDF2FE] dark:bg-blue-950/20 px-5 py-4 flex items-center gap-2">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={triggerZapier}
                    onChange={(e) => setTriggerZapier(e.target.checked)}
                    className="rounded border-slate-350 dark:border-slate-700 text-primary focus:ring-primary/30 size-4.5 cursor-pointer accent-primary"
                  />
                  <span className="text-base font-medium text-[#5E5873] dark:text-slate-200">
                    Select events to trigger zapier
                  </span>
                </label>
                <Info className="size-4 text-[#5E5873] dark:text-slate-500" />
              </div>

              {/* Body */}
              <div className="bg-white dark:bg-slate-900 p-5">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  {/* Event 1 */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={zapierEvents.responseReceived}
                      onChange={(e) => setZapierEvents({ ...zapierEvents, responseReceived: e.target.checked })}
                      className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/30 size-4.5 cursor-pointer accent-primary"
                    />
                    <span className="text-base font-medium text-[#5E5873] dark:text-slate-300">
                      Response received
                    </span>
                  </label>

                  {/* Event 2 */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={zapierEvents.inviteSent}
                      onChange={(e) => setZapierEvents({ ...zapierEvents, inviteSent: e.target.checked })}
                      className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/30 size-4.5 cursor-pointer accent-primary"
                    />
                    <span className="text-base font-medium text-[#5E5873] dark:text-slate-300">
                      Invite sent
                    </span>
                  </label>

                  {/* Event 3 */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={zapierEvents.invitationAccepted}
                      onChange={(e) => setZapierEvents({ ...zapierEvents, invitationAccepted: e.target.checked })}
                      className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/30 size-4.5 cursor-pointer accent-primary"
                    />
                    <span className="text-base font-medium text-[#5E5873] dark:text-slate-300">
                      Invitation accepted
                    </span>
                  </label>

                  {/* Event 4 */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={zapierEvents.invitationWithdrawn}
                      onChange={(e) => setZapierEvents({ ...zapierEvents, invitationWithdrawn: e.target.checked })}
                      className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/30 size-4.5 cursor-pointer accent-primary"
                    />
                    <span className="text-base font-medium text-[#5E5873] dark:text-slate-300">
                      Invitation withdrawn
                    </span>
                  </label>

                  {/* Event 5 */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={zapierEvents.followupSent}
                      onChange={(e) => setZapierEvents({ ...zapierEvents, followupSent: e.target.checked })}
                      className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/30 size-4.5 cursor-pointer accent-primary"
                    />
                    <span className="text-base font-medium text-[#5E5873] dark:text-slate-300">
                      Followup Sent
                    </span>
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-white dark:bg-slate-800/40 px-5 py-3.5 border-t border-[#EDF2FE] dark:border-slate-800 flex flex-wrap items-center gap-3">
                <span className="text-xs font-medium text-[#5E5873] uppercase tracking-wider">Works With</span>

                {/* Zapier badge */}
                <div className="flex items-center gap-4 px-3 py-1 bg-white dark:bg-slate-800 border border-[#E7EDF6] dark:border-slate-700/60 rounded-xs">
                  <img src={zapier} alt="Zapier" width={38} height={18} />
                  <span className="text-[#E7EDF6] dark:text-slate-700">|</span>
                  <img src={n8n} alt="n8n" width={46} height={23} />
                  <span className="text-[#E7EDF6] dark:text-slate-700">|</span>
                  <img src={webhooks} alt="webhooks" width={55} height={15} />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* STEP 4: STATS / REVIEW & LAUNCH */}
        {currentStep === 4 && (
          isLaunched ? (
            /* Dashboard view (second image) */
            <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100">
              {/* Filters Toolbar */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Dropdown */}
                <div className="relative w-full sm:w-64">
                  <select className="appearance-none bg-white dark:bg-slate-900 pl-4 pr-10 py-2.5 border border-[#D8D6DE] dark:border-slate-800 rounded-md text-sm font-medium text-[#474055] dark:text-slate-200 focus:outline-hidden cursor-pointer shadow-xs select-none w-full">
                    <option value="all">All</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-[#D8D6DE] dark:border-slate-800 rounded-md text-sm font-medium text-[#474055] dark:text-slate-150 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Main Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Tech Founder details, Overview, Sub-grids */}
                <div className="lg:col-span-2 space-y-6">

                  {/* Card 1: Tech Founder Details & Progress */}
                  <div className="bg-white dark:bg-slate-900 border border-[#E7EDF6] dark:border-slate-800 rounded-lg p-6 space-y-6 shadow-xs">
                    {/* Header row */}
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div className="flex flex-col items-center gap-3">
                        <h3 className="flex items-center gap-3 font-semibold text-[#444050] dark:text-slate-150">
                          <Megaphone className="size-5 text-primary" />
                          Tech Founder</h3>
                        <div className="flex gap-1.5">
                          <span className="bg-[#EDF2FC] dark:bg-primary/10 text-[#5269AB] dark:text-blue-450 px-2.5 py-1 rounded-sm text-xs font-bold">LinkedIn</span>
                          <span className="bg-[#EDF2FC] dark:bg-primary/10 text-[#5269AB] dark:text-blue-450 px-2.5 py-1 rounded-sm text-xs font-bold">Email</span>
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold bg-[#E5F8EE] text-[#549A75] dark:bg-emerald-950/30 dark:text-emerald-450">
                          <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.66932 7.49693L5.918 0.759761C6.32847 0.232856 7.0979 0.560808 7.0979 1.26268V6.47733C7.0979 6.89775 7.39962 7.23863 7.77185 7.23863H10.3247C10.9047 7.23863 11.2138 8.01105 10.8307 8.50283L5.582 15.24C5.17153 15.7669 4.4021 15.439 4.4021 14.7371V9.52245C4.4021 9.102 4.10036 8.76113 3.72815 8.76113H1.17526C0.595333 8.76113 0.286205 7.9887 0.66932 7.49693Z" stroke="#549A75" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          Running
                        </span>
                        <button className="text-[#334155] transition-colors cursor-pointer">
                          <Pause className="size-4 text-[#5E5873] dark:text-slate-350" />
                        </button>
                        <button className="text-[#334155] transition-colors cursor-pointer">
                          <SquarePen className="size-4 text-[#5E5873] dark:text-slate-350" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar Section */}
                    <div className="bg-[#F8F7FA] p-5 rounded-md">
                      {/* Progress Bar */}
                      <div className="w-full h-3 bg-white rounded-full overflow-hidden mb-3">
                        <div className="h-full w-[35%] rounded-full bg-[repeating-linear-gradient(45deg,#3b82f6_0px,#3b82f6_10px,#60a5fa_10px,#60a5fa_20px)]"></div>
                      </div>
                  {/* Info Row */}
                      <div className="flex flex-wrap justify-between items-center text-xs text-[#444050] dark:text-slate-400 font-semibold">
                        <div className="flex flex-wrap items-center gap-3">
                          <span><span className='font-bold'>Created:</span> 8 Jan, 2026</span>
                          <span className="text-slate-300">|</span>
                          <span className="inline-flex items-center gap-2 text-[#549A75] bg-[#E5F8EE] dark:bg-emerald-950/20 px-2 py-0.5 rounded-xs text-[10px]">
                            <img src={crm} /> CRM Connected
                          </span>
                        </div>
                        <div className="font-bold text-[#64748B]">74 / 200 prospects processed</div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Campaign Overview (5 metric columns) */}
                  <div className="p-5 pb-0 bg-white dark:bg-slate-900 border border-[#EBE9F1] dark:border-slate-800 rounded-md shadow-xs overflow-hidden">
                    <div className="pb-5 flex justify-between items-center">
                      <h3 className="text-base font-semibold text-[#444050] dark:text-slate-150">Campaign Overview</h3>
                      <div className="flex bg-white dark:bg-slate-805 rounded-md border border-[#E2DFDF] dark:border-slate-800 text-xs">
                        <button className="px-3 py-1 bg-[#F6F6F6] dark:bg-slate-900 font-semibold border-r border-[#E2DFDF] rounded-l-sm text-[#82868B] dark:text-slate-350">LinkedIn</button>
                        <button className="px-3 py-1 font-semibold text-[#82868B] dark:text-slate-450">Email</button>
                      </div>
                    </div>

                    {/* Grid of metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#DBDBDB] dark:divide-slate-800">
                      {/* Stat 1: New Leads */}
                      <div className="flex flex-col justify-between min-h-[160px] bg-white dark:bg-slate-900 pe-5 border-l border-[#DBDBDB] dark:border-slate-800">
                        <div className="p-3 space-y-1">
                          <div className="text-xs font-bold text-[#5E5873] dark:text-slate-400 uppercase tracking-wider">New Leads</div>
                          <div className="text-lg font-semibold text-[#444050] dark:text-slate-100">1,628</div>
                        </div>
                        <div className="h-30 bg-[#6B62E3] w-full rounded-tr-lg"></div>
                      </div>

                      {/* Stat 2: Invites Sent */}
                      <div className="flex flex-col justify-between min-h-[160px] bg-white pe-5 dark:bg-slate-900">
                        <div className="p-3 space-y-1">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-[#5E5873] dark:text-slate-400 uppercase tracking-wider text-sm">Invites Sent</span>
                            <Info className="size-3.5 text-slate-400 cursor-pointer" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-[#444050] dark:text-slate-100">988</span>
                            <span className="bg-[#E5F8EE] text-[#549A75] dark:bg-emerald-950/20 dark:text-emerald-450 text-xs font-bold px-1.5 py-0.5 rounded-sm">61%</span>
                          </div>
                        </div>
                        <div className="h-22 bg-[#9EB7CF] w-full rounded-tr-lg"></div>
                      </div>

                      {/* Stat 3: Invites Accepted */}
                      <div className="flex flex-col justify-between min-h-[160px] bg-white pe-5 dark:bg-slate-900">
                        <div className="p-3 space-y-1">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-[#5E5873] dark:text-slate-400 uppercase tracking-wider text-xs">Invites Accepted</span>
                            <Info className="size-3.5 text-slate-400 cursor-pointer" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-[#444050] dark:text-slate-100">507</span>
                            <span className="bg-[#FFF3DF] text-[#F4A226] dark:bg-amber-950/20 dark:text-amber-450 text-xs font-bold px-1.5 py-0.5 rounded-sm">49%</span>
                          </div>
                        </div>
                        <div className="h-16 bg-[#D5EFE7] w-full rounded-tr-lg"></div>
                      </div>

                      {/* Stat 4: Messages Sent */}
                      <div className="flex flex-col justify-between min-h-[160px] bg-white pe-5 dark:bg-slate-900">
                        <div className="p-3 space-y-1">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-[#5E5873] dark:text-slate-400 uppercase tracking-wider text-xs">Messages Sent</span>
                            <Info className="size-3.5 text-slate-400 cursor-pointer" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-[#444050] dark:text-slate-100">460</span>
                            <span className="bg-[#E5F8EE] text-[#549A75] dark:bg-emerald-950/20 dark:text-emerald-450 text-xs font-bold px-1.5 py-0.5 rounded-sm">91%</span>
                          </div>
                        </div>
                        <div className="h-27 bg-[#E9F9D2] w-full rounded-tr-lg"></div>
                      </div>

                      {/* Stat 5: Replies */}
                      <div className="flex flex-col justify-between min-h-[160px] bg-white dark:bg-slate-900">
                        <div className="p-3 space-y-1">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-[#5E5873] dark:text-slate-400 uppercase tracking-wider text-xs">Replies</span>
                            <Info className="size-3.5 text-slate-400 cursor-pointer" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-[#444050] dark:text-slate-100">202</span>
                            <span className="bg-[#FFF3DF] text-[#F4A226] dark:bg-amber-950/20 dark:text-amber-450 text-xs font-bold px-1.5 py-0.5 rounded-sm">44%</span>
                          </div>
                        </div>
                        <div className="bg-[#DEF5D9] w-full rounded-tr-lg" style={{ height: '44%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Row with two sub-cards: Campaign Actions & Reply Performance */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 3: Campaign Actions */}
                    <div className="bg-white dark:bg-slate-900 border border-[#EBE9F1] dark:border-slate-800 rounded-md flex flex-col justify-between min-h-[300px] shadow-xs col-span-2">
                      <div className="space-y-4 p-5">
                        <div className="flex justify-between items-center pb-3">
                          <div>
                            <h3 className="text-base font-semibold text-[#444050] dark:text-slate-150">Campaign Actions</h3>
                            <p className="text-xs text-[#9692A4] dark:text-slate-450 font-bold">Execution stats & engagement signals</p>
                          </div>
                          <div class="flex bg-white dark:bg-slate-805 rounded-md border border-[#E2DFDF] dark:border-slate-800 text-xs">
                            <button class="px-3 py-1 bg-[#F6F6F6] dark:bg-slate-900 font-semibold border-r border-[#E2DFDF] rounded-l-sm text-[#82868B] dark:text-slate-350">LinkedIn</button>
                            <button class="px-3 py-1 font-semibold text-[#82868B] dark:text-slate-450">Email</button>
                          </div>
                        </div>

                        {/* Layout grid of list metrics */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs">
                          {/* Column 1 */}
                          <div className="space-y-3 text-base">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-[#444050] dark:text-slate-300">Remaining Leads:</span>
                              <span className="font-semibold text-[#444050] dark:text-slate-100">110</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-[#444050] dark:text-slate-300">Follow-up message:</span>
                              <span className="font-semibold text-[#444050] dark:text-slate-100">10</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-[#444050] dark:text-slate-300">InMails Sent:</span>
                              <span className="font-semibold text-[#444050] dark:text-slate-100">20</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-[#444050] dark:text-slate-300">Emails:</span>
                              <span className="font-semibold text-[#444050] dark:text-slate-100">89</span>
                            </div>
                          </div>
                          {/* Column 2 */}
                          <div className="space-y-3 text-base">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-[#444050] dark:text-slate-300">Profile Viewed:</span>
                              <span className="font-semibold text-[#444050] dark:text-slate-100">45</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-[#444050] dark:text-slate-300">Profile Followed:</span>
                              <span className="font-semibold text-[#444050] dark:text-slate-100">140</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-[#444050] dark:text-slate-300">Skills Endorsed:</span>
                              <span className="font-semibold text-[#444050] dark:text-slate-100">50</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-[#444050] dark:text-slate-300">Comments Added:</span>
                              <span className="font-semibold text-[#444050] dark:text-slate-100">54</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Team Avatars */}
                      <div className="bg-[#EAEFFF] dark:bg-slate-805 p-4 flex items-center gap-3">
                        <span className="text-base font-bold text-[#444050] dark:text-slate-100">Team:</span>
                        <div className="flex -space-x-2 overflow-hidden">
                          <img
                            className="inline-block size-6.5 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="Edgar Jones"
                          />
                          <img
                            className="inline-block size-6.5 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="Sarah Jenkins"
                          />
                          <img
                            className="inline-block size-6.5 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="Michael Brown"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card 4: Reply Performance */}
                    <div className="bg-white dark:bg-slate-900 border border-[#EBE9F1] dark:border-slate-800 rounded-md p-5 flex flex-col justify-between min-h-[300px] shadow-xs">
                      <div className="space-y-4">
                        <div >
                          <h3 className="text-base font-semibold text-[#444050] dark:text-slate-150">Reply Performance</h3>
                          <p className="text-xs text-[#9692A4] dark:text-slate-450 font-bold">Top reply channel</p>
                        </div>

                        {/* Progress bars list */}
                        <div className="space-y-3.5">
                          {/* Channel 1: Follow-up */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-350">
                              <span>Follow-up</span>
                              <span className="text-[#6789F8] font-bold">80%</span>
                            </div>
                            <div className="w-full bg-[#EAEFFF] dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                              <div className="bg-[#6789F8] h-full rounded-full" style={{ width: '80%' }}></div>
                            </div>
                          </div>

                          {/* Channel 2: InMail */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-350">
                              <span>InMail</span>
                              <span className="text-[#00C875] font-bold">32%</span>
                            </div>
                            <div className="w-full bg-[#EAEFFF] dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                              <div className="bg-[#00C875] h-full rounded-full" style={{ width: '32%' }}></div>
                            </div>
                          </div>

                          {/* Channel 3: Email */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-350">
                              <span>Email</span>
                              <span className="text-rose-500 font-bold">11%</span>
                            </div>
                            <div className="w-full bg-[#EAEFFF] dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                              <div className="bg-rose-500 h-full rounded-full" style={{ width: '11%' }}></div>
                            </div>
                          </div>

                          {/* Channel 4: Connection Message */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-350">
                              <span>Connection Message</span>
                              <span className="text-[#6789F8] font-bold">79%</span>
                            </div>
                            <div className="w-full bg-[#EAEFFF] dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                              <div className="bg-[#6789F8] h-full rounded-full" style={{ width: '79%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Reply Analysis & Recent Activity */}
                <div className="space-y-6">

                  {/* Card 5: Reply Analysis */}
                  <div className="bg-white dark:bg-slate-900 border border-[#EBE9F1] dark:border-slate-800 rounded-md p-5">
                    <h3 className="text-base font-semibold text-[#444050] dark:text-slate-150 mb-4">Reply Analysis</h3>

                    {/* Gauge Visualization */}
                    <div className="flex flex-col items-center justify-center py-2">
                      <SemiCircularProgress value={80} />

                      {/* Results Table list */}
                      <div className="w-full mt-5 border-t border-[#EBE9F1] dark:border-slate-800 pt-5 text-sm font-semibold">
                        <div className="flex justify-between items-center text-[#444050] dark:text-slate-400 mb-2">
                          <span>Status</span>
                          <span>Results</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="inline-flex items-center gap-1.5 text-[#5E5873] dark:text-slate-300">
                              <span className="size-2 rounded-full bg-[#7255DE]"></span> Positive
                            </span>
                            <span className="font-bold text-[#5E5873] dark:text-slate-150">12%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="inline-flex items-center gap-1.5 text-[#5E5873] dark:text-slate-300">
                              <span className="size-2 rounded-full bg-[#F4A226]"></span> Neutral
                            </span>
                            <span className="font-bold text-[#5E5873] dark:text-slate-150">14%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="inline-flex items-center gap-1.5 text-[#5E5873] dark:text-slate-300">
                              <span className="size-2 rounded-full bg-[#EA5455]"></span> Negative
                            </span>
                            <span className="font-bold text-[#5E5873] dark:text-slate-150">8%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 6: Recent Campaign Activity */}
                  <div className="bg-white dark:bg-slate-900 border border-[#EBE9F1] dark:border-slate-800 rounded-md p-5 flex flex-col justify-between min-h-[420px]">
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-[#444050] dark:text-slate-150 mb-4">Recent Campaign Activity</h3>

                      {/* Activity List Timeline */}
                      <div className="relative pl-10 space-y-6">
                        {/* Timeline Line */}
                        <div className="absolute left-[11px] top-2.5 bottom-2.5 w-0.5 bg-[#BDBDBD] dark:bg-slate-800"></div>

                        {/* Item 1: Campaign Started */}
                        <div className="relative">
                          <span className="absolute -left-10 top-0.5 size-6.5 rounded-full bg-primary text-white flex items-center justify-center">
                            <Rocket className="size-3" />
                          </span>
                          <div className="flex flex-col text-sm">
                            <span className="text-[#5E5873] font-bold text-xs">09:14 AM</span>
                            <span className="font-semibold text-[#444050] dark:text-slate-200 mt-0.5">Campaign started</span>
                            <span className="text-[#5E5873] dark:text-slate-400 font-bold text-xs">by <a href="#" onClick={(e) => e.preventDefault()} className="hover:no-underline underline font-semibold">Aman S.</a></span>
                          </div>
                        </div>

                        {/* Item 2: Reply Received */}
                        <div className="relative">
                          <span className="absolute -left-10 top-0.5 size-6.5 rounded-full bg-indigo-550 bg-indigo-500 text-white flex items-center justify-center">
                            <MessageSquare className="size-3" />
                          </span>
                          <div className="flex flex-col text-sm">
                            <span className="text-[#5E5873] font-bold text-xs">10:30 AM</span>
                            <span className="font-semibold text-[#444050] dark:text-slate-200 mt-0.5">Reply received</span>
                            <span className="text-[#5E5873] dark:text-slate-400 font-bold text-xs">from <a href="#" onClick={(e) => e.preventDefault()} className="hover:no-underline underline font-semibold">Suresh K.</a></span>
                          </div>
                        </div>

                        {/* Item 3: Follow-up message sent */}
                        <div className="relative">
                          <span className="absolute -left-10 top-0.5 size-6.5 rounded-full bg-rose-500 text-white flex items-center justify-center">
                            <Send className="size-3" />
                          </span>
                          <div className="flex flex-col text-sm">
                            <span className="text-[#5E5873] font-bold text-xs">10:35 AM</span>
                            <span className="font-semibold text-[#444050] dark:text-slate-200 mt-0.5">Follow-up message sent</span>
                            <span className="text-[#5E5873] dark:text-slate-400 font-bold text-xs">by <span className='font-semibold'>System</span></span>
                          </div>
                        </div>

                        {/* Item 4: Connection Accepted */}
                        <div className="relative">
                          <span className="absolute -left-7 top-0.5 size-6.5">
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.5 0V4.20654C0.5 13.0431 7.66344 20.2065 16.5 20.2065H19.0117" stroke="#BDBDBD"/>
                            </svg>
                          </span>
                          <div className="flex flex-col text-sm">
                            <span className="text-[#5E5873] font-bold text-xs">10:35 AM</span>
                            <span className="font-semibold text-[#444050] dark:text-slate-200 mt-0.5">Connection accepted</span>
                            <span className="text-[#5E5873] dark:text-slate-400 font-bold text-xs">by <a href="#" onClick={(e) => e.preventDefault()} className="hover:no-underline underline font-semibold">Suresh K.</a> (Prospect)</span>
                          </div>
                        </div>

                        {/* Item 5: Campaign Paused */}
                        <div className="relative">
                          <span className="absolute -left-10 top-0.5 size-6.5 rounded-full bg-amber-505 bg-amber-550 bg-amber-500 text-white flex items-center justify-center">
                            <Pause className="size-3" />
                          </span>
                          <div className="flex flex-col text-sm">
                            <span className="text-[#5E5873] font-bold text-xs">10:45 AM</span>
                            <span className="font-semibold text-[#444050] dark:text-slate-200 mt-0.5">Campaign paused</span>
                            <span className="text-[#5E5873] dark:text-slate-400 font-bold text-xs">by <a href="#" onClick={(e) => e.preventDefault()} className="hover:no-underline underline font-semibold">Aman S.</a></span>
                          </div>
                        </div>

                        <div className="relative">
                          <span className="absolute -top-3 -left-7 size-6.5">
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.5 0V4.20654C0.5 13.0431 7.66344 20.2065 16.5 20.2065H19.0117" stroke="#BDBDBD"/>
                            </svg>
                          </span>
                          <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-brand-blue-hover transition-colors">
                            <ExternalLink className="size-3.5" />
                            Open Activity Log
                          </a>
                        </div>

                      </div>
                    </div>

                    
                  </div>

                </div>

              </div>
            </div>
          ) : (
            /* No Stats Yet view (first image) */
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center select-none animate-fade-in bg-white dark:bg-slate-900">
              {/* Graphic container */}
              <div className="relative w-64 h-48 mb-6 flex items-center justify-center">
                <img src={stats} alt="stats" />
              </div>

              <h3 className="text-[#5E5873] dark:text-slate-200 text-xl font-medium mb-1">No Stats Yet</h3>
              <p className="text-[#5E5873] dark:text-slate-400 text-sm mb-6 leading-relaxed">
                Once Campaign is launched, Statistics will be shown here.
              </p>

              <button
                type="button"
                onClick={handleLaunchCampaign}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-[#254bce] text-white text-sm font-normal rounded-md shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all cursor-pointer"
              >
                <Rocket className="size-4" />
                <span>Launch Campaign</span>
              </button>
            </div>
          )
        )}

        {/* footer action buttons */}
        {currentStep !== 4 && (
          <>
            {!isLaunched && (
              <div className={`flex flex-wrap items-center gap-4 mt-10 ${currentStep === 3 ? 'justify-between' : 'justify-end'}`}>
                {currentStep === 3 ?
                  <div className='text-sm text-slate-600 dark:text-slate-300'>
                    <p>If a lead answers your invite, message, or InMail, we<br />stop sending further steps automatically. <a className='text-primary' href="#">Learn more</a></p>
                  </div>
                  : null}
                <div className='flex flex-grow-1 items-center justify-end gap-4'>
                  {currentStep === 1 ? '' : <button
                    type="button"
                    onClick={handleBackStep}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-primary dark:text-slate-300 text-sm font-semibold transition-all cursor-pointer"
                  >
                    <CornerDownLeft className="size-4" />
                    <span>Previous</span>
                  </button>}

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-sm bg-linear-to-r from-grideant-2 from-30% to-grideant-1 via-100% hover:from-grideant-2 hover:to-grideant-2 text-white text-sm font-semibold shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <span>{currentStep === 4 ? 'Launch Campaign' : 'Next'}</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
