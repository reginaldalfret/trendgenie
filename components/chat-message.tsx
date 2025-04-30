import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Cpu, Factory, TrendingUp, Globe, Sparkles } from "lucide-react"
import { format } from "date-fns"

type Domain = "engineering" | "industrial" | "marketing" | "general"

type Message = {
  role: "user" | "assistant"
  content: string
  domain: Domain
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  const domainIcons = {
    engineering: Cpu,
    industrial: Factory,
    marketing: TrendingUp,
    general: Globe,
  }

  const domainColors = {
    engineering: "from-blue-600 to-blue-800",
    industrial: "from-cyan-600 to-cyan-800",
    marketing: "from-blue-500 to-cyan-700",
    general: "from-cyan-500 to-blue-700",
  }

  const DomainIcon = domainIcons[message.domain]

  return (
    <div className={cn("group mb-4 flex animate-fadeIn items-start gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar
          className={cn(
            "h-10 w-10 rounded-xl border border-blue-500/20 bg-gradient-to-br shadow-lg",
            domainColors[message.domain],
          )}
        >
          <div className="flex h-full w-full items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
        </Avatar>
      )}
      <div
        className={cn(
          "relative max-w-[85%] space-y-1 rounded-2xl p-4 shadow-lg",
          isUser
            ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white"
            : "bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100",
          !isUser && "border border-blue-900/30",
        )}
      >
        {!isUser && (
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Trend Genie
              </span>
              <div className="flex h-5 items-center rounded-full bg-black/30 px-2 text-xs text-cyan-400 backdrop-blur-sm">
                <DomainIcon className="mr-1 h-3 w-3" />
                {message.domain.charAt(0).toUpperCase() + message.domain.slice(1)}
              </div>
            </div>
            <span className="text-xs text-gray-400">{format(message.timestamp, "h:mm a")}</span>
          </div>
        )}
        <div className="whitespace-pre-line text-sm">{message.content}</div>
        {isUser && <div className="mt-1 text-right text-xs text-blue-200">{format(message.timestamp, "h:mm a")}</div>}
      </div>
      {isUser && (
        <Avatar className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg">
          <span className="text-xs font-bold text-white">You</span>
        </Avatar>
      )}
    </div>
  )
}
