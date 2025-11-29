"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, MessageCircle, Users, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
    const pathname = usePathname()

    const tabs = [
        {
            name: "홈",
            href: "/",
            icon: Home,
        },
        {
            name: "검색",
            href: "/search",
            icon: Search,
        },
        {
            name: "채팅",
            href: "/chat",
            icon: MessageCircle,
        },
        {
            name: "내 모임",
            href: "/my-groups",
            icon: Users,
        },
        {
            name: "프로필",
            href: "/profile",
            icon: User,
        },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background pb-safe">
            <div className="flex h-16 items-center justify-around px-2">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 px-2 py-1 transition-colors",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <tab.icon className="h-6 w-6" />
                            <span className="text-[10px] font-medium">{tab.name}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
