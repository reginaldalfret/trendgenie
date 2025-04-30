"use client"

import { useEffect, useState } from "react"
import { TrendingUp, ArrowUp } from "lucide-react"

type Domain = "engineering" | "industrial" | "marketing" | "general"

interface TrendingTopicsProps {
  domain: Domain
}

const domainTopics: Record<Domain, string[]> = {
  engineering: ["Quantum Computing", "Edge AI", "Sustainable Tech", "Web3 Infrastructure", "Robotics"],
  industrial: [
    "Digital Twins",
    "Smart Manufacturing",
    "Supply Chain Optimization",
    "Predictive Maintenance",
    "Green Manufacturing",
  ],
  marketing: ["AI Content Creation", "Zero-Party Data", "Social Commerce", "Voice Search", "Immersive Experiences"],
  general: ["Remote Collaboration", "Sustainability", "Mental Health Tech", "No-Code Tools", "Personalization"],
}

export default function TrendingTopics({ domain }: TrendingTopicsProps) {
  const [topics, setTopics] = useState<string[]>([])

  useEffect(() => {
    setTopics(domainTopics[domain])
  }, [domain])

  return (
    <div className="border-b border-blue-900/20 bg-black/20 px-4 py-2 backdrop-blur-sm">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 text-xs font-medium text-cyan-400">
          <TrendingUp className="h-3 w-3" />
          <span>TRENDING:</span>
        </div>
        <div className="flex gap-2">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="flex items-center gap-1 whitespace-nowrap rounded-full bg-blue-950/50 px-2 py-1 text-xs text-blue-200 backdrop-blur-sm"
            >
              {topic}
              <ArrowUp className="h-3 w-3 text-cyan-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
