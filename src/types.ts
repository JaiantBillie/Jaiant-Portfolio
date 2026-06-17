export interface Project {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  techStack: string[];
  details: string;
  architecture: string[];
}

export interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "info";
}
