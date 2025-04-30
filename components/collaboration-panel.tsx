"use client"

import { useState } from "react"
import { Users, UserPlus, MessageSquare, GitBranch, Share2, Clock, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Domain = "engineering" | "industrial" | "marketing" | "general"

interface CollaborationPanelProps {
  domain: Domain
}

const teamMembers = [
  { id: 1, name: "Alex Chen", role: "Data Scientist", avatar: "AC", online: true },
  { id: 2, name: "Sarah Johnson", role: "UX Designer", avatar: "SJ", online: true },
  { id: 3, name: "Michael Wong", role: "Product Manager", avatar: "MW", online: false },
  { id: 4, name: "Jessica Lee", role: "Marketing Specialist", avatar: "JL", online: true },
]

const projects = [
  {
    id: 1,
    name: "Sustainable Tech Initiative",
    domain: "engineering",
    members: 4,
    lastUpdated: "2 hours ago",
    progress: 68,
  },
  {
    id: 2,
    name: "Supply Chain Optimization",
    domain: "industrial",
    members: 3,
    lastUpdated: "1 day ago",
    progress: 42,
  },
  {
    id: 3,
    name: "Immersive Marketing Campaign",
    domain: "marketing",
    members: 5,
    lastUpdated: "3 hours ago",
    progress: 75,
  },
  {
    id: 4,
    name: "Cross-Domain Innovation Lab",
    domain: "general",
    members: 6,
    lastUpdated: "Just now",
    progress: 32,
  },
]

const invitations = [
  {
    id: 1,
    from: "David Kim",
    project: "AI-Powered Predictive Maintenance",
    time: "1 hour ago",
  },
  {
    id: 2,
    from: "Emily Zhang",
    project: "Blockchain Supply Chain Tracking",
    time: "3 hours ago",
  },
]

export default function CollaborationPanel({ domain }: CollaborationPanelProps) {
  const [activeTab, setActiveTab] = useState("projects")
  const filteredProjects = domain === "general" ? projects : projects.filter((project) => project.domain === domain)

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-aqua to-neon-blue">
          Collaboration Hub
        </h2>
        <p className="text-gray-300">Work together with your team on innovative projects and ideas</p>
      </div>

      <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="mb-6 grid w-full grid-cols-3 bg-navy">
          <TabsTrigger
            value="projects"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-aqua/20 data-[state=active]:to-neon-blue/20 data-[state=active]:text-aqua"
          >
            <GitBranch className="mr-2 h-4 w-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="team"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-aqua/20 data-[state=active]:to-neon-blue/20 data-[state=active]:text-aqua"
          >
            <Users className="mr-2 h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger
            value="invites"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-aqua/20 data-[state=active]:to-neon-blue/20 data-[state=active]:text-aqua"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Invitations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Active Projects</h3>
            <Button className="bg-gradient-to-r from-aqua to-neon-blue text-navy-dark hover:brightness-110">
              <GitBranch className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-matte/20 bg-navy-light/30 p-4 backdrop-blur-md transition-all hover:border-aqua/20 hover:shadow-lg hover:shadow-aqua/5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-semibold text-white">{project.name}</h4>
                  <Badge variant="outline" className="border-aqua/30 bg-navy text-aqua">
                    {project.domain.charAt(0).toUpperCase() + project.domain.slice(1)}
                  </Badge>
                </div>

                <div className="mb-3 flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-400">
                    <Users className="mr-1 h-4 w-4" />
                    <span>{project.members} members</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{project.lastUpdated}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-aqua">{project.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-navy">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-aqua to-neon-blue"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-matte/20 bg-navy hover:border-aqua hover:text-aqua"
                  >
                    <MessageSquare className="mr-1 h-3 w-3" />
                    Chat
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-matte/20 bg-navy hover:border-aqua hover:text-aqua"
                  >
                    <Share2 className="mr-1 h-3 w-3" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-matte/20 bg-navy hover:border-aqua hover:text-aqua"
                  >
                    Open
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-matte/20 bg-navy-light/30 p-6 text-center">
              <p className="mb-3 text-gray-400">No active projects in this domain yet</p>
              <Button className="bg-gradient-to-r from-aqua to-neon-blue text-navy-dark hover:brightness-110">
                Create Your First Project
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Team Members</h3>
            <Button className="bg-gradient-to-r from-aqua to-neon-blue text-navy-dark hover:brightness-110">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </div>

          <div className="rounded-xl border border-matte/20 bg-navy-light/30 backdrop-blur-md">
            <div className="p-4">
              <Input
                placeholder="Search team members..."
                className="border-matte/20 bg-navy text-white placeholder:text-gray-500 focus-visible:border-aqua focus-visible:ring-aqua"
              />
            </div>
            <div className="divide-y divide-matte/20">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 rounded-full bg-gradient-to-br from-aqua/20 to-neon-blue/20">
                      <span className="text-sm font-medium text-white">{member.avatar}</span>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-white">{member.name}</span>
                        {member.online && <span className="ml-2 h-2 w-2 rounded-full bg-green-500"></span>}
                      </div>
                      <span className="text-sm text-gray-400">{member.role}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 rounded-full p-0 text-gray-400 hover:bg-navy hover:text-aqua"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 rounded-full p-0 text-gray-400 hover:bg-navy hover:text-aqua"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="invites" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Collaboration Invitations</h3>
            <Button className="bg-gradient-to-r from-aqua to-neon-blue text-navy-dark hover:brightness-110">
              <UserPlus className="mr-2 h-4 w-4" />
              Send Invitation
            </Button>
          </div>

          {invitations.length > 0 ? (
            <div className="rounded-xl border border-matte/20 bg-navy-light/30 backdrop-blur-md">
              <div className="divide-y divide-matte/20">
                {invitations.map((invite) => (
                  <div key={invite.id} className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <span className="font-medium text-white">{invite.from}</span>
                        <span className="text-gray-400"> invited you to </span>
                        <span className="font-medium text-white">{invite.project}</span>
                      </div>
                      <span className="text-xs text-gray-400">{invite.time}</span>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500/30 bg-navy text-red-400 hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <X className="mr-1 h-3 w-3" />
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-aqua to-neon-blue text-navy-dark hover:brightness-110"
                      >
                        <Check className="mr-1 h-3 w-3" />
                        Accept
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-matte/20 bg-navy-light/30 p-6 text-center">
              <p className="text-gray-400">No pending invitations</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
