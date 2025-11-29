
"use client"

import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const handleLogin = async (provider: "kakao" | "google") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error("Login error:", error.message)
      alert("로그인 중 오류가 발생했습니다.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter text-primary">소모임</h1>
        <p className="text-muted-foreground">
          취미가 같은 좋은 사람들과<br />
          소소한 행복을 나눠보세요.
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <Button
          className="w-full bg-[#FEE500] text-black hover:bg-[#FEE500]/90"
          onClick={() => handleLogin("kakao")}
        >
          카카오로 시작하기
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleLogin("google")}
        >
          구글로 시작하기
        </Button>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        로그인 시 이용약관 및 개인정보처리방침에 동의하게 됩니다.
      </p>
    </div>
  )
}

