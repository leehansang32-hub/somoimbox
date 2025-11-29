"use client"

import { useState, useEffect } from "react"
import { GroupService } from "@/services/group-service"
import { supabase } from "@/lib/supabase"
import { useParams } from "next/navigation"

export type JoinStatus = "guest" | "pending" | "joined"

export function useGroupDetail() {
    const params = useParams()
    const groupId = params.id as string

    const [status, setStatus] = useState<JoinStatus>("guest")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [answer, setAnswer] = useState("")
    const [group, setGroup] = useState<any>(null)

    useEffect(() => {
        async function loadData() {
            if (!groupId) return

            try {
                // 1. Load Group Info
                const groupData = await GroupService.getGroupById(groupId)
                setGroup(groupData)

                // 2. Check User Status
                const { data: { user } } = await supabase.auth.getUser()
                if (user) {
                    const joinStatus = await GroupService.getJoinStatus(groupId, user.id)
                    setStatus(joinStatus)
                }
            } catch (e) {
                console.error("Error loading group detail:", e)
            }
        }
        loadData()
    }, [groupId])

    const handleJoinClick = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            alert("로그인이 필요합니다.")
            // Redirect to login or show login modal
            return
        }
        setIsDialogOpen(true)
    }

    const handleSubmitAnswer = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            await GroupService.joinGroup(groupId, user.id, answer)

            setStatus("pending")
            setIsDialogOpen(false)
            alert("가입 신청이 완료되었습니다. 모임장의 승인을 기다려주세요.")
        } catch (e) {
            console.error("Join failed:", e)
            alert("가입 신청 중 오류가 발생했습니다.")
        }
    }

    return {
        group,
        status,
        isDialogOpen,
        setIsDialogOpen,
        answer,
        setAnswer,
        handleJoinClick,
        handleSubmitAnswer,
    }
}
