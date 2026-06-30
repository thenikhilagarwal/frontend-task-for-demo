import { useState } from 'react';
import { BarChart2, LayoutList, Pause, Copy, MoreVertical, Download, X } from 'lucide-react';
import FilterDropdown from './FilterDropdown';
import crmImage from '../assets/crm.png';


// --- Static mock data matching the screenshot ---
const MOCK_CAMPAIGNS = [
  { id: 1, name: 'Tech Founder', channels: ['LinkedIn'], createdOn: '21 Jan, 2026', crm: 'Synced', crmTime: '2h ago', invitesSent: 265, invitesAccepted: '15% Accepted', replyRate: 125, replyReceived: '10% Received', emailSent: 400, mailOpened: '10% Mail Opened', senderAvatars: ['https://i.pravatar.cc/32?img=1', 'https://i.pravatar.cc/32?img=2'], status: 'Running', dailyLimit: '40 invites/day' },
  { id: 2, name: 'Growth Ca...', channels: ['LinkedIn', 'Email'], createdOn: '21 Jan, 2026', crm: 'Sync to CRM', crmTime: null, invitesSent: 265, invitesAccepted: '15% Accepted', replyRate: 125, replyReceived: '10% Received', emailSent: 400, mailOpened: '10% Mail Opened', senderAvatars: ['https://i.pravatar.cc/32?img=3', 'https://i.pravatar.cc/32?img=4'], status: 'Running', dailyLimit: '40 invites/day' },
  { id: 3, name: 'Campaign P...', channels: ['LinkedIn', 'Email'], createdOn: '21 Jan, 2026', crm: 'Sync to CRM', crmTime: null, invitesSent: 265, invitesAccepted: '15% Accepted', replyRate: 125, replyReceived: '10% Received', emailSent: 400, mailOpened: '10% Mail Opened', senderAvatars: ['https://i.pravatar.cc/32?img=5', 'https://i.pravatar.cc/32?img=6'], status: 'Running', dailyLimit: '40 invites/day' },
  { id: 4, name: 'Lead Engine', channels: ['LinkedIn', 'Email'], createdOn: '21 Jan, 2026', crm: 'Synced', crmTime: '1d ago', invitesSent: 265, invitesAccepted: '15% Accepted', replyRate: 125, replyReceived: '10% Received', emailSent: 400, mailOpened: '10% Mail Opened', senderAvatars: ['https://i.pravatar.cc/32?img=7', 'https://i.pravatar.cc/32?img=8'], status: 'Running', dailyLimit: '40 invites/day' }
];

function ChannelBadge({ label }) {
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#EDF2FC] text-[#5269AB]`}>
      {label}
    </span>
  );
}

function CrmCell({ crm, crmTime }) {
  const isSynced = crm === 'Synced';
  return (
    <div className="flex flex-col gap-0.5">
      <div className='flex'>
        {isSynced ? <span className="flex items-center gap-1.5 text-[#5E5873] font-semibold"><img src={crmImage} alt={crm} className='size-4'/> {crm}</span> : <span className='text-slate-700 border border-[#E7EDF6] rounded-sm py-1 px-1.5 whitespace-nowrap'>Sync to CRM</span>}
        <span className={`text-sm font-semibold ${isSynced ? 'text-slate-800' : 'text-slate-600'}`}></span>
      </div>
      {isSynced && <div className='text-[#6D6B77] text-xs font-normal'>{crmTime}</div>}
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === 'Running') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#E5F8EE] text-[#549A75] text-xs font-medium">
        <Pause className="w-3.5 h-3.5" /> Running
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-500 text-xs font-semibold">
      {status}
    </span>
  );
}

function RowMenu({ onClose }) {
  const menuItems = [
    { icon: <BarChart2 className="w-4 h-4 text-slate-500" />, label: 'View Analytics' },
    { icon: <LayoutList className="w-4 h-4 text-slate-500" />, label: 'Edit Sequence' },
    { icon: <Copy className="w-4 h-4 text-slate-500" />, label: 'Duplicate' },
  ];
  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 w-48 bg-white rounded-xl border border-slate-100 py-1" style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.10)' }}>
      {menuItems.map((item) => (
        <button key={item.label} onClick={onClose} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left cursor-pointer">
          {item.icon}{item.label}
        </button>
      ))}
    </div>
  );
}

