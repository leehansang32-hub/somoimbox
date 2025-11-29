import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthCodeErrorPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
            <div className="mb-8 space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-destructive">로그인 오류</h1>
                <p className="text-muted-foreground">
                    로그인 처리 중 문제가 발생했습니다.<br />
                    잠시 후 다시 시도해 주세요.
                </p>
            </div>

            <div className="w-full max-w-sm">
                <Link href="/login">
                    <Button className="w-full">
                        로그인 페이지로 돌아가기
                    </Button>
                </Link>
            </div>
        </div>
    )
}
