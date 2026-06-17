import React, { useState, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles, MapPin, ExternalLink, Cpu, Globe, ArrowDown, Code2, Layers, HelpCircle, HardDrive } from "lucide-react";
import Navbar from "./components/Navbar";
import TerminalModal from "./components/TerminalModal";
import ProjectShowcaseModal from "./components/ProjectShowcaseModal";
import ResumeModal from "./components/ResumeModal";
import ContactForm from "./components/ContactForm";

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalCmd, setTerminalCmd] = useState<string | undefined>(undefined);
  
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("vehicle");

  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Skill filter
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // System status simulation
  const [isSysStatusOpen, setIsSysStatusOpen] = useState(false);
  const [sysCpu, setSysCpu] = useState(12);
  const [sysRam, setSysRam] = useState(44);

  useEffect(() => {
    const timer = setInterval(() => {
      setSysCpu(Math.floor(Math.random() * 25) + 10);
      setSysRam(Math.floor(Math.random() * 5) + 42);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const openTerminal = (cmd?: string) => {
    setTerminalCmd(cmd);
    setIsTerminalOpen(true);
  };

  const openProject = (id: string) => {
    setSelectedProjectId(id);
    setIsProjectOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-bg-dark text-text-primary overflow-x-hidden selection:bg-primary-cyan/25 selection:text-primary-cyan">
      <div className="noise-overlay" />

      {/* Global Background Grid and Ambient Glows */}
      <div className="absolute inset-0 tech-grid pointer-events-none z-0" />
      <div className="absolute top-24 left-[10%] w-96 h-96 bg-primary-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-96 h-96 bg-primary-cyan/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Navbar segment */}
      <Navbar
        onOpenTerminal={(cmd) => openTerminal(cmd)}
        onOpenTextResume={() => setIsResumeOpen(true)}
      />

      <main className="w-full relative z-10">
        
        {/* ==========================================
            1. HERO SECTION
            ========================================== */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-16 pb-24 px-6">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left bio details */}
            <div className="lg:col-span-8 flex flex-col items-start space-y-6">
              
              {/* Pulsing Active indicator */}
              <div
                onClick={() => openTerminal("neofetch")}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded status-badge text-xs font-mono tracking-widest font-bold cursor-pointer hover:bg-primary-cyan/10 transition-colors select-none"
              >
                <span className="w-2 h-2 rounded-full bg-primary-cyan animate-pulse shadow-[0_0_10px_rgba(197,160,89,0.8)]" />
                MEMBER: CREATIVE DEVELOPER
              </div>

              <div className="space-y-4">
                <span className="inline-block text-primary-cyan text-xs font-semibold tracking-[0.3em] uppercase font-serif italic">
                  PHEERAPHAT SEKHUKHUMPAT // SELECTED SYSTEMS
                </span>
                <h1 className="text-4xl md:text-7xl font-serif font-light leading-[1.1] italic text-white select-none">
                  The Silence of <br/>
                  <span className="text-primary-cyan drop-shadow-[0_0_20px_rgba(197,160,89,0.15)] font-normal not-italic uppercase tracking-[0.05em]">Structure &amp; Algorithmic</span> Code
                </h1>
              </div>

              <div className="w-16 h-[1px] bg-primary-cyan/40 my-6"></div>

              <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed font-sans font-light">
                วิศวกรรมคอมพิวเตอร์จบใหม่ ที่ยังมีอะไรต้องเรียนอีกเยอะ ชอบลงมือทำเพื่อเข้าใจ และพร้อมรับฟังเพื่อเติบโตในทุกๆ วัน..
              </p>

              {/* Dynamic trigger links */}
              <div className="flex flex-wrap gap-4 pt-4 font-mono text-[11px] uppercase tracking-[0.2em]">
                <a
                  href="#work"
                  className="px-8 py-4 bg-primary-cyan text-black font-semibold rounded-xs hover:bg-white hover:text-black transition-all hover:shadow-[0_0_20px_rgba(197,160,89,0.35)] cursor-pointer"
                >
                  Explore Work
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 border border-white/20 text-white rounded-xs hover:bg-white/10 hover:border-primary-cyan transition-all cursor-pointer"
                >
                  Contact Me
                </a>
                <button
                  onClick={() => openTerminal()}
                  className="px-6 py-4 bg-black/60 border border-primary-cyan/25 text-primary-cyan hover:bg-primary-cyan/15 rounded-xs flex items-center gap-2.5 cursor-pointer transition-all"
                >
                  <TerminalIcon size={14} className="animate-pulse" /> Launch Terminal
                </button>
              </div>
            </div>

            {/* Right decorative terminal widget (Aesthetics) */}
            <div className="hidden lg:col-span-4 bg-[#121212] border border-white/10 rounded-md p-5 font-mono text-xs space-y-4 shadow-[0_0_30px_rgba(197,160,89,0.04)] relative overflow-hidden select-none">
              <div className="absolute top-3 right-3 text-[9px] text-primary-cyan/40 tracking-[0.2em] uppercase">SYSTEM_INDEX</div>
              <div className="flex gap-1.5 border-b border-white/10 pb-3">
                <div className="w-2 h-2 rounded-full bg-[#C5A059]/40" />
                <div className="w-2 h-2 rounded-full bg-[#C5A059]/20" />
                <div className="w-2 h-2 rounded-full bg-[#E5E5E5]/10" />
              </div>

              <div className="space-y-3">
                <div className="text-primary-cyan flex justify-between font-bold tracking-wider">
                  <span>SYSTEM METRICS:</span>
                  <span className="text-emerald-400 font-bold">[LOADED]</span>
                </div>
                <div className="text-text-secondary pl-2 space-y-1.5 text-[11px]">
                  <div>• HOST: Cloud Run (asia-east1)</div>
                  <div>• SECURE ARCH: TLS/SSL Secured</div>
                  <div>• RENDER: Playfair Display / Inter</div>
                  <div>• STATUS: 55.67° N, 12.56° E</div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-text-secondary">
                <span>LATENCY: 1.2ms</span>
                <button 
                  onClick={() => openTerminal("neofetch")}
                  className="text-primary-cyan hover:underline hover:text-white font-bold"
                >
                  neofetch()
                </button>
              </div>
            </div>

          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-80 transition-opacity pointer-events-none font-mono text-[10px]">
            <span>SCROLL TO EXPLORE ARCHITECTURE</span>
            <ArrowDown size={14} className="animate-bounce" />
          </div>
        </section>


        {/* ==========================================
            2. TECHNICAL ARSENAL
            ========================================== */}
        <section id="about" className="py-24 border-t border-white/10 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl space-y-6">
              
              <h2 className="text-3xl md:text-5xl font-serif font-light italic text-white select-none">
                Technical <span className="text-primary-cyan not-italic uppercase tracking-[0.2em] text-2xl font-sans inline-block ml-3">Arsenal</span>
              </h2>

              <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl">
                นักศึกษาวิศวกรรมคอมพิวเตอร์จบใหม่ สนใจในการพัฒนา Frontend, Backend Development และการเรียนรู้การใช้ AI ช่วยในกระบวนการเขียนโค้ด ได้รับโอกาสฝึกงานที่ PEA ทำให้ได้สัมผัสการทำงานในระบบจริง ตั้งใจเรียนรู้ พัฒนาทักษะอย่างต่อเนื่อง และพร้อมเปิดรับคำแนะนำจากทีมงานที่มีประสบการณ์
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  { name: "React", projects: ["vehicle"] },
                  { name: "Next.js", projects: [] },
                  { name: "Python", projects: ["easyeats", "trading"] },
                  { name: "JavaScript", projects: ["vehicle"] },
                  { name: "TypeScript", projects: [] },
                  { name: ".Net(C#)", projects: [] },
                  { name: "Node.js", projects: [] },
                  { name: "PyTorch", projects: ["trading"] },
                  { name: "Scikit-learn", projects: ["trading"] },
                  { name: "Git&Github", projects: ["vehicle", "easyeats", "trading"] },
                ].map((skill) => {
                  const isActive = selectedSkill === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onClick={() => setSelectedSkill(isActive ? null : skill.name)}
                      className={`px-4 py-2 bg-primary-cyan/10 border text-primary-cyan text-xs font-mono font-bold rounded-sm shadow-[0_0_8px_rgba(76,215,246,0.15)] hover:shadow-[0_0_16px_rgba(76,215,246,0.4)] transition-all cursor-pointer select-none ${
                        isActive
                          ? "bg-primary-cyan/35 border-primary-cyan text-white scale-105"
                          : "border-primary-cyan/30 hover:border-primary-cyan/70 hover:bg-primary-cyan/15"
                      }`}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>

              {selectedSkill && (
                <div className="text-xs font-mono text-primary-cyan/80 bg-primary-cyan/5 border border-primary-cyan/10 p-3 rounded-sm flex items-center justify-between">
                  <span>Filtered highlighted projects using: {selectedSkill}.</span>
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="hover:underline text-white font-bold"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>


        {/* ==========================================
            3. FEATURED WORK (PROJECTS GRID)
            ========================================== */}
        <section id="work" className="py-24 border-t border-white/10 bg-black/40">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="mb-12">
              <h2 className="text-3xl md:text-5xl font-serif font-light italic text-white select-none">
                Featured <span className="text-primary-cyan not-italic uppercase tracking-[0.2em] text-2xl font-sans inline-block ml-3">Work</span>
              </h2>
              <p className="text-sm text-text-secondary mt-2 max-w-xl font-light">
                Active software platforms featuring modular neural prediction loops, simulated database systems, and robust routing mechanics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Project 1 CARD */}
              <div
                onClick={() => openProject("vehicle")}
                className={`tech-panel overflow-hidden group cursor-pointer font-sans flex flex-col justify-between ${
                  selectedSkill && !["JavaScript", "Git&Github"].includes(selectedSkill) ? "opacity-35 grayscale" : ""
                }`}
              >
                <div>
                  <div className="aspect-video bg-surface-lowest border-b border-primary-cyan/10 flex items-center justify-center relative overflow-hidden">
                    <span className="absolute top-2 left-2 text-[9px] font-mono text-primary-cyan/40 z-10 bg-black/60 px-1 py-0.5 rounded-xs">HOSTED_TELEMETRY</span>
                    <img 
                      src="/project1/car-1.jpg" 
                      referrerPolicy="no-referrer"
                      alt="Centralized Vehicle Management System" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-cyan transition-colors">
                      Centralized Vehicle Management System
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                      ระบบจัดการยานพาหนะส่วนกลาง ช่วยให้องค์กรสามารถติดตามและจัดการยานพาหนะได้อย่างมีประสิทธิภาพ
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex flex-wrap gap-2 text-[10px] font-mono">
                  <span className="px-2 py-1 bg-surface-high border border-primary-cyan/10 rounded-sm text-primary-cyan font-semibold">HTML</span>
                  <span className="px-2 py-1 bg-surface-high border border-primary-cyan/10 rounded-sm text-primary-cyan font-semibold">CSS</span>
                  <span className="px-2 py-1 bg-surface-high border border-primary-cyan/10 rounded-sm text-primary-cyan font-semibold">JavaScript</span>
                  <span className="px-2 py-1 bg-surface-high border border-primary-cyan/10 rounded-sm text-primary-cyan font-semibold">Bootstrap</span>
                  <span className="px-2 py-1 bg-surface-high border border-primary-cyan/10 rounded-sm text-primary-cyan font-semibold">Google App Script</span>
                </div>
              </div>

              {/* Project 2 CARD */}
              <div
                onClick={() => openProject("easyeats")}
                className={`tech-panel overflow-hidden group cursor-pointer font-sans flex flex-col justify-between ${
                  selectedSkill && !["Python", "Git&Github"].includes(selectedSkill) ? "opacity-35 grayscale" : ""
                }`}
              >
                <div>
                  <div className="aspect-video bg-surface-lowest border-b border-primary-cyan/10 flex items-center justify-center relative overflow-hidden">
                    <span className="absolute top-2 left-2 text-[9px] font-mono text-primary-cyan/40 z-10 bg-black/60 px-1 py-0.5 rounded-xs">TFLITE_INFERENCE</span>
                    <img 
                      src="/project2/food_1.jpg" 
                      referrerPolicy="no-referrer"
                      alt="EasyEats" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-cyan transition-colors">
                      EasyEats — AI Food Recommendation
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                      แพลตฟอร์มแนะนำอาหารอัจฉริยะ โดยใช้ AI แนะนำเมนูอาหารจากวัตถุดิบที่คุณมี 
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex flex-wrap gap-2 text-[10px] font-mono">
                  <span className="px-2 py-1 bg-surface-high border border-primary-cyan/10 rounded-sm text-primary-cyan font-semibold">Flutter</span>
                  <span className="px-2 py-1 bg-surface-high border border-primary-cyan/10 rounded-sm text-primary-cyan font-semibold">Python (Flask)</span>
                  <span className="px-2 py-1 bg-surface-high border border-primary-cyan/10 rounded-sm text-primary-cyan font-semibold">TensorFlow Lite</span>
                </div>
              </div>

              {/* Project 3 CARD */}
              <div
                onClick={() => openProject("trading")}
                className={`tech-panel overflow-hidden group cursor-pointer font-sans flex flex-col justify-between ${
                  selectedSkill && !["Python", "PyTorch", "Scikit-learn", "Git&Github"].includes(selectedSkill) ? "opacity-35 grayscale" : ""
                }`}
              >
                <div>
                  <div className="aspect-video bg-surface-lowest border-b border-primary-cyan/10 flex items-center justify-center relative overflow-hidden">
                    <span className="absolute top-2 left-2 text-[9px] font-mono text-primary-cyan/40 z-10 bg-black/60 px-1 py-0.5 rounded-xs">FOREX_BOT_VPS</span>
                    <img 
                      src="/project3/Forex_1.jpg" 
                      referrerPolicy="no-referrer"
                      alt="SnowballAI" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-cyan transition-colors">
                      SnowballAI — Algorithmic Trading Bot
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                      บอทเทรด Forex อัตโนมัติด้วย AI Ensemble Models ที่รันบน VPS
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex flex-wrap gap-2 text-[10px] font-mono">
                  <span className="px-2 py-1 bg-surface-high border border-primary-cyan/10 rounded-sm text-primary-cyan font-semibold">Python</span>
                  <span className="px-2 py-1 bg-surface-high border border-primary-cyan/10 rounded-sm text-primary-cyan font-semibold">PyTorch</span>
                  <span className="px-2 py-1 bg-surface-high border border-primary-cyan/10 rounded-sm text-primary-cyan font-semibold">Scikit-learn</span>
                  <span className="px-2 py-1 bg-surface-high border border-primary-cyan/10 rounded-sm text-primary-cyan font-semibold">Flask</span>
                  <span className="px-2 py-1 bg-surface-high border border-primary-cyan/10 rounded-sm text-primary-cyan font-semibold">MT5 API</span>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ==========================================
            4. CONTACT SECTION
            ========================================== */}
        <ContactForm />

      </main>

      {/* ==========================================
          5. FOOTER
          ========================================== */}
      <footer className="bg-surface-lowest border-t border-primary-cyan/10 py-12 w-full relative z-10 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-text-secondary">
            SYS.OUT // 2026 Pheeraphat Sekhukhumpat. All system resources allocated.
          </div>
          
          <div className="flex flex-wrap gap-6 text-primary-cyan font-semibold text-xs justify-center select-none">
            <button
              onClick={() => openTerminal()}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terminal
            </button>
            <button
              onClick={() => openTerminal("projects")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Repository
            </button>
            <button
              onClick={() => setIsSysStatusOpen(true)}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              System Status
            </button>
          </div>
        </div>
      </footer>


      {/* Modals & Dialog blocks overlay */}
      
      {/* 1. Terminal Emulator Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        initialCommand={terminalCmd}
      />

      {/* 2. Project Interactive Labs Modal */}
      <ProjectShowcaseModal
        isOpen={isProjectOpen}
        onClose={() => setIsProjectOpen(false)}
        projectId={selectedProjectId}
      />

      {/* 3. Resume Log Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* 4. Real-time Node Status Diagnostics floating card */}
      {isSysStatusOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-80 bg-surface-lowest border border-emerald-400/30 rounded-md p-4 font-mono text-xs text-white shadow-[0_0_25px_rgba(16,185,129,0.15)] space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-400/10 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold tracking-wider text-emerald-400 uppercase">SYS NODE DIAGNOSTICS</span>
            </div>
            <button
              onClick={() => setIsSysStatusOpen(false)}
              className="p-0.5 hover:bg-white/10 rounded text-text-secondary hover:text-white"
            >
              <X size={12} />
            </button>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] text-text-secondary">
                <span>CPU LOADING STATUS</span>
                <span>{sysCpu}%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-emerald-400 h-full transition-all duration-1000" style={{ width: `${sysCpu}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] text-text-secondary">
                <span>RAM UTILIZATION</span>
                <span>{sysRam}% (224MB / 512MB)</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-emerald-400 h-full transition-all duration-1000" style={{ width: `${sysRam}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 border-t border-emerald-400/5 text-text-secondary">
              <div>
                <span>PING LATENCY</span>
                <p className="font-bold text-white">1.22 ms</p>
              </div>
              <div>
                <span>HOST DOMAIN</span>
                <p className="font-bold text-white truncate text-[9px]">asia-east1.run</p>
              </div>
            </div>
          </div>
          
          <div className="text-[9px] text-center text-text-secondary border-t border-emerald-400/5 pt-1.5">
            Synchronized with Google Cloud Run services
          </div>
        </div>
      )}

    </div>
  );
}

// Small icon helper
function X({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  )
}
