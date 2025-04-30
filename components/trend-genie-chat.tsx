"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DomainSelector from "./domain-selector"
import ChatMessage from "./chat-message"
import Header from "./header"
import TrendingTopics from "./trending-topics"
import WelcomeScreen from "./welcome-screen"

type Domain = "engineering" | "industrial" | "marketing" | "general"

type Message = {
  role: "user" | "assistant"
  content: string
  domain: Domain
  timestamp: Date
}

export default function TrendGenieChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDomain, setSelectedDomain] = useState<Domain>("general")
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    // Add initial welcome message after a short delay for animation
    const timer = setTimeout(() => {
      if (messages.length === 0) {
        setMessages([
          {
            role: "assistant",
            content:
              "Hello! I'm Trend Genie, your AI assistant for trend analysis and innovative solutions. Select a domain and ask me anything!",
            domain: "general",
            timestamp: new Date(),
          },
        ])
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [messages.length])

  const handleSend = async () => {
    if (input.trim() === "") return

    setShowWelcome(false)

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
      const responses: Record<Domain, string> = {
        engineering: `Based on current engineering and technology trends, ${input} relates to advancements in AI, quantum computing, and sustainable tech. 

According to GitHub Trending and IEEE Xplore data:
• 73% of tech companies are investing in AI/ML infrastructure
• Quantum computing startups received $1.2B in funding last quarter
• Sustainable tech solutions grew by 28% year-over-year

Innovative solutions in this space include decentralized systems, edge computing, and carbon-neutral technologies.`,
        industrial: `In the industrial domain, ${input} connects to Industry 4.0, smart manufacturing, and supply chain optimization. 

Recent IndustryWeek insights show:
• IoT sensor deployment increased 42% in manufacturing
• Digital twin technology adoption rose by 36% 
• Predictive maintenance reduced downtime by an average of 27%

Companies are implementing IoT sensors, digital twins, and predictive maintenance to address these challenges.`,
        marketing: `Current marketing trends related to ${input} show a shift toward personalized experiences, content-driven strategies, and data privacy compliance. 

Google Trends and NewsAPI data indicates:
• Video content engagement is up 67% across platforms
• First-party data collection strategies increased by 48%
• AI-powered personalization improved conversion rates by 31%

Successful approaches include omnichannel marketing, micro-influencers, and AI-powered customer segmentation.`,
        general: `Regarding ${input}, I can suggest several innovative approaches based on cross-platform analysis:

1) Implement cross-functional teams to break down silos
2) Adopt agile methodologies for faster iteration
3) Leverage data analytics for evidence-based decision making
4) Explore partnerships with startups for fresh perspectives

Recent StackExchange and Reddit discussions highlight these as key factors in successful innovation strategies.`,
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: responses[selectedDomain],
        domain: selectedDomain,
        timestamp: new Date(),
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

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <DomainSelector selectedDomain={selectedDomain} onSelectDomain={setSelectedDomain} />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent">
            {showWelcome && messages.length === 0 ? (
              <WelcomeScreen onSelectDomain={setSelectedDomain} setShowWelcome={setShowWelcome} />
            ) : (
              <div className="space-y-4 pb-20">
                {messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
                {isLoading && (
                  <div className="ml-auto max-w-[80%] rounded-2xl bg-gradient-to-r from-cyan-900 to-blue-900 p-4 shadow-lg shadow-cyan-900/20">
                    <div className="flex items-center space-x-3">
                      <Sparkles className="h-5 w-5 text-cyan-400" />
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
                        <div
                          className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-cyan-300">Analyzing trends...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="relative border-t border-blue-900/50 bg-gray-950/80 backdrop-blur-md">
            <TrendingTopics domain={selectedDomain} />
            <div className="p-4">
              <div className="flex items-center space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ask about ${selectedDomain} trends...`}
                  className="flex-1 rounded-xl border-blue-800/50 bg-gray-900/80 py-6 text-white backdrop-blur-sm placeholder:text-gray-400 focus-visible:ring-cyan-500"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-900/30 transition-all hover:shadow-blue-500/20 hover:brightness-110"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
