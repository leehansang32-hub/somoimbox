import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
    return (
        <div className="flex min-h-screen flex-col p-6">
            <div className="flex-1 space-y-8">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">프로필을 완성해주세요</h1>
                    <p className="text-muted-foreground">
                        모임원들에게 보여질 모습입니다.
                    </p>
                </div>

                <div className="flex justify-center">
                    <Avatar className="h-24 w-24 cursor-pointer">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-2xl">😊</AvatarFallback>
                    </Avatar>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="nickname">닉네임</Label>
                    <Input id="nickname" placeholder="닉네임을 입력하세요" />
                </div>
            </div>

            <Button className="w-full" asChild>
                <Link href="/">시작하기</Link>
            </Button>
        </div>
    )
}
