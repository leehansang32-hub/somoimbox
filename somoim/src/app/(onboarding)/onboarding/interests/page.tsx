import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function InterestsPage() {
    const interests = ["등산", "러닝", "독서", "맛집", "여행", "사진", "요리", "영화", "전시", "공연"]

    return (
        <div className="flex min-h-screen flex-col p-6">
            <div className="flex-1 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">어떤 활동을 좋아하세요?</h1>
                    <p className="text-muted-foreground">
                        관심사를 선택하면 딱 맞는 모임을 찾아드릴게요.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                        <Badge key={interest} variant="outline" className="cursor-pointer px-4 py-2 text-base hover:bg-primary/10 hover:text-primary hover:border-primary">
                            {interest}
                        </Badge>
                    ))}
                </div>
            </div>

            <Button className="w-full" asChild>
                <Link href="/onboarding/profile">다음</Link>
            </Button>
        </div>
    )
}
