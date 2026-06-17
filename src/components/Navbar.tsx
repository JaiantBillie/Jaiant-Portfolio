import React, { useState } from "react";
import { Gamepad2, FileText, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenTerminal: (initialCmd?: string) => void;
  onOpenTextResume: () => void;
}

export default function Navbar({ onOpenTerminal, onOpenTextResume }: NavbarProps) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  return (
    <nav className="bg-bg-dark/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 transition-all font-sans">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Brand */}
        <a
          href="#"
          className="text-lg md:text-xl font-serif font-light tracking-[0.2em] text-white hover:text-primary-cyan transition-colors uppercase italic"
        >
          Sekhukhumpat
        </a>

        {/* Desktop Anchor navigation */}
        <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest font-mono">
          <a
            href="#about"
            className="text-primary-cyan font-bold hover:text-white transition-colors cursor-pointer"
          >
            Arsenal
          </a>
          <a
            href="#work"
            className="text-text-secondary hover:text-primary-cyan transition-colors cursor-pointer"
          >
            Collections
          </a>
          <a
            href="#contact"
            className="text-text-secondary hover:text-primary-cyan transition-colors cursor-pointer"
          >
            Heritage
          </a>
        </div>

        {/* Action icons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => onOpenTerminal("game")}
            className="p-2 text-text-secondary hover:text-primary-cyan transition-colors rounded-full hover:bg-primary-cyan/10 active:scale-95 transition-all cursor-pointer"
            title="Shed boredom: Trigger mini-game!"
          >
            <Gamepad2 size={18} />
          </button>
          
          <button
            onClick={onOpenTextResume}
            className="px-6 py-2.5 border border-white/20 hover:border-primary-cyan text-white text-[11px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all text-center cursor-pointer"
          >
            Bespeak Resume
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenTerminal("game")}
            className="p-1.5 text-text-secondary hover:text-primary-cyan rounded-full transition-colors"
          >
            <Gamepad2 size={16} />
          </button>

          <button
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="p-1.5 text-text-secondary hover:text-white transition-colors cursor-pointer"
          >
            {isOpenMobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpenMobile && (
        <div className="md:hidden border-t border-white/10 bg-bg-dark/95 backdrop-blur-lg px-6 py-4 flex flex-col gap-4 text-xs font-mono select-none">
          <a
            href="#about"
            onClick={() => setIsOpenMobile(false)}
            className="text-primary-cyan font-bold hover:text-white py-1 block cursor-pointer"
          >
            &gt; Arsenal
          </a>
          <a
            href="#work"
            onClick={() => setIsOpenMobile(false)}
            className="text-text-secondary hover:text-primary-cyan py-1 block cursor-pointer"
          >
            &gt; Collections
          </a>
          <a
            href="#contact"
            onClick={() => setIsOpenMobile(false)}
            className="text-text-secondary hover:text-primary-cyan py-1 block cursor-pointer"
          >
            &gt; Heritage
          </a>
          <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsOpenMobile(false);
                onOpenTextResume();
              }}
              className="w-full text-center py-2 border border-white/20 text-white hover:bg-white/5 uppercase tracking-[0.1em] rounded-sm font-bold cursor-pointer"
            >
              Resume File
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
