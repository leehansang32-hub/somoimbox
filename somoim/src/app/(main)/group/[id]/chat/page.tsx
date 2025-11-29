"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { ChatService, ChatMessage } from "@/services/chat-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

export default function ChatPage() {
    const params = useParams()
    const groupId = params.id as string

    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [currentUser, setCurrentUser] = useState<any>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        async function init() {
            // 1. Get Current User
            const { data: { user } } = await supabase.auth.getUser()
            setCurrentUser(user)

            if (!groupId) return

            // 2. Load Initial Messages
            try {
                const initialMessages = await ChatService.getMessages(groupId)
                setMessages(initialMessages || [])
            } catch (e) {
                console.error("Failed to load messages:", e)
            }

            // 3. Subscribe to Realtime Updates
            const channel = ChatService.subscribeToGroup(groupId, async (payload) => {
                // Fetch the full message with user info (since realtime payload only has raw data)
                // Optimization: In a real app, we might just fetch the user info separately or cache it
                const { data } = await supabase
                    .from('chats')
                    .select(`*, user:users!user_id(nickname, avatar_url)`)
                    .eq('id', payload.new.id)
                    .single()

                if (data) {
                    setMessages(prev => [...prev, data as ChatMessage])
                }
            })

            return () => {
                supabase.removeChannel(channel)
            }
        }
        init()
    }, [groupId])

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim() || !currentUser) return

        try {
            await ChatService.sendMessage(groupId, currentUser.id, newMessage)
            setNewMessage("")
        } catch (e) {
            console.error("Failed to send message:", e)
            alert("메시지 전송 실패")
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
                <h1 className="font-semibold">채팅방</h1>
            </div>

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
            >
                {messages.map((msg) => {
                    const isMe = msg.user_id === currentUser?.id
                    return (
                        <div
                            key={msg.id}
                            className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                        >
                            {!isMe && (
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={msg.user?.avatar_url || ""} />
                                    <AvatarFallback>{msg.user?.nickname?.[0] || "?"}</AvatarFallback>
                                </Avatar>
                            )}

                            <div className={`max-w-[70%] ${isMe ? "items-end" : "items-start"} flex flex-col`}>
                                {!isMe && (
                                    <span className="text-xs text-muted-foreground mb-1 ml-1">
                                        {msg.user?.nickname}
                                    </span>
                                )}
                                <div
                                    className={`px-3 py-2 rounded-lg text-sm ${isMe
                                            ? "bg-primary text-primary-foreground rounded-tr-none"
                                            : "bg-muted rounded-tl-none"
                                        }`}
                                >
                                    {msg.message}
                                </div>
                                <span className="text-[10px] text-muted-foreground mt-1 px-1">
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-background">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="메시지를 입력하세요..."
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </div>
    )
}
