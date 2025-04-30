import { Sparkles, Menu, Bell, User, Settings, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-matte/20 bg-navy-dark/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-navy-light hover:text-aqua md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-aqua to-neon-blue shadow-lg shadow-aqua/20">
              <Sparkles className="h-6 w-6 text-navy-dark" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-aqua to-neon-blue">
                Trend Genie
              </h1>
              <p className="text-xs text-aqua">AI-Powered Trend Analysis & Innovation</p>
            </div>
          </div>
        </div>

        <div className="hidden items-center space-x-1 rounded-full bg-navy-light/50 px-3 py-1.5 backdrop-blur-sm md:flex">
          <span className="mr-2 text-sm text-aqua">Predictive Engine Active</span>
          <div className="h-2 w-2 animate-pulse rounded-full bg-aqua"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-neon-blue" style={{ animationDelay: "0.2s" }}></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-aqua" style={{ animationDelay: "0.4s" }}></div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="hidden border-aqua/30 bg-navy-light/50 text-aqua md:flex">
            Premium
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl bg-navy-light/50 text-gray-300 backdrop-blur-sm hover:bg-navy-light hover:text-aqua"
              >
                <Bell className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 border-matte/20 bg-navy-dark text-white">
              <DropdownMenuLabel className="text-aqua">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-matte/20" />
              <DropdownMenuItem className="focus:bg-navy-light focus:text-aqua">
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">New trend detected in Engineering</span>
                  <span className="text-xs text-gray-400">Quantum computing breakthrough - 10 min ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-navy-light focus:text-aqua">
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">Team collaboration request</span>
                  <span className="text-xs text-gray-400">From Alex Chen - 1 hour ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-navy-light focus:text-aqua">
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">Innovation score updated</span>
                  <span className="text-xs text-gray-400">Your idea scored 87/100 - 3 hours ago</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-9 w-9 rounded-xl bg-gradient-to-br from-navy-light to-navy border-0 p-0">
                <Avatar className="h-full w-full rounded-xl bg-transparent">
                  <User className="h-5 w-5 text-aqua" />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-matte/20 bg-navy-dark text-white">
              <DropdownMenuLabel className="text-aqua">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-matte/20" />
              <DropdownMenuItem className="focus:bg-navy-light focus:text-aqua">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-navy-light focus:text-aqua">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-navy-light focus:text-aqua">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
