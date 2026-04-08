"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  TrendingUp,
  Mail,
  Users,
  Eye,
  MessageSquare,
  Phone,
  Download,
  RefreshCw,
  Edit,
  Star,
  Clock,
  Zap,
  Home,
  Wrench,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge as UIBadge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for Leandro's roofing campaign
const mockData = {
  todayMetrics: {
    emailsSent: 75,
    openRate: 28.5,
    replyRate: 6.2,
    interestedLeads: 8,
  },
  campaignInfo: {
    id: "leandro-roofers-001",
    name: "Leandro - Roofers",
    status: "active",
    totalEmailsSent: 2400,
    totalOpens: 684,
    totalReplies: 148,
    positiveReplies: 43,
    estimateRequests: 12,
  },
  positiveReplies: [
    {
      id: "1",
      fromEmail: "homeowner@gmail.com",
      subject: "Re: Roof Repair Services",
      preview:
        "We need a quote for roof repair after the storm damage. Our roof has several missing shingles and we're getting water leaks...",
      timestamp: "2024-01-15T10:30:00Z",
      isNew: true,
      keywords: ["quote", "roof repair", "storm damage"],
    },
    {
      id: "2",
      fromEmail: "contractor@company.com",
      subject: "Re: Roofing Partnership",
      preview:
        "Interested in your roofing services, let's schedule a call to discuss potential partnership opportunities...",
      timestamp: "2024-01-15T09:15:00Z",
      isNew: true,
      keywords: ["interested", "schedule", "partnership"],
    },
    {
      id: "3",
      fromEmail: "property.manager@apartments.com",
      subject: "Re: Commercial Roofing Quote",
      preview: "We have a 50-unit apartment complex that needs roof replacement. Can you provide an estimate?",
      timestamp: "2024-01-15T08:45:00Z",
      isNew: false,
      keywords: ["estimate", "roof replacement", "commercial"],
    },
  ],
  performanceData: [
    { date: "Jan 9", sent: 45, opened: 12, replies: 3 },
    { date: "Jan 10", sent: 52, opened: 18, replies: 4 },
    { date: "Jan 11", sent: 38, opened: 15, replies: 2 },
    { date: "Jan 12", sent: 61, opened: 22, replies: 5 },
    { date: "Jan 13", sent: 48, opened: 19, replies: 3 },
    { date: "Jan 14", sent: 55, opened: 24, replies: 6 },
    { date: "Jan 15", sent: 75, opened: 28, replies: 8 },
  ],
  campaignComparison: [
    { campaign: "Leandro - Roofers", openRate: 28.5 },
    { campaign: "General Contractors", openRate: 22.1 },
    { campaign: "Home Repairs", openRate: 19.8 },
    { campaign: "Storm Damage", openRate: 31.2 },
  ],
  sentimentData: [
    { name: "Positive", value: 43, color: "#10B981" },
    { name: "Neutral", value: 78, color: "#6B7280" },
    { name: "Negative", value: 27, color: "#EF4444" },
  ],
  campaigns: [
    {
      name: "Leandro - Roofers",
      status: "Active",
      emailsSent: 2400,
      replyRate: 6.2,
      opportunities: 43,
      isActive: true,
    },
    {
      name: "Storm Damage Follow-up",
      status: "Active",
      emailsSent: 1850,
      replyRate: 8.1,
      opportunities: 38,
      isActive: true,
    },
    {
      name: "Commercial Roofing",
      status: "Paused",
      emailsSent: 920,
      replyRate: 4.3,
      opportunities: 12,
      isActive: false,
    },
  ],
}

