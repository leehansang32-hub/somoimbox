import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegionPage() {
    return (
        <div className="flex min-h-screen flex-col p-6">
            <div className="flex-1 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">어디에 사시나요?</h1>
                    <p className="text-muted-foreground">
                        동네를 설정하면 가까운 모임을 추천해드려요.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="region">거주지 검색</Label>
                    <Input id="region" placeholder="예: 강남구 역삼동" />
                </div>
            </div>

            <Button className="w-full" asChild>
                <Link href="/onboarding/interests">다음</Link>
            </Button>
        </div>
    )
}
