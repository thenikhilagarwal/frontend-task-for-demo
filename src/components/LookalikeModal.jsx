import { useState } from 'react';
import { X, Users, List, Check } from 'lucide-react';

export default function LookalikeModal({ isOpen, onClose, lists, onCreateList, selectedListId, onSelectConfirm }) {
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [localSelectedId, setLocalSelectedId] = useState(selectedListId);

  if (!isOpen) return null;

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    // Create new list object
    const newList = {
      id: 'list-' + Date.now(),
      name: newListName.trim(),
      leadsCount: Math.floor(Math.random() * 200) + 50 // Mocked leads count
    };

    onCreateList(newList);
    setLocalSelectedId(newList.id);
    setNewListName('');
    setIsCreating(false);
  };

  const handleConfirm = () => {
    onSelectConfirm(localSelectedId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-md w-full max-w-2xl shadow-2xl relative z-10 overflow-hidden transform scale-100 transition-all duration-300 max-h-[95vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 bg-[#F8F8F8] dark:bg-slate-900">
          <div>
            <h3 className="text-lg font-medium text-[#5E5873] dark:text-slate-100 tracking-tight">
              Lookalikes
            </h3>
            <p className="text-sm text-[#5E5873] dark:text-slate-450 font-normal">
              Select a lookalike list for this campaign
            </p>
          </div>
          <button
            onClick={onClose}
            className="transition-all cursor-pointer"
            aria-label="Close modal"
          >
            {/* Custom Circular Close Icon matching the mockup design exactly */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Content Body */}

        {isCreating ? (
          /* Creation Form */
          <form onSubmit={handleCreateSubmit}>
            <div class="flex-1 flex flex-col p-8 justify-center min-h-47">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-355 mb-2">
                List Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. US Tech Founders"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-slate-150 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100 dark:border-slate-800 mt-6">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-5 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-300 text-sm font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-sm bg-linear-to-r from-grideant-2 from-30% to-grideant-1 via-100% hover:from-grideant-2 hover:to-grideant-2 text-white text-sm font-medium transition-all cursor-pointer"
              >
                Create & Select
              </button>
            </div>
          </form>
        ) : lists.length === 0 ? (
          /* Empty State matching Design Mockup */
          <div className="flex-1 flex flex-col md:p-8 p-4 justify-center min-h-[300px]">
            <div className="flex flex-col items-center justify-center text-center py-6 select-none animate-fade-in">
              <h4 className="text-2xl font-bold text-[#5E5873] dark:text-slate-200">
                You don't have any leads
              </h4>
              <p className="text-[#5E5873] dark:text-slate-400 text-sm mt-2 font-normal leading-relaxed">
                Create a lead list to start running campaigns
              </p>

              <button
                type="button"
                onClick={() => setIsCreating(true)}
                className="mt-7 px-7 py-3 bg-linear-to-r from-grideant-2 from-30% to-grideant-1 via-100% hover:from-grideant-2 hover:to-grideant-2 text-white text-sm font-medium rounded-sm cursor-pointer"
              >
                Create a List
              </button>
            </div>
          </div>
        ) : (
          /* List Selection View */
          <div className="flex-1 flex flex-col justify-center min-h-[300px]">
            <div className="flex-1 flex flex-col justify-between">
              <div class="p-8">
                <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1">
                  <div className="space-y-2.5">
                    {lists.map((list) => {
                      const isSelected = localSelectedId === list.id;
                      return (
                        <div
                          key={list.id}
                          onClick={() => setLocalSelectedId(list.id)}
                          className={`flex items-center justify-between p-4 rounded-md border cursor-pointer transition-all duration-200 ${isSelected
                            ? 'bg-[#F8FAFF] dark:bg-blue-950/20 border-[#D0DCFF] shadow-xs'
                            : 'bg-[#F8FAFF] dark:bg-slate-900 border-[#D0DCFF] dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-750'
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <div>
                              <List className="size-5" />
                            </div>
                            <div className='flex flex-wrap items-center gap-2'>
                              <span className="font-semibold text-sm text-[#444050] dark:text-slate-200">
                                {list.name}
                              </span>
                              <span className="text-xs text-[#444050] dark:text-slate-500 font-normal">
                                ({list.leadsCount} Users in the List)
                              </span>
                            </div>
                          </div>

                          {/* Radio Selector */}
                          <div className={`size-5 rounded-xs border-2 flex items-center justify-center transition-all ${isSelected ? 'border-primary bg-primary text-white' : 'border-[#F8FAFF] dark:border-slate-700 bg-transparent'
                            }`}>
                            {isSelected && <Check className="size-3 stroke-3" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-1 text-sm font-medium text-primary transition-colors cursor-pointer"
                  >
                    Add New
                  </button>
                </div>
              </div>

              {/* Selection Confirmation Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100 dark:border-slate-800 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-md bg-[#E8E8E8] hover:bg-slate-200 text-[#9692A4] dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-355 text-sm font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={!localSelectedId}
                  className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all cursor-pointer shadow-md shadow-blue-500/10 ${localSelectedId
                    ? 'bg-linear-to-r from-grideant-2 from-30% to-grideant-1 via-100% hover:from-grideant-2 hover:to-grideant-2 text-white hover:shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed shadow-none'
                    }`}
                >
                  Select List
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
