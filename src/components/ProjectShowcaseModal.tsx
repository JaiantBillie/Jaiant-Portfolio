import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Cpu, Sparkles, CheckCircle2 } from "lucide-react";

interface ProjectShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  fullDesc: string[];
  features: string[];
  tags: string[];
  emoji: string;
  images: string[];
}

const projectsData: Record<string, ProjectData> = {
  vehicle: {
    id: "vehicle",
    title: "Centralized Vehicle Management System",
    subtitle: "ระบบจัดการยานพาหนะส่วนกลาง ช่วยให้องค์กรสามารถติดตามและจัดการยานพาหนะได้อย่างมีประสิทธิภาพ",
    desc: "โปรเจกต์ระบบดิจิทัลแบบ 100% เพื่อเข้าสแกน จัดจอง และจดคิวคุมรถส่วนกลางแทนระบบกระดาษเดิม",
    fullDesc: [
      "โปรเจกต์นี้พัฒนาขึ้นเพื่อแก้ปัญหาการจัดการรถยนต์ขององค์กรที่ซับซ้อน โดยเปลี่ยนจากการจดบันทึกลงกระดาษมาเป็นระบบดิจิทัลแบบ 100%",
      "ผู้ใช้งานสามารถตรวจสอบสถานะรถว่าง และทำการจองผ่านระบบได้อย่างรวดเร็ว ในขณะที่ผู้ดูแลระบบสามารถดูภาพรวมและจัดการคิวรถได้ผ่าน Dashboard"
    ],
    features: [
      "ระบบสแกน QR Code ประจำรถเพื่อดึงข้อมูลและทำรายการทันที",
      "ระบบอนุมัติการใช้งาน (Approval Flow) สำหรับหัวหน้างาน",
      "อัปเดตข้อมูลแบบ Real-time ลงฐานข้อมูล"
    ],
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Google App Script"],
    emoji: "🚀",
    images: ["/project1/car-1.jpg", "/project1/car-2.jpg", "/project1/car-3.jpg"]
  },
  easyeats: {
    id: "easyeats",
    title: "EasyEats — AI Food Recommendation",
    subtitle: "แพลตฟอร์มแนะนำอาหารอัจฉริยะ โดยใช้ AI แนะนำเมนูอาหารจากวัตถุดิบที่คุณมี",
    desc: "ระบบจัดประเมินเมนูที่ตอบโจทย์ความชอบและวัตถุดิบจริง พร้อมแนะสัดส่วนอย่างละเอียด",
    fullDesc: [
      "แพลตฟอร์มแนะนำอาหารอัจฉริยะ นำเสนอประสบการณ์การค้นหาเมนูอาหารที่เหนือกว่า โดยใช้ AI วิเคราะห์วัตถุดิบที่คุณมีในตู้เย็น",
      "ระบบจะประมวลผลออกมาเป็นเมนูอาหารที่เหมาะสม พร้อมแสดงวิธีทำและสัดส่วนวัตถุดิบอย่างละเอียด ช่วยแก้ปัญหา 'วันนี้กินอะไรดี' ได้อย่างตรงจุด"
    ],
    features: [
      "แนะนำเมนูอาหารจากวัตถุดิบที่มีอยู่จริง",
      "UI/UX ออกแบบมาให้ใช้งานง่ายบนมือถือ",
      "ประมวลผลด้วย AI Model ที่มีความแม่นยำสูง"
    ],
    tags: ["Flutter", "Python (Flask)", "TensorFlow Lite"],
    emoji: "⚡",
    images: [
      "/project2/food_1.jpg",
      "/project2/food_2.jpg",
      "/project2/food_3.jpg",
      "/project2/food_4.jpg",
      "/project2/food_5.jpg",
      "/project2/food_6.jpg",
      "/project2/food_7.jpg"
    ]
  },
  trading: {
    id: "trading",
    title: "SnowballAI — Algorithmic Trading Bot",
    subtitle: "บอทเทรด Forex อัตโนมัติด้วย AI Ensemble Models ที่รันบน VPS",
    desc: "ระบบคำนวณทิศทางส่งคำสั่ง MetaTrader 5 API และวิเคราะห์ทฤษฎีแนวโน้มอย่างเรียลไทม์",
    fullDesc: [
      "SnowballAI เป็นโปรเจกต์บอทเทรด Forex อัตโนมัติที่ใช้โมเดล AI ขั้นสูงหลายตัวทำงานร่วมกัน (Ensemble Models) ในการวิเคราะห์แนวโน้มตลาด",
      "ตัวบอทสามารถส่งคำสั่งซื้อขายผ่าน MetaTrader 5 API ได้แบบอัตโนมัติ โดยปัจจุบันรันและมอนิเตอร์ประสิทธิภาพการทำงานอยู่บน DigiCloud VPS ตลอด 24 ชั่วโมง"
    ],
    features: [
      "ใช้โมเดล AI หลากหลาย (Neural Networks, Reinforcement Learning, Random Forest)",
      "เชื่อมต่อและส่งคำสั่งผ่าน MetaTrader 5 API ทันทีเมื่อเกิดสัญญาณ",
      "รันบน VPS ตลอด 24 ชั่วโมงเพื่อไม่ให้พลาดโอกาสในตลาด",
      "มีระบบจัดการความเสี่ยง (Risk Management) ภายในตัว"
    ],
    tags: ["Python", "PyTorch", "Scikit-learn", "Flask", "MT5 API"],
    emoji: "✨",
    images: ["/project3/Forex_1.jpg"]
  }
};

