import TrendGenieDashboard from "@/components/trend-genie-dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trend Genie - AI-Powered Trend Analysis & Innovation",
  description: "Get insights and innovative solutions across engineering, industrial, marketing, and general domains",
}

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-auto">
      <TrendGenieDashboard />
    </div>
  )
}
