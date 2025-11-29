"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Users } from "lucide-react"
import { useGroupDetail } from "@/hooks/use-group-detail"

export default function GroupDetailPage() {
    const {
        status,
        isDialogOpen,
        setIsDialogOpen,
        answer,
        setAnswer,
        handleJoinClick,
        handleSubmitAnswer,
    } = useGroupDetail()

    return (
        <div className="flex min-h-screen flex-col bg-background pb-20">
            {/* Header Image */}
            <div className="h-60 w-full bg-muted">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                    모임 대표 이미지
                </div>
            </div>

            <div className="p-4">
                {/* Group Info */}
                <div className="mb-6 space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <Badge variant="secondary" className="mb-2">등산</Badge>
                            <h1 className="text-2xl font-bold">주말 관악산 등산 모임</h1>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>서울 관악구 · 2030</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>멤버 24명 / 정원 50명</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="info" className="w-full">
                    <TabsList className="w-full grid grid-cols-3">
                        <TabsTrigger value="info">정보</TabsTrigger>
                        <TabsTrigger value="board">게시판</TabsTrigger>
                        <TabsTrigger value="album">사진첩</TabsTrigger>
                    </TabsList>

                    <TabsContent value="info" className="mt-6 space-y-6">
                        <section>
                            <h3 className="mb-2 font-bold">모임 소개</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                매주 주말 관악산 등산을 함께하는 모임입니다.
                                초보자도 환영합니다! 뒷풀이는 자율 참석입니다.
                            </p>
                        </section>

                        <section>
                            <h3 className="mb-2 font-bold">운영진</h3>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src="" />
                                    <AvatarFallback>장</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">김모임</p>
                                    <p className="text-xs text-muted-foreground">모임장</p>
                                </div>
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent value="board">
                        <div className="py-8 text-center text-muted-foreground">
                            가입 후 게시글을 볼 수 있습니다.
                        </div>
                    </TabsContent>

                    <TabsContent value="album">
                        <div className="py-8 text-center text-muted-foreground">
                            가입 후 사진을 볼 수 있습니다.
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4 pb-safe">
                {status === "guest" && (
                    <Button className="w-full text-lg font-bold h-12" onClick={handleJoinClick}>
                        가입하고 함께하기
                    </Button>
                )}
                {status === "pending" && (
                    <Button disabled className="w-full text-lg font-bold h-12 bg-muted text-muted-foreground">
                        가입 승인 대기중
                    </Button>
                )}
                {status === "joined" && (
                    <Button variant="outline" className="w-full text-lg font-bold h-12">
                        모임 설정
                    </Button>
                )}
            </div>

            {/* Join Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>가입 질문</DialogTitle>
                        <DialogDescription>
                            모임장이 설정한 질문에 답변해주세요.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <p className="font-medium">Q. 거주지와 나이를 알려주세요.</p>
                            <Textarea
                                placeholder="답변을 입력하세요"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={handleSubmitAnswer} disabled={!answer.trim()}>
                            답변 제출하기
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
