import React from 'react';
import { ChevronDown } from 'lucide-react';

const categories = [
    { name: 'WEATHER', percent: 45 },
    { name: 'MEDICAL EQUIPMENT', percent: 45 },
    { name: 'TRAFIC SIGNALS', percent: 45 },
    { name: 'PATH RECOGNITION', percent: 45 },
    { name: 'ALARM', percent: 45 },
    { name: 'FACTS', percent: 45 },
    { name: 'MOVIES', percent: 45 },
    { name: 'CARTOONS', percent: 45 },
    { name: 'RESTAURANTS', percent: 45 },
    { name: 'CLOTHS STORES', percent: 45 },
];

const LeftSidebar = () => {
    return (
        <div className="h-full flex flex-col px-5 py-6 overflow-hidden">
            <h2 className="text-lg font-semibold text-white mb-5 tracking-wide">
                Previous Search History
            </h2>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat, i) => (
                        <div key={i} className="category-card group">
                            <div className="text-xs font-semibold tracking-wider mb-3"
                                style={{ color: 'var(--accent-cyan)' }}>
                                {cat.name}
                            </div>
                            <div className="text-xs text-gray-400 mb-2">{cat.percent}%</div>
                            <div className="progress-bar">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${cat.percent}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center pt-3">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:border-cyan-400/30 transition-all cursor-pointer">
                    <ChevronDown size={16} />
                </div>
            </div>
        </div>
    );
};

export default LeftSidebar;
