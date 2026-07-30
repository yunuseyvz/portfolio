export interface LabExperiment {
  id: string;
  title: string;
  description: string;
  takeaway?: string;
  tags: string[];
  year: number | string;
  links?: { label: string; href: string }[];
}

export const EXPERIMENTS: LabExperiment[] = [
  {
    id: "ai-landline-assistant",
    title: "AI Phone Assistant",
    year: "2026",
    description:
      "Interfaced an idle home landline PSTN/VoIP number with Asterisk PBX + Dograh hosted on my VPS, routing incoming calls directly to OpenAI Realtime API for low-latency conversational voice interactions.",
    takeaway:
      "Benchmarked a fully self-hosted STT (Whisper) and TTS (Piper/Coqui) pipeline before adopting OpenAI Realtime. Worked better than expected but required significant optimization. With more efficient CPU only TTS models, this could actually become viable and make AI phone assistants more accessible.",
    tags: ["Asterisk", "Dograh", "OpenAI Realtime API", "VoIP", "Python", "Docker", "VPS"],
  },
  {
    id: "business-ai-automation",
    title: "Business AI Automation & RAG Platform",
    year: "2026",
    description:
      "Built a full document automation system for my families business featuring a RAG assistant for internal operational documents and automatic invoice OCR scanning.",
    takeaway:
      "Combined OCR with structured LLM JSON outputs to reliably extract line items, totals, and due dates across non-standard invoice formats. Works really well but still requires some human oversight for edge cases.",
    tags: ["Python", "RAG", "Vector DB", "OCR", "LLM APIs", "Document Processing", "Automation"],
  },
  {
    id: "tailscale-vps-mesh",
    title: "Multi-Node VPS Mesh Network",
    year: "2026",
    description:
      "Connected multiple cloud VPS servers across providers into a unified, secure overlay network using Tailscale.",
    takeaway:
      "Eliminated open SSH ports on public IPs & simplified internal service discovery. Highly recommended for anyone running multiple VPS servers or self-hosted services across providers.",
    tags: ["Tailscale", "WireGuard", "Linux", "VPS", "Networking", "Security", "Self-Host"],
  },
  {
    id: "opencode-vps-agent",
    title: "Self-Hosted OpenCode Remote Coding Agent",
    year: "2026",
    description:
      "Deployed OpenCode on a VPS to establish a machine-independent, persistent agentic development environment accessible remotely.",
    takeaway:
      "Enables continuous, long-running agentic coding tasks and terminal pairing sessions without relying on local hardware. This approach is particularly useful for developers who need to maintain a consistent development environment across different machines. Also permanently fixes the close-lid sleep issue while a session is active.",
    tags: ["OpenCode", "Agentic AI", "VPS", "Docker", "Linux", "DevOps"],
  },
];

export function getExperiments(): LabExperiment[] {
  return EXPERIMENTS;
}
