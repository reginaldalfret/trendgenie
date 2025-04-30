"use client"

import { useState } from "react"
import Header from "./header"
import DomainSelector from "./domain-selector"
import ChatInterface from "./chat-interface"
import TrendVisualization from "./trend-visualization"
import CollaborationPanel from "./collaboration-panel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, MessageSquare, BarChart2, Users, Lightbulb } from "lucide-react"

type Domain = "engineering" | "industrial" | "marketing" | "general"

export default function TrendGenieDashboard() {
  const [selectedDomain, setSelectedDomain] = useState<Domain>("engineering")
  const [activeTab, setActiveTab] = useState<string>("chat")

  return (
    <div className="flex min-h-screen w-full flex-col bg-navy text-white overflow-auto">
      <Header />
      <div className="flex flex-1 overflow-auto">
        <DomainSelector selectedDomain={selectedDomain} onSelectDomain={setSelectedDomain} />
        <div className="flex flex-1 flex-col overflow-auto">
          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="flex h-full flex-col">
            <div className="sticky top-0 z-10 border-b border-matte/20 bg-navy-light/30 px-4 backdrop-blur-md">
              <TabsList className="h-16 w-full justify-start gap-2 bg-transparent">
                <TabsTrigger
                  value="chat"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-aqua/20 data-[state=active]:to-neon-blue/20 data-[state=active]:text-aqua"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger
                  value="trends"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-aqua/20 data-[state=active]:to-neon-blue/20 data-[state=active]:text-aqua"
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Trend Visualization
                </TabsTrigger>
                <TabsTrigger
                  value="collaborate"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-aqua/20 data-[state=active]:to-neon-blue/20 data-[state=active]:text-aqua"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Collaboration
                </TabsTrigger>
                <TabsTrigger
                  value="innovation"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-aqua/20 data-[state=active]:to-neon-blue/20 data-[state=active]:text-aqua"
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Innovation Lab
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="chat"
              className="flex-1 overflow-auto data-[state=active]:flex data-[state=active]:flex-col"
            >
              <ChatInterface selectedDomain={selectedDomain} />
            </TabsContent>

            <TabsContent value="trends" className="flex-1 overflow-auto p-0 data-[state=active]:flex">
              <TrendVisualization domain={selectedDomain} />
            </TabsContent>

            <TabsContent value="collaborate" className="flex-1 overflow-auto p-0 data-[state=active]:flex">
              <CollaborationPanel domain={selectedDomain} />
            </TabsContent>

            <TabsContent value="innovation" className="flex-1 overflow-auto p-0 data-[state=active]:flex">
              <InnovationLab domain={selectedDomain} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function InnovationLab({ domain }: { domain: Domain }) {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-aqua to-neon-blue">
          Innovation Lab
        </h2>
        <p className="text-gray-300">Generate and evaluate innovative ideas based on current trends</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-matte/20 bg-navy-light/30 p-6 backdrop-blur-md">
          <h3 className="mb-4 flex items-center text-xl font-semibold text-aqua">
            <Sparkles className="mr-2 h-5 w-5" />
            Idea Generator
          </h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-navy-dark p-4">
              <h4 className="mb-2 font-medium text-neon-blue">Problem Statement</h4>
              <textarea
                className="w-full rounded-lg border border-matte/20 bg-navy p-3 text-white placeholder:text-gray-500 focus:border-aqua focus:outline-none focus:ring-1 focus:ring-aqua"
                rows={3}
                placeholder="Describe the problem you're trying to solve..."
              ></textarea>
            </div>

            <div className="rounded-lg bg-navy-dark p-4">
              <h4 className="mb-2 font-medium text-neon-blue">Parameters</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm text-gray-300">Industry</label>
                  <select className="w-full rounded-lg border border-matte/20 bg-navy p-2 text-white focus:border-aqua focus:outline-none">
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Education</option>
                    <option>Manufacturing</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-300">Time Horizon</label>
                  <select className="w-full rounded-lg border border-matte/20 bg-navy p-2 text-white focus:border-aqua focus:outline-none">
                    <option>Near-term (1-2 years)</option>
                    <option>Mid-term (3-5 years)</option>
                    <option>Long-term (5+ years)</option>
                  </select>
                </div>
              </div>
            </div>

            <button className="w-full rounded-lg bg-gradient-to-r from-aqua to-neon-blue p-3 font-medium text-navy transition-all hover:brightness-110">
              Generate Ideas
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-matte/20 bg-navy-light/30 p-6 backdrop-blur-md">
          <h3 className="mb-4 flex items-center text-xl font-semibold text-aqua">
            <BarChart2 className="mr-2 h-5 w-5" />
            Innovation Score
          </h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-navy-dark p-4">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-medium text-white">Modular Solar Grids for Urban Areas</h4>
                <span className="rounded-full bg-aqua/20 px-3 py-1 text-sm font-medium text-aqua">87/100</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-gray-300">Feasibility</span>
                    <span className="text-sm font-medium text-aqua">82%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-navy">
                    <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-aqua to-neon-blue"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-gray-300">Novelty</span>
                    <span className="text-sm font-medium text-aqua">91%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-navy">
                    <div className="h-full w-[91%] rounded-full bg-gradient-to-r from-aqua to-neon-blue"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-gray-300">Market Potential</span>
                    <span className="text-sm font-medium text-aqua">88%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-navy">
                    <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-aqua to-neon-blue"></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-aqua/20 bg-navy p-3">
                <h5 className="mb-2 text-sm font-medium text-neon-blue">AI Feedback</h5>
                <p className="text-sm text-gray-300">
                  This idea combines renewable energy with urban planning effectively. Consider addressing energy
                  storage challenges and regulatory hurdles for implementation.
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <button className="rounded-lg border border-matte/20 bg-navy px-4 py-2 text-sm text-white transition-all hover:border-aqua hover:text-aqua">
                Save Idea
              </button>
              <button className="rounded-lg border border-matte/20 bg-navy px-4 py-2 text-sm text-white transition-all hover:border-aqua hover:text-aqua">
                Share with Team
              </button>
              <button className="rounded-lg border border-matte/20 bg-navy px-4 py-2 text-sm text-white transition-all hover:border-aqua hover:text-aqua">
                Refine Idea
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