export default function LeandroRoofersDashboard() {
  const [dateRange, setDateRange] = useState("7days")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  const highlightKeywords = (text: string, keywords: string[]) => {
    let highlightedText = text
    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, "gi")
      highlightedText = highlightedText.replace(
        regex,
        '<span class="bg-blue-500/20 text-blue-300 px-1 rounded">$1</span>',
      )
    })
    return highlightedText
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700 z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Leandro</h2>
                <p className="text-slate-400 text-sm">Roofing Pro</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-slate-400"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30"
            >
              <BarChart className="w-5 h-5" />
              <span>Analytics</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Campaigns</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Leads</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
            >
              <Wrench className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </nav>

          <div className="mt-8">
            <a href="https://buy.stripe.com/3cI4gBbmgbBG1C3cFq3840G" target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-green-600 hover:bg-green-700 font-semibold">
                <Zap className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </a>
            <p className="text-slate-500 text-xs text-center mt-2">$49.99 / month</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-slate-400"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Leandro Roofers - Campaign Analytics</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Live</span>
                  </div>
                  <UIBadge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                    {mockData.campaignInfo.name}
                  </UIBadge>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>

              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>

              <a href="https://buy.stripe.com/3cI4gBbmgbBG1C3cFq3840G" target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 font-semibold">
                  <Zap className="w-4 h-4 mr-2" />
                  Get Started — $49.99/mo
                </Button>
              </a>
            </div>
          </div>
        </header>

        {/* Pricing CTA Banner */}
        <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 border-b border-green-500/20 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">
                Automate your roofing outreach —{" "}
                <span className="text-green-400 font-bold">$49.99/month</span>
              </span>
              <UIBadge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">$10 OFF</UIBadge>
            </div>
            <a href="https://buy.stripe.com/3cI4gBbmgbBG1C3cFq3840G" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 font-semibold">
                Start Now — $49.99/mo
              </Button>
            </a>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-300 text-sm font-medium flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-400" />
                  Total Emails Sent Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">{mockData.todayMetrics.emailsSent}</div>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-green-400 text-sm">+12% from yesterday</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-sm">Roofing Outreach</div>
                    <div className="text-blue-400 font-medium">Focus Campaign</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-300 text-sm font-medium flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-green-400" />
                  Reply Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">{mockData.todayMetrics.replyRate}%</div>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-green-400 text-sm">Above industry avg</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-sm">Roofing Industry</div>
                    <div className="text-green-400 font-medium">Strong Performance</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-300 text-sm font-medium flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  Interested Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-white">{mockData.todayMetrics.interestedLeads}</span>
                      <UIBadge className="ml-2 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 animate-pulse">
                        New!
                      </UIBadge>
                    </div>
                    <div className="flex items-center mt-1">
                      <Zap className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-yellow-400 text-sm">Hot prospects</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-sm">Positive Replies</div>
                    <div className="text-yellow-400 font-medium">Ready to Convert</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Positive Reply Alerts Section - PROMINENT */}
          <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-400 text-xl font-bold flex items-center">
                <Zap className="w-6 h-6 mr-2 animate-pulse" />
                Positive Reply Alerts - Roofing Prospects
                <UIBadge className="ml-3 bg-green-500/20 text-green-400 border-green-500/30 animate-bounce">
                  {mockData.campaignInfo.positiveReplies} Today
                </UIBadge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {mockData.positiveReplies.slice(0, 2).map((reply) => (
                  <div key={reply.id} className="bg-slate-800/50 rounded-lg p-4 border border-green-500/20">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium">{reply.fromEmail}</span>
                          {reply.isNew && (
                            <UIBadge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs animate-pulse">
                              NEW
                            </UIBadge>
                          )}
                        </div>
                        <div className="text-slate-400 text-sm">{reply.subject}</div>
                      </div>
                      <div className="text-slate-500 text-xs">{formatTimestamp(reply.timestamp)}</div>
                    </div>

                    <div
                      className="text-slate-300 text-sm mb-3 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: highlightKeywords(reply.preview, reply.keywords),
                      }}
                    />

                    <div className="flex flex-wrap gap-2 mb-3">
                      {reply.keywords.map((keyword, idx) => (
                        <UIBadge key={idx} className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                          {keyword}
                        </UIBadge>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Reply
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-500/30 text-blue-300 hover:bg-blue-600/20 text-xs bg-transparent"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        Mark as Lead
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-yellow-500/30 text-yellow-300 hover:bg-yellow-600/20 text-xs bg-transparent"
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Schedule Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                  Email Performance Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockData.performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="sent" stroke="#3B82F6" strokeWidth={2} name="Sent" />
                    <Line type="monotone" dataKey="opened" stroke="#10B981" strokeWidth={2} name="Opened" />
                    <Line type="monotone" dataKey="replies" stroke="#F59E0B" strokeWidth={2} name="Replies" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart className="w-5 h-5 mr-2 text-green-400" />
                  Campaign Comparison - Open Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockData.campaignComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="campaign" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="openRate" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Donut Chart and Campaign Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Donut Chart */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-purple-400" />
                  Reply Sentiment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={mockData.sentimentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockData.sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  {mockData.sentimentData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-300 text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Campaign Performance Table */}
            <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-blue-400" />
                  Campaign Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Campaign Name</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Emails Sent</TableHead>
                      <TableHead className="text-slate-300">Reply Rate</TableHead>
                      <TableHead className="text-slate-300">Opportunities</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockData.campaigns.map((campaign, index) => (
                      <TableRow key={index} className="border-slate-700">
                        <TableCell className="text-white font-medium">{campaign.name}</TableCell>
                        <TableCell>
                          <UIBadge
                            className={
                              campaign.isActive
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                            }
                          >
                            {campaign.status}
                          </UIBadge>
                        </TableCell>
                        <TableCell className="text-slate-300">{campaign.emailsSent.toLocaleString()}</TableCell>
                        <TableCell className="text-slate-300">{campaign.replyRate}%</TableCell>
                        <TableCell className="text-slate-300">{campaign.opportunities}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Feed */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                Recent Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.positiveReplies.map((reply) => (
                  <div
                    key={reply.id}
                    className="flex items-start space-x-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-slate-500/50 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-medium">{reply.fromEmail}</span>
                        {reply.isNew && (
                          <UIBadge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">NEW</UIBadge>
                        )}
                        <span className="text-slate-500 text-sm">{formatTimestamp(reply.timestamp)}</span>
                      </div>
                      <div className="text-slate-400 text-sm mb-2">{reply.subject}</div>
                      <div className="text-slate-300 text-sm">{reply.preview.substring(0, 100)}...</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {reply.keywords.map((keyword, idx) => (
                          <UIBadge key={idx} className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                            {keyword}
                          </UIBadge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