export default function ProjectShowcaseModal({ isOpen, onClose, projectId }: ProjectShowcaseModalProps) {
  if (!isOpen) return null;

  const project = projectsData[projectId];
  if (!project) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const prevImage = () => {
    if (project.images && project.images.length > 0) {
      setActiveImgIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
    }
  };

  const nextImage = () => {
    if (project.images && project.images.length > 0) {
      setActiveImgIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-surface-lowest border border-white/10 rounded-md flex flex-col h-[85vh] overflow-hidden shadow-[0_0_50px_rgba(197,160,89,0.05)] relative">
        
        {/* Modal Header */}
        <div className="bg-surface-high border-b border-white/10 px-6 py-4 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-cyan animate-pulse shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-primary-cyan uppercase font-bold">
              PORTFOLIO ARCHIVE // SELECTION_ID: {project.id.toUpperCase()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/15 rounded text-text-secondary hover:text-white transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          
          {/* Gallery Viewport */}
          <div className="relative bg-black h-[280px] sm:h-[360px] md:h-[420px] shrink-0 overflow-hidden flex items-center justify-center border-b border-white/10">
            {project.images && project.images.length > 0 ? (
              <React.Fragment>
                {/* Blur Backdrop */}
                <div
                  className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-40 select-none pointer-events-none"
                  style={{ backgroundImage: `url(${project.images[activeImgIndex]})` }}
                />
                
                {/* Real Foreground Image */}
                <img
                  src={project.images[activeImgIndex]}
                  referrerPolicy="no-referrer"
                  alt={`${project.title} screenshot ${activeImgIndex + 1}`}
                  className="relative z-10 max-h-full max-w-full object-contain p-4 transition-all duration-300"
                />

                {/* Left and Right navigation buttons */}
                {project.images.length > 1 && (
                  <React.Fragment>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white hover:text-primary-cyan hover:border-primary-cyan flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white hover:text-primary-cyan hover:border-primary-cyan flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* Pagination index badge */}
                    <div className="absolute bottom-4 right-4 z-25 bg-black/75 border border-white/10 rounded px-2.5 py-1 font-mono text-[10px] text-white tracking-widest uppercase">
                      {activeImgIndex + 1} / {project.images.length} SCREENSHOTS
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            ) : (
              <div className="text-center text-text-secondary select-none">
                <Cpu size={32} className="mx-auto mb-2 text-primary-cyan/40" />
                <span className="text-xs font-mono">NO IMAGES SPECIFIED FOR THIS MODULE</span>
              </div>
            )}
          </div>

          {/* Details layout */}
          <div className="p-6 md:p-8 space-y-8 flex-1">
            <div className="space-y-3">
              <span className="inline-block px-2 py-0.5 bg-primary-cyan/10 border border-primary-cyan/20 rounded-xs text-[10px] font-mono tracking-wider font-semibold text-primary-cyan uppercase">
                STABLE ARTIFACT
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-light text-white leading-tight">
                {project.title}
              </h2>
              <p className="text-sm font-sans font-medium text-primary-cyan tracking-wide italic">
                {project.subtitle}
              </p>
            </div>

            {/* Grid for description and capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/10">
              
              {/* Project description statement */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-primary-cyan uppercase flex items-center gap-2">
                  <Cpu size={14} /> PROJECT STATEMENT // บทเขียนภาพรวม
                </h3>
                <div className="space-y-3 font-sans text-xs md:text-sm text-text-secondary leading-relaxed">
                  {project.fullDesc.map((pText, i) => (
                    <p key={i}>{pText}</p>
                  ))}
                </div>
              </div>

              {/* Core Features */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-primary-cyan uppercase flex items-center gap-2">
                  <Sparkles size={14} /> SYSTEMS CAPABILITIES // ความสามารถเด่น
                </h3>
                <ul className="space-y-2.5 font-sans text-xs md:text-sm text-text-secondary">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <CheckCircle2 size={15} className="text-primary-cyan shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Tech Stack Footer */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <span className="block text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.15em]">
                CONSTRUCTED CORE TECHNOLOGIES // เครื่องมือที่ผู้พัฒนาเลือกใช้
              </span>
              <div className="flex flex-wrap gap-2 pt-1 font-mono">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-[#121212] border border-white/10 hover:border-primary-cyan/40 text-text-primary text-[11px] rounded-sm transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
          
        </div>

      </div>
    </div>
  );
}
