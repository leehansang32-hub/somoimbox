import { BottomNav } from "@/components/layout/bottom-nav"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col pb-16">
            <main className="flex-1">{children}</main>
            <BottomNav />
        </div>
    )
}