export default function CampaignTable({ onCreateCampaign }) {
   const [selectedRows, setSelectedRows] = useState([]);
   const [openMenuId, setOpenMenuId] = useState(null);
   const [channelFilter, setChannelFilter] = useState(null);
   const [statusFilter, setStatusFilter] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
 
   const campaigns = MOCK_CAMPAIGNS;
 
   const filtered = campaigns.filter(c => {
     const matchChannel = !channelFilter || c.channels.includes(channelFilter);
     const matchStatus = !statusFilter || c.status === statusFilter;
     return matchChannel && matchStatus;
   });
 
   const allSelected = filtered.length > 0 && selectedRows.length === filtered.length;
   const toggleAll = () => setSelectedRows(allSelected ? [] : filtered.map(c => c.id));
   const toggleRow = (id) => setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
   const clearFilters = () => { setChannelFilter(null); setStatusFilter(null); };
   const hasFilters = channelFilter || statusFilter;
 

  return (
    <div className="">
      {/* ── Top Header Bar ── */}
      <div className="flex flex-wrap gap-3 items-start justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-[#444050] dark:text-slate-400 leading-tight">All Campaigns List</h2>
          <p className="text-xs text-slate-700 dark:text-slate-500 mt-0.5">A quick look at all of your outreach initiatives.</p>
        </div>
        <button onClick={onCreateCampaign} className="flex items-center px-5 py-2.5 bg-linear-to-r from-grideant-2 from-30% to-grideant-1 via-100% hover:from-grideant-2 hover:to-grideant-2 text-white text-sm font-medium rounded-md transition-colors cursor-pointer">
          New Campaign
        </button>
      </div>

      <div className="flex flex-col gap-0">

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FilterDropdown label="Channel" options={['LinkedIn', 'Email', 'SMS']} value={channelFilter} onChange={setChannelFilter} />
          <FilterDropdown label="Status" options={['Running', 'Paused', 'Draft', 'Completed']} value={statusFilter} onChange={setStatusFilter} />
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition-colors cursor-pointer">
              Clear All
            </button>
          )}
        </div>
        <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors cursor-pointer font-medium">
          <Download className="w-4 h-4" />Export List
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-[#F3F2F7] dark:bg-slate-800/40">
                <th className="py-3.5 pl-5 pr-2 w-10">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">All Campaigns</th>
                <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">CRM</th>
                <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Invites Sent</th>
                <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Reply Rate</th>
                <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Email Sent</th>
                <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Sender</th>
                <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Status</th>
                <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Daily Limit</th>
                <th className="py-3.5 px-3 w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((campaign) => {
                const isSelected = selectedRows.includes(campaign.id);
                const menuOpen = openMenuId === campaign.id;
                return (
                  <tr key={campaign.id} className={`group relative hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${isSelected ? 'bg-blue-50/40' : ''}`}>
                    <td className="py-4 pl-5 pr-2">
                      <input type="checkbox" checked={isSelected} onChange={() => toggleRow(campaign.id)} className="w-4 h-4 rounded border-[#D8D6DE] accent-primary cursor-pointer" />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-[#5E5873] dark:text-slate-100 text-sm">{campaign.name}</span>
                          {campaign.channels.map(ch => <ChannelBadge key={ch} label={ch} />)}
                        </div>
                        <span className="text-xs text-[#6D6B77]">Created On: {campaign.createdOn}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4"><CrmCell crm={campaign.crm} crmTime={campaign.crmTime} /></td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-[#5E5873] dark:text-slate-100">{campaign.invitesSent}</span>
                        <span className="text-xs text-[#6D6B77]">{campaign.invitesAccepted}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-[#5E5873]">{campaign.replyRate}</span>
                        <span className="text-xs text-[#6D6B77]">{campaign.replyReceived}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-[#5E5873]">{campaign.emailSent}</span>
                        <span className="text-xs text-[#6D6B77]">{campaign.mailOpened}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex -space-x-2">
                        {campaign.senderAvatars.map((src, i) => (
                          <img key={i} src={src} alt="sender" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4"><StatusBadge status={campaign.status} /></td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1 border border-[#EEEEEE] rounded-sm text-xs font-normal text-[#444050] whitespace-nowrap">
                        {campaign.dailyLimit}
                      </span>
                    </td>
                    <td className="py-4 px-3 relative">
                      <button onClick={() => setOpenMenuId(menuOpen ? null : campaign.id)} className="p-1.5 text-[#444050] hover:text-slate-700 cursor-pointer">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {menuOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                          <RowMenu onClose={() => setOpenMenuId(null)} />
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}
