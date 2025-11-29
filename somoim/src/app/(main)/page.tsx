"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, LogOut } from "lucide-react"
import { useHome } from "@/hooks/use-home"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { categories, selectedCategory, setSelectedCategory, groups } = useHome()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-4">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 border-b">
          <h1 className="text-xl font-bold text-primary">소모임</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto py-3 px-4 gap-2 scrollbar-hide border-b">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "flex-none rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {/* Group List */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">추천 모임</h2>
          <Link href="/search" className="text-sm text-muted-foreground hover:text-primary">
            더보기
          </Link>
        </div>

        <div className="grid gap-4">
          {groups.map((group) => (
            <Link key={group.id} href={`/group/${group.id}`}>
              <Card className="overflow-hidden hover:bg-muted/50 transition-colors">
                <div className="flex">
                  {/* Thumbnail */}
                  <div className="w-24 h-24 bg-muted flex-none" />

                  {/* Content */}
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
                          {group.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                          <MapPin className="w-3 h-3" />
                          {group.region}
                        </span>
                      </div>
                      <h3 className="font-bold leading-tight line-clamp-2">
                        {group.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <Users className="w-3 h-3" />
                      <span>{group.member_count || 0} / {group.max_members}명</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
