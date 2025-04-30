"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Info, Download, Copy, ThumbsUp, ThumbsDown, BarChart2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

type Domain = "engineering" | "industrial" | "marketing" | "general"

type Message = {
  role: "user" | "assistant"
  content: string
  domain: Domain
  timestamp: Date
  sources?: {
    name: string
    confidence: number
    url?: string
  }[]
  ethicalFlags?: {
    type: string
    description: string
  }[]
}

interface ChatInterfaceProps {
  selectedDomain: Domain
}

const domainIcons = {
  engineering: <Zap className="h-4 w-4" />,
  industrial: <BarChart2 className="h-4 w-4" />,
  marketing: <BarChart2 className="h-4 w-4" />,
  general: <Sparkles className="h-4 w-4" />,
}

const quickActions = {
  engineering: [
    "Analyze emerging tech trends",
    "Generate project ideas",
    "Compare technologies",
    "Predict tech adoption rates",
  ],
  industrial: [
    "Analyze manufacturing trends",
    "Optimize supply chain",
    "Predict material costs",
    "Industry 4.0 implementation",
  ],
  marketing: [
    "Analyze consumer behavior",
    "Content strategy recommendations",
    "Social media trend analysis",
    "Campaign performance prediction",
  ],
  general: [
    "Cross-domain trend analysis",
    "Innovation opportunities",
    "Market gap identification",
    "Future scenario planning",
  ],
}

