import notFound from '../assets/not-found.png'

export default function CampaignEmptyState({ onCreateCampaign }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center select-none">
      {/* Custom Vector SVG Illustration */}
      <div className="w-full max-w-md mb-8 relative animate-fade-in">
        <img src={notFound} alt="not-found" className='w-90 h-full' />
      </div>

      <button onClick={onCreateCampaign}
        className="flex items-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold text-sm rounded-md shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-98 transition-all cursor-pointer select-none"
      >
        New Campaign
      </button>
    </div>
  );
}
