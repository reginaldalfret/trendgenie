"use client"

import { Cpu, Factory, TrendingUp, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

type Domain = "engineering" | "industrial" | "marketing" | "general"

interface WelcomeScreenProps {
  onSelectDomain: (domain: Domain) => void
  setShowWelcome: (show: boolean) => void
}

const domains = [
  {
    id: "engineering",
    name: "Engineering & Technology",
    icon: Cpu,
    color: "from-blue-600 to-blue-800",
    description: "Discover emerging technologies and engineering breakthroughs",
  },
  {
    id: "industrial",
    name: "Industrial",
    icon: Factory,
    color: "from-cyan-600 to-cyan-800",
    description: "Explore manufacturing and industrial innovation trends",
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-700",
    description: "Analyze digital marketing strategies and consumer behavior",
  },
  {
    id: "general",
    name: "General",
    icon: Globe,
    color: "from-cyan-500 to-blue-700",
    description: "Get insights on broad topics and cross-domain trends",
  },
] as const

export default function WelcomeScreen({ onSelectDomain, setShowWelcome }: WelcomeScreenProps) {
  const handleSelectDomain = (domain: Domain) => {
    onSelectDomain(domain)
    setShowWelcome(false)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          Welcome to Trend Genie
        </h1>
        <p className="mt-2 text-lg text-blue-200">
          Your AI-powered assistant for trend analysis and innovative solutions
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2"
      >
        {domains.map((domain) => {
          const Icon = domain.icon
          return (
            <motion.div key={domain.id} variants={item}>
              <Button
                onClick={() => handleSelectDomain(domain.id as Domain)}
                className={`group relative h-auto w-full justify-start overflow-hidden rounded-xl border border-blue-900/20 bg-gradient-to-r ${domain.color} p-6 text-left shadow-lg transition-all duration-300 hover:shadow-cyan-900/20`}
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-3xl filter group-hover:bg-white/20"></div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black/30 backdrop-blur-sm">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{domain.name}</h3>
                    <p className="mt-1 text-sm text-blue-100/80">{domain.description}</p>
                    <div className="mt-4 flex items-center text-sm font-medium text-cyan-300">
                      <span>Explore domain</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Button>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 rounded-xl border border-blue-900/20 bg-black/30 p-4 text-center backdrop-blur-sm"
      >
        <p className="text-sm text-blue-200">
          Trend Genie analyzes millions of data points from GitHub, IEEE, IndustryWeek, Google Trends, and more to
          provide you with the most accurate and up-to-date insights.
        </p>
      </motion.div>
    </div>
  )
}
