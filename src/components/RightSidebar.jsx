import React from 'react';
import { Play, ExternalLink } from 'lucide-react';

const RightSidebar = () => {
    return (
        <div className="h-full flex flex-col px-5 py-6 overflow-y-auto custom-scrollbar">
            <h2 className="text-lg font-semibold text-white mb-5 tracking-wide">
                Searched By Command
            </h2>

            {/* Title Section */}
            <div className="mb-4">
                <div className="text-xs font-semibold tracking-wider mb-1" style={{ color: 'var(--accent-cyan)' }}>
                    Title
                </div>
                <div className="text-sm text-gray-300">Hover Board</div>
            </div>

            {/* Category */}
            <div className="mb-4">
                <div className="text-xs font-semibold tracking-wider mb-1" style={{ color: 'var(--accent-cyan)' }}>
                    Category
                </div>
                <div className="text-sm text-gray-300">Personal Transporter</div>
            </div>

            {/* Search Results */}
            <div className="mb-5">
                <div className="flex items-center justify-between mb-1">
                    <div className="text-xs font-semibold tracking-wider" style={{ color: 'var(--accent-cyan)' }}>
                        Search Results
                    </div>
                    <div className="text-sm font-bold" style={{ color: 'var(--accent-cyan)' }}>92.8%</div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="hover:text-cyan-400 cursor-pointer transition-colors">View All</span>
                    <span className="hover:text-cyan-400 cursor-pointer transition-colors">View Top Results</span>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5 mb-5" />

            {/* Videos */}
            <div className="mb-5">
                <div className="text-xs font-semibold tracking-wider mb-3" style={{ color: 'var(--accent-cyan)' }}>
                    Videos
                </div>
                <div className="space-y-3">
                    <div className="video-card">
                        <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-navy-600 to-navy-700 flex-shrink-0 overflow-hidden flex items-center justify-center">
                            <div className="text-[8px] text-gray-500">🛹</div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-gray-200 truncate">Hover Board Review</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">YOUTUBE</div>
                        </div>
                        <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all flex-shrink-0">
                            <Play size={12} fill="currentColor" />
                        </button>
                    </div>

                    <div className="video-card">
                        <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-navy-600 to-navy-700 flex-shrink-0 overflow-hidden flex items-center justify-center">
                            <div className="text-[8px] text-gray-500">📦</div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-gray-200 truncate">Hover Board Unboxing</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">YOUTUBE</div>
                        </div>
                        <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all flex-shrink-0">
                            <Play size={12} fill="currentColor" />
                        </button>
                    </div>
                </div>
                <div className="text-right mt-2">
                    <span className="text-xs cursor-pointer transition-colors hover:text-cyan-300" style={{ color: 'var(--accent-cyan)' }}>
                        View All
                    </span>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5 mb-5" />

            {/* Nearest Stores */}
            <div>
                <div className="text-xs font-semibold tracking-wider mb-3" style={{ color: 'var(--accent-cyan)' }}>
                    Nearest Stores
                </div>
                <div className="rounded-xl overflow-hidden border border-white/5 bg-gradient-to-br from-navy-600 to-navy-700 h-36 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                        <div className="text-2xl mb-1">🏬</div>
                        <div className="text-[10px] uppercase tracking-widest">Store Map</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;
