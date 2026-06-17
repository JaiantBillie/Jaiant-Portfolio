import React, { useState, useEffect, useRef } from "react";
import { Terminal, X, Minimize2, Maximize2, ShieldAlert, Monitor, Sparkles } from "lucide-react";
import { TerminalLine } from "../types";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCommand?: string;
}

export default function TerminalModal({ isOpen, onClose, initialCommand }: TerminalModalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: "SEKHUKHUMPAT CORE OS v1.0.4-RELEASE", type: "info" },
    { text: "System initialised successfully. Session online.", type: "success" },
    { text: "Type 'help' for a list of available system commands.", type: "info" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  // Retro Game State
  const [isGameActive, setIsGameActive] = useState(false);
  const [playerX, setPlayerX] = useState(4); // 0 to 9 positions
  const [asteroids, setAsteroids] = useState<{ x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameIntervalRef = useRef<number | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      if (initialCommand) {
        handleExecuteCommand(initialCommand);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, isGameActive, gameOver]);

  // Matrix backdrop effect
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!isMatrixActive || !isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    canvas.width = canvas.parentElement?.clientWidth || 500;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&+-<>*";
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(19, 19, 21, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#4cd7f6";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMatrixActive, isOpen]);

  // Mini retrogame mechanics
  useEffect(() => {
    if (!isGameActive) {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
      return;
    }

    const gameLoop = () => {
      setAsteroids((prev) => {
        // Move asteroids down
        const moved = prev
          .map((ast) => ({ ...ast, y: ast.y + 1 }))
          .filter((ast) => ast.y < 12);

        // Check crash: player is at y = 11, playerX is horizontal position
        const crashed = moved.some((ast) => ast.y === 11 && ast.x === playerX);
        if (crashed) {
          setGameOver(true);
          setIsGameActive(false);
          setLines((prevLines) => [
            ...prevLines,
            { text: `[GAME OVER] Asteroid collision detected at pos ${playerX}. Final score: ${score}`, type: "error" },
            { text: "Type 'game' to restart or 'help' for options.", type: "info" }
          ]);
          return [];
        }

        // Add brand new asteroid occasionally
        if (Math.random() < 0.35) {
          const x = Math.floor(Math.random() * 10);
          // ensure no duplications at immediate spawn
          if (!moved.some((ast) => ast.y === 0 && ast.x === x)) {
            moved.push({ x, y: 0 });
          }
        }

        // Increment score for survived frame
        setScore((s) => s + 10);
        return moved;
      });
    };

    gameIntervalRef.current = window.setInterval(gameLoop, 200);
    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    };
  }, [isGameActive, playerX, score]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = inputValue.trim();
      if (command) {
        setHistory((prev) => [...prev, command]);
        setHistoryIndex(-1);
        handleExecuteCommand(command);
      }
      setInputValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputValue(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length > 0 && historyIndex >= 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= history.length) {
          setHistoryIndex(-1);
          setInputValue("");
        } else {
          setHistoryIndex(nextIdx);
          setInputValue(history[nextIdx]);
        }
      }
    }
  };

  const handleExecuteCommand = (commandStr: string) => {
    const rawTokens = commandStr.split(" ");
    const cmd = rawTokens[0].toLowerCase();
    const args = rawTokens.slice(1);

    const newLines: TerminalLine[] = [
      ...lines,
      { text: `sys@sekhukhumpat.dev:~$ ${commandStr}`, type: "input" },
    ];

    if (isGameActive && (cmd === "a" || cmd === "d" || cmd === "h" || cmd === "q")) {
      // Direct controls inside game if typing commands during mini game
      if (cmd === "a") {
        setPlayerX((x) => Math.max(0, x - 1));
        setLines([...newLines, { text: "Moved spaceship left [←]", type: "info" }]);
        return;
      }
      if (cmd === "d") {
        setPlayerX((x) => Math.min(9, x + 1));
        setLines([...newLines, { text: "Moved spaceship right [→]", type: "info" }]);
        return;
      }
      if (cmd === "q") {
        setIsGameActive(false);
        setLines([...newLines, { text: "Mini Game aborted.", type: "error" }]);
        return;
      }
    }

    switch (cmd) {
      case "help":
        newLines.push(
          { text: "Available Commands:", type: "info" },
          { text: "  about      - Display background biology of Pheeraphat", type: "info" },
          { text: "  skills     - View graded list of technical proficiencies", type: "info" },
          { text: "  projects   - Show highlights of featured applications", type: "info" },
          { text: "  neofetch   - Custom ASCII profile summary details", type: "info" },
          { text: "  matrix     - Toggle green matrix digital stream overlay", type: "info" },
          { text: "  game       - Trigger interactive retro keyboard minigame", type: "info" },
          { text: "  clear      - Evacuate history and flush the screen buffer", type: "info" },
          { text: "  exit       - Shutdown core interactive session console", type: "info" }
        );
        break;
      case "about":
        newLines.push(
          { text: "==================================================", type: "info" },
          { text: "Pheeraphat Sekhukhumpat | Computer Engineering Graduate", type: "success" },
          { text: "==================================================", type: "info" },
          { text: "Fresh general Computer Engineering graduate hungry to code, build, and adapt.", type: "info" },
          { text: "Strong dedication to learning by hands-on experimenting and working.", type: "info" },
          { text: "Keen interest in Full-Stack Developer roles, AI architectures, and DevOps automation.", type: "info" },
          { text: "Location: Bangkok, Thailand. Email: psekukumpat@gmail.com. Phone: 099-472-1769", type: "success" }
        );
        break;
      case "skills":
        newLines.push(
          { text: "TECHNICAL ARSENAL INTEGRITY MATRIX / GRADED READOUT:", type: "info" },
          { text: "  React        [█████████████████░░] 85%  - Proficient in modular states", type: "success" },
          { text: "  Next.js      [██████████████░░░░░] 70%  - Advanced API SSR routing", type: "success" },
          { text: "  Python       [████████████████░░░] 80%  - Extensive Flask & AI library tooling", type: "success" },
          { text: "  JavaScript   [██████████████████░] 90%  - Native scripting & event paradigms", type: "success" },
          { text: "  TypeScript   [███████████████░░░░] 75%  - Strict static bindings", type: "success" },
          { text: "  Node.js      [██████████████░░░░░] 70%  - Microservice APIs & REST structures", type: "success" },
          { text: "  PyTorch/ML   [████████████░░░░░░░] 60%  - Smart data modeling", type: "info" }
        );
        break;
      case "projects":
        newLines.push(
          { text: "FEATURED PRODUCTION ARCHITECTURES:", type: "info" },
          { text: "  1. Centralized Vehicle Management System (HTML, CSS, JS)", type: "success" },
          { text: "     - High-efficiency centralized logistical management software.", type: "info" },
          { text: "  2. EasyEats — AI Food Recommendation Platform (Flutter, Flask, TF Lite)", type: "success" },
          { text: "     - Predicts menus dynamically from available domestic ingredients.", type: "info" },
          { text: "  3. SnowballAI — Algorithmic Forex Trading Bot (Python, PyTorch, VPS)", type: "success" },
          { text: "     - Runs ensemble intelligence on low latency VPS machines.", type: "info" }
        );
        break;
      case "neofetch":
        newLines.push(
          {
            text: `       .---.        SYS_INF: Pheeraphat Sekhukhumpat OS v1.0
      /     \\       -----------------------------------------
      \\_.._/        HOST: Cloud Run Sandboxed Architecture
      | m-m |       USER: guest_observer@sekhukhumpat.dev
      \\  =  /       SHELL: Synth-SH v4.1.14
       '---'        UPTIME: 100% Core Signal Status
                    COGNITIVE_STACK: React (V4) / TypeScript / Python`,
            type: "success",
          }
        );
        break;
      case "matrix":
        setIsMatrixActive(!isMatrixActive);
        newLines.push({
          text: `Matrix digital visual waterfall ${!isMatrixActive ? "ACTIVATED" : "DEACTIVATED"}.`,
          type: "success",
        });
        break;
      case "game":
        setGameOver(false);
        setScore(0);
        setPlayerX(4);
        setAsteroids([]);
        setIsGameActive(true);
        newLines.push(
          { text: "RETRO SPACESHIP DODGE-ASTEROID TERMINAL GAME ACTIVATED!", type: "success" },
          { text: "  [A] key: Move Spacecraft Left [←]", type: "info" },
          { text: "  [D] key: Move Spacecraft Right [→]", type: "info" },
          { text: "  [Q] key: Abort System Game", type: "info" },
          { text: "Type movements or click keys. Ready...", type: "success" }
        );
        break;
      case "clear":
        setLines([]);
        return;
      case "exit":
        onClose();
        return;
      default:
        newLines.push({
          text: `Command not found: '${cmd}'. Type 'help' to review commands directory library.`,
          type: "error",
        });
        break;
    }

    setLines(newLines);
  };

  if (!isOpen) return null;

  // Render Space Game Matrix
  const renderGameGrid = () => {
    const grid: string[][] = Array(12)
      .fill(null)
      .map(() => Array(10).fill("·"));

    // Put asteroids
    asteroids.forEach((ast) => {
      if (ast.y >= 0 && ast.y < 12 && ast.x >= 0 && ast.x < 10) {
        grid[ast.y][ast.x] = "☄";
      }
    });

    // Put player spaceship
    grid[11][playerX] = "▲";

    return (
      <div className="font-mono text-xs bg-black/75 p-4 border border-primary-cyan/20 rounded mb-4 max-w-sm mx-auto">
        <div className="flex justify-between text-primary-cyan mb-2 border-b border-primary-cyan/20 pb-1">
          <span>SCORE: {score}</span>
          <span className="animate-pulse">● LIVE GRID</span>
        </div>
        {grid.map((row, idx) => (
          <div key={idx} className="tracking-widest text-center">
            {row.join(" ")}
          </div>
        ))}
        <div className="flex justify-center gap-4 mt-3">
          <button
            onClick={() => setPlayerX((x) => Math.max(0, x - 1))}
            className="px-3 py-1 bg-primary-cyan/15 hover:bg-primary-cyan/30 text-primary-cyan border border-primary-cyan/30 text-[10px] rounded"
          >
            A (Left)
          </button>
          <button
            onClick={() => setPlayerX((x) => Math.min(9, x + 1))}
            className="px-3 py-1 bg-primary-cyan/15 hover:bg-primary-cyan/30 text-primary-cyan border border-primary-cyan/30 text-[10px] rounded"
          >
            D (Right)
          </button>
          <button
            onClick={() => {
              setIsGameActive(false);
              setLines((p) => [...p, { text: "Game stopped by user command.", type: "error" }]);
            }}
            className="px-3 py-1 bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/30 text-[10px] rounded"
          >
            Q (Stop)
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div
        className={`w-full max-w-4xl bg-surface-lowest border border-primary-cyan/30 rounded flex flex-col overflow-hidden relative shadow-[0_0_35px_rgba(76,215,246,0.15)] transition-all ${
          isFullscreen ? "h-[90vh]" : "h-[620px]"
        }`}
      >
        {isMatrixActive && (
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40 z-0" />
        )}

        {/* Top Header Controls bar */}
        <div className="bg-surface-high border-b border-primary-cyan/10 px-4 py-2 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-primary-cyan animate-pulse" />
            <span className="font-mono text-xs text-primary-cyan tracking-wider font-semibold">
              sys@sekhukhumpat.dev:~$ (SynthShell OS Terminal v1.0)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 hover:bg-white/10 rounded text-text-secondary hover:text-white transition-colors"
              title={isFullscreen ? "Minimize View" : "Maximize view"}
            >
              {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-red-500/20 rounded text-text-secondary hover:text-red-400 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Console Readout list */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs md:text-sm space-y-2 z-10 bg-black/70 custom-scrollbar relative">
          <div className="absolute top-2 right-2 flex items-center gap-2 text-[10px] text-primary-cyan/40 select-none">
            <Monitor size={10} />
            <span>Interactive Terminal Mode</span>
          </div>
          
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap leading-relaxed ${
                line.type === "input"
                  ? "text-white font-medium"
                  : line.type === "error"
                  ? "text-red-400"
                  : line.type === "success"
                  ? "text-primary-cyan glow-cyan"
                  : line.type === "info"
                  ? "text-secondary font-semibold"
                  : "text-text-secondary"
              }`}
            >
              {line.text}
            </div>
          ))}

          {isGameActive && renderGameGrid()}

          {gameOver && (
            <div className="text-center p-3 bg-red-500/10 border border-red-500/20 rounded max-w-sm mx-auto my-3">
              <div className="text-red-400 font-bold tracking-widest text-sm mb-1 flex items-center justify-center gap-1">
                <ShieldAlert size={14} /> COLLISION IMPACTED!
              </div>
              <p className="font-mono text-[11px] text-text-primary mb-2">
                Asteroid damaged critical spaceship thrusters.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleExecuteCommand("game")}
                  className="px-3 py-1 bg-primary-cyan/25 hover:bg-primary-cyan/40 border border-primary-cyan/40 text-primary-cyan text-[11px] rounded transition-colors"
                >
                  Reinstate Ship (Restart)
                </button>
                <button
                  onClick={() => setGameOver(false)}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[11px] rounded transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>

        {/* Input prompt line */}
        <div className="p-3 bg-black border-t border-primary-cyan/15 flex items-center gap-2 z-10">
          <span className="font-mono text-xs text-primary-cyan select-none">
            sys@sekhukhumpat.dev:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-white font-mono text-xs md:text-sm caret-primary-cyan"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={isGameActive ? "Press A/D to steer, Q to quit" : "Type command (help, skills, about, neofetch, game)..."}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
