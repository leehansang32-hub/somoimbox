"use client"

import { useState, useEffect } from "react"
import { GroupService } from "@/services/group-service"

export type Group = {
    id: string
    name: string
    category: string
    region: string
    max_members: number
    image_url: string | null
    // We can add member_count via a separate query or view in a real app
    member_count?: number
}

export function useHome() {
    const [selectedCategory, setSelectedCategory] = useState("전체")
    const [groups, setGroups] = useState<Group[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchGroups() {
            try {
                const data = await GroupService.getGroups()
                setGroups(data || [])
            } catch (error) {
                console.error("Failed to fetch groups:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchGroups()
    }, [])

    const categories = ["전체", "등산", "러닝", "독서", "맛집", "여행", "사진"]

    const filteredGroups = selectedCategory === "전체"
        ? groups
        : groups.filter(group => group.category === selectedCategory)

    return {
        categories,
        selectedCategory,
        setSelectedCategory,
        groups: filteredGroups,
        loading
    }
}
