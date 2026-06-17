import React, { useState, useEffect } from "react";
import { Mail, Phone, Send, CheckCircle2, RefreshCw, Terminal, ShieldAlert } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSending, setIsSending] = useState(false);
  const [sendingLogs, setSendingLogs] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [outbox, setOutbox] = useState<{ name: string; email: string; message: string; timestamp: string }[]>([]);

  // Load outbox from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_outbox");
    if (saved) {
      try {
        setOutbox(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);
    setSendingLogs([]);

    const logs = [
      "DISPATCHER: Resolving secure email SMTP socket...",
      "DISPATCHER: Binding message payload package...",
      "SECURITY: Performing spam validation check...",
      "GATEWAY: Message packet signed and sent successfully to psekukumpat@gmail.com!",
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < logs.length) {
        setSendingLogs((prev) => [...prev, logs[index]]);
        index++;
      } else {
        clearInterval(interval);
        
        // Save to local outbox
        const newMsg = {
          name,
          email,
          message,
          timestamp: new Date().toLocaleTimeString(),
        };
        const updatedOutbox = [newMsg, ...outbox].slice(0, 5);
        setOutbox(updatedOutbox);
        localStorage.setItem("portfolio_outbox", JSON.stringify(updatedOutbox));

        setIsSuccess(true);
        setIsSending(false);

        // Clear fields
        setName("");
        setEmail("");
        setMessage("");
      }
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-white/10 z-10">
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="tech-panel p-8 md:p-12 relative overflow-hidden rounded-md">
          {/* Subtle decoration lines simulating circuit tracks */}
          <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
            {/* Status bar */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded status-badge text-[11px] font-mono tracking-widest font-bold">
              <span className="w-2 h-2 rounded-full bg-primary-cyan animate-pulse shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
              CONTACT ACTIVE
            </div>

            <h2 className="text-3xl md:text-5xl font-serif font-light italic text-white leading-tight">
              Let's build something <span className="text-primary-cyan not-italic uppercase tracking-[0.1em] text-2xl font-sans inline-block md:block mt-2 font-bold">extraordinary</span> together.
            </h2>

            <div className="space-y-2 font-mono">
              <p className="text-lg md:text-2xl font-bold text-primary-cyan hover:underline transition-all cursor-pointer">
                psekukumpat@gmail.com
              </p>
              <p className="text-sm md:text-base text-text-secondary">
                099-472-1769
              </p>
            </div>

            {/* Split Contact options and Local Outbox history */}
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 text-left">
              {/* Form panel */}
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-mono text-primary-cyan uppercase tracking-wider block font-bold border-b border-white/10 pb-1">
                  SECURE MESSAGE DISPATCH
                </span>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-text-secondary text-[11px] mb-1 font-bold">SENDER NAME</label>
                      <input
                        type="text"
                        className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-primary-cyan focus:ring-1 focus:ring-primary-cyan"
                        placeholder="e.g. Alexis Vance"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isSending}
                      />
                    </div>
                    <div>
                      <label className="block text-text-secondary text-[11px] mb-1 font-bold">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-primary-cyan focus:ring-1 focus:ring-primary-cyan"
                        placeholder="e.g. alexis@corp.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSending}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-text-secondary text-[11px] mb-1 font-bold">PAYLOAD ENVELOPE (MESSAGE)</label>
                    <textarea
                      rows={4}
                      className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-primary-cyan focus:ring-1 focus:ring-primary-cyan resize-none"
                      placeholder="Discuss collaboration opportunities, software consultancies, or project recruitments..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      disabled={isSending}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3 bg-primary-cyan text-black hover:bg-white hover:text-black rounded font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(197,160,89,0.3)] disabled:opacity-50 uppercase tracking-[0.1em]"
                  >
                    {isSending ? (
                      <>
                        <RefreshCw className="animate-spin" size={14} /> Broadcasting Signal...
                      </>
                    ) : (
                      <>
                        <Send size={13} /> Dispatch Secure Payload
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Status dispatch log tracking bar */}
              <div className="md:col-span-5 space-y-4">
                <span className="text-xs font-mono text-primary-cyan uppercase tracking-wider block font-bold border-b border-white/10 pb-1">
                  DISPATCH SYSTEM LOG
                </span>

                {isSending ? (
                  <div className="p-4 bg-black/80 rounded border border-white/10 font-mono text-[10px] space-y-2 min-h-[170px] flex flex-col justify-end">
                    <div className="flex items-center gap-2 text-primary-cyan border-b border-white/10 pb-1 font-bold animate-pulse">
                      <Terminal size={12} />
                      <span>SMTP_CON_ESTABLISHED</span>
                    </div>
                    {sendingLogs.map((log, index) => (
                      <div key={index} className="text-text-secondary truncate">{log}</div>
                    ))}
                  </div>
                ) : isSuccess ? (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded min-h-[170px] flex flex-col items-center justify-center text-center space-y-3 font-mono">
                    <CheckCircle2 className="text-emerald-400" size={32} />
                    <div>
                      <span className="text-emerald-400 font-bold block text-xs">TRANSMISSION OK</span>
                      <p className="text-[11px] text-text-secondary mt-1 max-w-[200px] mx-auto leading-relaxed">
                        Secure parcel packet safely routed over TLS. Pheeraphat is notified.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-3 py-1 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 border border-emerald-400/20 rounded text-[10px]"
                    >
                      Dismiss View
                    </button>
                  </div>
                ) : (
                  <div className="bg-black/40 rounded border border-white/10 p-4 min-h-[170px] flex flex-col justify-between font-mono text-[11px] text-text-secondary">
                    {outbox.length > 0 ? (
                      <div className="space-y-3">
                        <span className="text-[10px] text-primary-cyan/60 tracking-wider block font-bold">RECENT PACKET OUTBOX:</span>
                        <div className="space-y-2 divide-y divide-white/5">
                          {outbox.map((msg, idx) => (
                            <div key={idx} className="pt-2 first:pt-0">
                              <div className="flex justify-between font-bold text-white text-[10px]">
                                <span>To: Pheeraphat</span>
                                <span className="text-primary-cyan/50">{msg.timestamp}</span>
                              </div>
                              <p className="text-[10px] truncate mt-0.5 text-text-secondary">&quot;{msg.message}&quot;</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 opacity-60">
                        <ShieldAlert size={20} className="text-primary-cyan/40" />
                        <p className="text-[10px] text-text-secondary max-w-[170px]">
                          Secure SSL tunnels will spin up dynamically during execution.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* General Direct Mailto trigger */}
            <div className="pt-4 border-t border-white/10 w-full flex justify-center">
              <a
                className="px-6 py-3 bg-primary-cyan text-black text-xs font-mono font-bold rounded-sm hover:opacity-90 hover:shadow-[0_0_15px_rgba(197,160,89,0.3)] transition-all inline-flex items-center gap-2 cursor-pointer uppercase tracking-[0.1em]"
                href="mailto:psekukumpat@gmail.com"
              >
                Direct Mail Client Access href=mailto
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
