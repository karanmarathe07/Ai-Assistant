import React from 'react';
import { Home, MessageCircle, Layers, Keyboard, Mic, MicOff, Settings, Power, Video, VideoOff, Hand, Lightbulb, Printer, Globe, Box } from 'lucide-react';

const ToolsModule = ({
    isConnected,
    isMuted,
    isVideoOn,
    isHandTrackingEnabled,
    showSettings,
    onTogglePower,
    onToggleMute,
    onToggleVideo,
    onToggleSettings,
    onToggleHand,
    onToggleKasa,
    showKasaWindow,
    onTogglePrinter,
    showPrinterWindow,
    onToggleCad,
    showCadWindow,
    onToggleBrowser,
    showBrowserWindow,
    activeDragElement,
    position,
    onMouseDown
}) => {
    return (
        <div
            id="tools"
            onMouseDown={onMouseDown}
            className="glass rounded-2xl px-3 py-2 flex items-center gap-1"
            style={{
                position: 'fixed',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                pointerEvents: 'auto',
                zIndex: 50
            }}
        >
            <button onClick={onTogglePower} className={`bottom-nav-item ${isConnected ? 'active' : ''}`} title="Home">
                <Home size={20} />
            </button>
            <button onClick={onToggleMute} disabled={!isConnected} className={`bottom-nav-item ${!isConnected ? 'opacity-30 cursor-not-allowed' : isMuted ? '' : 'active'}`} title={isMuted ? 'Unmute' : 'Mute'}>
                <MessageCircle size={20} />
            </button>
            <button onClick={onToggleSettings} className={`bottom-nav-item ${showSettings ? 'active' : ''}`} title="Settings">
                <Layers size={20} />
            </button>
            <button onClick={onToggleVideo} className={`bottom-nav-item ${isVideoOn ? 'active' : ''}`} title="Video">
                <Keyboard size={20} />
            </button>

            <div className="w-px h-6 mx-1" style={{ background: 'var(--border-subtle)' }} />

            <button onClick={onToggleHand} className={`bottom-nav-item ${isHandTrackingEnabled ? 'active' : ''}`} style={{ width: 36, height: 36 }} title="Hand Tracking">
                <Hand size={16} />
            </button>
            <button onClick={onToggleKasa} className={`bottom-nav-item ${showKasaWindow ? 'active' : ''}`} style={{ width: 36, height: 36 }} title="Smart Lights">
                <Lightbulb size={16} />
            </button>
            <button onClick={onTogglePrinter} className={`bottom-nav-item ${showPrinterWindow ? 'active' : ''}`} style={{ width: 36, height: 36 }} title="3D Printer">
                <Printer size={16} />
            </button>
            <button onClick={onToggleCad} className={`bottom-nav-item ${showCadWindow ? 'active' : ''}`} style={{ width: 36, height: 36 }} title="CAD">
                <Box size={16} />
            </button>
            <button onClick={onToggleBrowser} className={`bottom-nav-item ${showBrowserWindow ? 'active' : ''}`} style={{ width: 36, height: 36 }} title="Web Agent">
                <Globe size={16} />
            </button>
        </div>
    );
};

export default ToolsModule;
