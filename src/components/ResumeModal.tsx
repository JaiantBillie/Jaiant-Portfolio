import React, { useState } from "react";
import { X, FileText, Briefcase, Award, GraduationCap, Copy, Check, Download } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyContact = () => {
    navigator.clipboard.writeText("psekukumpat@gmail.com | 099-472-1769");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-surface-lowest border border-primary-cyan/25 rounded-md flex flex-col h-[70vh] overflow-hidden shadow-[0_0_35px_rgba(76,215,246,0.12)]">
        
        {/* Top Header */}
        <div className="bg-surface-high border-b border-primary-cyan/10 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={15} className="text-primary-cyan" />
            <span className="font-mono text-xs tracking-widest text-primary-cyan font-semibold">
              DOCUMENTATION // RESUME_DATA.LOG
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded text-text-secondary hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
          <div className="space-y-6">
            {/* Header profile */}
            <div className="border-b border-primary-cyan/10 pb-4">
              <h3 className="text-xl font-bold text-white font-sans flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                <span>Pheeraphat Sekhukhumpat</span>
                <span className="text-sm font-normal text-text-secondary">(นาย พีรพัฒน์ เสคุคุมพัตถ์)</span>
              </h3>
              <span className="text-xs font-mono text-primary-cyan">COMPUTER ENGINEERING GRADUATE</span>
              
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-text-secondary">
                <span>📍 Sakon Nakhon, Thailand</span>
                <span>📧 psekukumpat@gmail.com</span>
                <span>📞 099-472-1769</span>
              </div>
            </div>

            {/* Work values */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-primary-cyan font-bold flex items-center gap-1.5 uppercase">
                <Award size={13} /> career motivation
              </h4>
              <p className="text-xs md:text-sm text-text-primary leading-relaxed">
                วิศวกรรมคอมพิวเตอร์จบใหม่ ที่ยังมีอะไรต้องเรียนอีกเยอะ ชอบลงมือทำโดยสร้างโปรเจกต์จริงเพื่อทำความเข้าใจระบบเชิงลึก และพร้อมรับฟังข้อเสนอแนะเพื่อปรับปรุงขีดความสามารถและพัฒนาตนเองอย่างต่อเนื่องในทุกๆ วัน. สนใจตำแหน่งงานทางด้าน Full-Stack Web Developer, Software Engineer, และงานพัฒนาด้าน AI/ML Systems.
              </p>
            </div>

            {/* Education section */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono text-primary-cyan font-bold flex items-center gap-1.5 uppercase">
                <GraduationCap size={14} /> education history
              </h4>
              <div className="border-l-2 border-primary-cyan/20 pl-4 space-y-1">
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="font-bold text-white">Bachelor of technology in Computer Engineering</span>
                  <span className="font-mono text-primary-cyan text-xs">2022 — 2026</span>
                </div>
                <p className="text-xs text-text-secondary">Rajamangala university of technology Sakon Nakhon (RMUTI)</p>
              </div>
            </div>

            {/* Quick actions bar */}
            <div className="flex gap-2 pt-2 border-t border-primary-cyan/5 font-mono text-xs">
              <button
                onClick={copyContact}
                className="flex-1 py-2 bg-primary-cyan/10 hover:bg-primary-cyan/20 border border-primary-cyan/25 text-primary-cyan rounded-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? "Copied Info!" : "Copy Contact Info"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
