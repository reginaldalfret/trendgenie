"use client"

import { useState } from "react"
import { Cpu, Factory, TrendingUp, Globe, Zap, BarChart3, Users, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type Domain = "engineering" | "industrial" | "marketing" | "general"

interface DomainSelectorProps {
  selectedDomain: Domain
  onSelectDomain: (domain: Domain) => void
}

const domains = [
  {
    id: "engineering",
    name: "Engineering & Technology",
    icon: Cpu,
    color: "from-aqua to-neon-blue",
    hoverColor: "from-aqua/80 to-neon-blue/80",
    activeColor: "from-aqua/70 to-neon-blue/70",
    description: "Analyze trends in engineering and technology",
    stats: {
      growth: "+24%",
      activity: "Very High",
    },
    sources: ["GitHub", "ArXiv", "IEEE Xplore", "Google Scholar"],
    subIcons: [Zap],
  },
  {
    id: "industrial",
    name: "Industrial",
    icon: Factory,
    color: "from-aqua to-neon-blue",
    hoverColor: "from-aqua/80 to-neon-blue/80",
    activeColor: "from-aqua/70 to-neon-blue/70",
    description: "Explore industrial domain trends",
    stats: {
      growth: "+18%",
      activity: "High",
    },
    sources: ["Statista", "McKinsey", "IoT Sensors", "Patent DB"],
    subIcons: [BarChart3],
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: TrendingUp,
    color: "from-aqua to-neon-blue",
    hoverColor: "from-aqua/80 to-neon-blue/80",
    activeColor: "from-aqua/70 to-neon-blue/70",
    description: "Discover marketing trends and strategies",
    stats: {
      growth: "+31%",
      activity: "Very High",
    },
    sources: ["Google Trends", "Social Blade", "Twitter API", "Reddit API"],
    subIcons: [Users],
  },
  {
    id: "general",
    name: "General",
    icon: Globe,
    color: "from-aqua to-neon-blue",
    hoverColor: "from-aqua/80 to-neon-blue/80",
    activeColor: "from-aqua/70 to-neon-blue/70",
    description: "Get solutions for general topics",
    stats: {
      growth: "+22%",
      activity: "Medium",
    },
    sources: ["Wikipedia", "Google News", "Wolfram Alpha", "StackExchange"],
    subIcons: [Lightbulb],
  },
] as const

export default function DomainSelector({ selectedDomain, onSelectDomain }: DomainSelectorProps) {
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null)

  return (
    <div className="hidden w-80 flex-col border-r border-matte/20 bg-navy-dark/80 p-4 backdrop-blur-md md:flex">
      <h2 className="mb-6 text-center text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-aqua to-neon-blue">
        Knowledge Domains
      </h2>
      <div className="space-y-4">
        {domains.map((domain) => {
          const Icon = domain.icon
          const SubIcon = domain.subIcons[0]
          const isSelected = selectedDomain === domain.id
          const isHovered = hoveredDomain === domain.id

          return (
            <button
              key={domain.id}
              onClick={() => onSelectDomain(domain.id as Domain)}
              onMouseEnter={() => setHoveredDomain(domain.id)}
              onMouseLeave={() => setHoveredDomain(null)}
              className={cn(
                "group relative w-full overflow-hidden rounded-xl p-4 text-left transition-all duration-300",
                "border shadow-lg",
                isSelected
                  ? `border-aqua/30 bg-navy-light shadow-aqua/10`
                  : isHovered
                    ? `border-matte/30 bg-navy-light/50 shadow-aqua/5`
                    : `border-matte/20 bg-navy-light/30 shadow-none`,
              )}
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-aqua/5 blur-2xl filter group-hover:bg-aqua/10"></div>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      "bg-gradient-to-br",
                      domain.color,
                    )}
                  >
                    <Icon className="h-5 w-5 text-navy-dark" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{domain.name}</div>
                    <div className="text-xs text-gray-400">{domain.description}</div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 text-aqua">
                  <SubIcon className="h-3 w-3" />
                  <span>Growth: {domain.stats.growth}</span>
                </div>
                <Badge variant="outline" className="border-aqua/30 bg-navy text-aqua">
                  {domain.stats.activity}
                </Badge>
              </div>

              <div className="mt-3">
                <div className="text-xs text-gray-400">Data Sources:</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {domain.sources.map((source, index) => (
                    <span key={index} className="inline-flex rounded-full bg-navy px-2 py-0.5 text-xs text-gray-300">
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-auto pt-6">
        <div className="rounded-xl border border-matte/20 bg-navy-light/30 p-4">
          <h3 className="mb-2 text-sm font-medium text-aqua">Predictive Trend Engine</h3>
          <p className="text-xs text-gray-400">
            Our AI analyzes millions of data points daily across all domains to identify emerging patterns and forecast
            trends 6-12 months ahead.
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-navy">
            <div className="h-full w-3/4 animate-pulse rounded-full bg-gradient-to-r from-aqua to-neon-blue"></div>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-gray-400">Processing data...</span>
            <span className="text-aqua">76%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