export default function ChatInterface({ selectedDomain }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Trend Genie, your AI assistant for trend analysis and innovative solutions. How can I help you today?",
      domain: "general",
      timestamp: new Date(),
      sources: [
        { name: "Trend Genie Knowledge Base", confidence: 100 },
        { name: "Real-time Data Processing", confidence: 98 },
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSources, setShowSources] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = async () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      domain: selectedDomain,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<
        Domain,
        { content: string; sources: Message["sources"]; ethicalFlags?: Message["ethicalFlags"] }
      > = {
        engineering: {
          content: `Based on current engineering and technology trends, ${input} relates to advancements in AI, quantum computing, and sustainable tech.

According to our analysis of recent publications and repositories:

• 73% of tech companies are investing in AI/ML infrastructure
• Quantum computing startups received $1.2B in funding last quarter
• Sustainable tech solutions grew by 28% year-over-year

**Prediction (6-12 months):**
Edge computing adoption will accelerate by 47% as IoT deployments expand, with particular growth in smart city applications and autonomous systems.

**Innovative Solutions:**
1. Decentralized edge computing networks with blockchain verification
2. Quantum-resistant encryption protocols for critical infrastructure
3. Carbon-neutral data centers using AI-optimized cooling systems`,
          sources: [
            { name: "GitHub Trending Repositories", confidence: 92 },
            { name: "ArXiv Papers (Last 30 days)", confidence: 89 },
            { name: "IEEE Xplore Database", confidence: 94 },
            { name: "Google Scholar Citations", confidence: 87 },
          ],
        },
        industrial: {
          content: `In the industrial domain, ${input} connects to Industry 4.0, smart manufacturing, and supply chain optimization.

Based on our analysis of industrial reports and IoT sensor data:

• IoT sensor deployment increased 42% in manufacturing facilities
• Digital twin technology adoption rose by 36% across industrial sectors
• Predictive maintenance reduced downtime by an average of 27%

**Prediction (6-12 months):**
Supply chain resilience will become the top priority, with 68% of manufacturers implementing AI-driven forecasting and 53% adopting blockchain for traceability.

**Innovative Solutions:**
1. Decentralized manufacturing networks with real-time capacity sharing
2. AI-powered predictive maintenance systems with 94% accuracy
3. Blockchain-based supply chain verification with carbon footprint tracking`,
          sources: [
            { name: "Statista Industry Reports", confidence: 91 },
            { name: "McKinsey Global Institute", confidence: 95 },
            { name: "IoT Analytics Platform", confidence: 88 },
            { name: "Industrial Patent Database", confidence: 93 },
          ],
        },
        marketing: {
          content: `Current marketing trends related to ${input} show a shift toward personalized experiences, content-driven strategies, and data privacy compliance.

Our analysis of consumer behavior and platform metrics indicates:

• Video content engagement is up 67% across platforms
• First-party data collection strategies increased by 48%
• AI-powered personalization improved conversion rates by 31%

**Prediction (6-12 months):**
Immersive marketing experiences using AR/VR will grow by 78%, with particular emphasis on virtual product trials and interactive storytelling.

**Innovative Strategies:**
1. Omnichannel marketing with AI-driven personalization across touchpoints
2. Micro-influencer collaborations with blockchain-verified engagement metrics
3. Zero-party data collection through gamified interactive experiences`,
          sources: [
            { name: "Google Trends Analysis", confidence: 96 },
            { name: "Social Blade Metrics", confidence: 89 },
            { name: "Twitter API Sentiment Analysis", confidence: 87 },
            { name: "Reddit Trend Tracking", confidence: 84 },
          ],
          ethicalFlags: [
            {
              type: "Privacy Concern",
              description:
                "Some personalization strategies may raise consumer privacy concerns. Consider transparent opt-in approaches.",
            },
          ],
        },
        general: {
          content: `Regarding ${input}, I can suggest several innovative approaches based on cross-platform analysis:

Our synthesis of trends across multiple domains reveals:

• 64% of successful innovations combine technologies from different fields
• Cross-functional teams produce 37% more viable solutions than siloed teams
• Data-driven decision making improves outcome success rates by 43%

**Prediction (6-12 months):**
We'll see increased convergence between physical and digital experiences, with 58% of consumers expecting seamless integration across all touchpoints.

**Recommended Approaches:**
1. Implement cross-functional teams to break down silos
2. Adopt agile methodologies for faster iteration and validation
3. Leverage data analytics for evidence-based decision making
4. Explore partnerships with startups for fresh perspectives`,
          sources: [
            { name: "Wikipedia Current Events", confidence: 82 },
            { name: "Google News Aggregation", confidence: 88 },
            { name: "Wolfram Alpha Computation", confidence: 93 },
            { name: "StackExchange Discussions", confidence: 85 },
          ],
        },
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: responses[selectedDomain].content,
        domain: selectedDomain,
        timestamp: new Date(),
        sources: responses[selectedDomain].sources,
        ethicalFlags: responses[selectedDomain].ethicalFlags,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickAction = (action: string) => {
    setInput(action)
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-aqua/30 scrollbar-track-transparent">
        <div className="space-y-6 pb-20">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "group animate-fadeIn flex items-start gap-3",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {message.role === "assistant" && (
                <Avatar className="h-10 w-10 rounded-xl border border-aqua/20 bg-gradient-to-br from-aqua/20 to-neon-blue/20 shadow-lg">
                  <div className="flex h-full w-full items-center justify-center">
                    <Sparkles className="h-5 w-5 text-aqua" />
                  </div>
                </Avatar>
              )}
              <div
                className={cn(
                  "relative max-w-[85%] space-y-1 rounded-2xl p-4 shadow-lg",
                  message.role === "user"
                    ? "bg-gradient-to-r from-neon-blue to-aqua text-navy-dark"
                    : "border border-matte/20 bg-navy-light text-gray-100",
                )}
              >
                {message.role === "assistant" && (
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-aqua to-neon-blue">
                        Trend Genie
                      </span>
                      <div className="flex h-5 items-center rounded-full bg-navy px-2 text-xs text-aqua">
                        {domainIcons[message.domain]}
                        <span className="ml-1 capitalize">{message.domain}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{format(message.timestamp, "h:mm a")}</span>
                  </div>
                )}
                <div className="whitespace-pre-line text-sm">{message.content}</div>

                {message.role === "assistant" && message.sources && showSources && (
                  <div className="mt-4 rounded-lg border border-matte/20 bg-navy p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center text-xs font-medium text-aqua">
                        <Info className="mr-1 h-3 w-3" />
                        Sources & Confidence
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 rounded-full p-0 text-gray-400 hover:bg-navy-light hover:text-aqua"
                              onClick={() => setShowSources(!showSources)}
                            >
                              <Info className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="border-matte/20 bg-navy text-white">
                            <p className="text-xs">Toggle source visibility</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="space-y-2">
                      {message.sources.map((source, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-gray-300">{source.name}</span>
                          <Badge
                            variant="outline"
                            className={cn(
                              "border-0 text-white",
                              source.confidence > 90
                                ? "bg-green-600/30"
                                : source.confidence > 80
                                  ? "bg-yellow-600/30"
                                  : "bg-orange-600/30",
                            )}
                          >
                            {source.confidence}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {message.role === "assistant" && message.ethicalFlags && (
                  <div className="mt-3 rounded-lg border border-yellow-600/30 bg-yellow-900/10 p-3">
                    <div className="flex items-center text-xs font-medium text-yellow-400">
                      <Info className="mr-1 h-3 w-3" />
                      Ethical Considerations
                    </div>
                    <div className="mt-1 space-y-1">
                      {message.ethicalFlags.map((flag, idx) => (
                        <div key={idx} className="text-xs text-yellow-200">
                          <span className="font-medium">{flag.type}:</span> {flag.description}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {message.role === "assistant" && (
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex space-x-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 rounded-full p-0 text-gray-400 hover:bg-navy hover:text-aqua"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="border-matte/20 bg-navy text-white">
                            <p className="text-xs">Copy to clipboard</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 rounded-full p-0 text-gray-400 hover:bg-navy hover:text-aqua"
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="border-matte/20 bg-navy text-white">
                            <p className="text-xs">Download as PDF</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="flex space-x-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 rounded-full p-0 text-gray-400 hover:bg-navy hover:text-green-400"
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="border-matte/20 bg-navy text-white">
                            <p className="text-xs">Helpful response</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 rounded-full p-0 text-gray-400 hover:bg-navy hover:text-red-400"
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="border-matte/20 bg-navy text-white">
                            <p className="text-xs">Unhelpful response</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                )}

                {message.role === "user" && (
                  <div className="mt-1 text-right text-xs text-navy-dark/70">{format(message.timestamp, "h:mm a")}</div>
                )}
              </div>
              {message.role === "user" && (
                <Avatar className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg">
                  <span className="text-xs font-bold text-white">You</span>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="ml-12 max-w-[85%] rounded-2xl border border-matte/20 bg-navy-light p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <Sparkles className="h-5 w-5 text-aqua" />
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-aqua"></div>
                  <div className="h-2 w-2 animate-pulse rounded-full bg-aqua" style={{ animationDelay: "0.2s" }}></div>
                  <div className="h-2 w-2 animate-pulse rounded-full bg-aqua" style={{ animationDelay: "0.4s" }}></div>
                </div>
                <span className="text-sm text-aqua">Analyzing trends and generating insights...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-matte/20 bg-navy-dark/80 backdrop-blur-md">
        <div className="mx-auto max-w-4xl p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {quickActions[selectedDomain].map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className="rounded-full border border-matte/20 bg-navy-light px-3 py-1 text-xs text-gray-300 transition-all hover:border-aqua/30 hover:bg-navy hover:text-aqua"
              >
                {action}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask about ${selectedDomain} trends...`}
              className="flex-1 rounded-xl border-matte/20 bg-navy py-6 text-white placeholder:text-gray-500 focus-visible:border-aqua focus-visible:ring-aqua"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="h-12 w-12 rounded-xl bg-gradient-to-r from-aqua to-neon-blue shadow-lg shadow-aqua/20 transition-all hover:shadow-aqua/30 hover:brightness-110"
            >
              <Send className="h-5 w-5 text-navy-dark" />
            </Button>
          </div>
          <div className="mt-2 text-center text-xs text-gray-500">
            Trend Genie analyzes data from multiple sources to provide insights. Results may vary based on available
            data.
          </div>
        </div>
      </div>
    </div>
  )
}
