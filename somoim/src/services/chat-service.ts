import { supabase } from "@/lib/supabase"

export type ChatMessage = {
    id: string
    group_id: string
    user_id: string
    message: string
    created_at: string
    user: {
        nickname: string
        avatar_url: string | null
    }
}

export const ChatService = {
    // Fetch initial messages
    async getMessages(groupId: string) {
        const { data, error } = await supabase
            .from('chats')
            .select(`
        *,
        user:users!user_id(nickname, avatar_url)
      `)
            .eq('group_id', groupId)
            .order('created_at', { ascending: true })
            .limit(100)

        if (error) throw error
        return data as ChatMessage[]
    },

    // Send a message
    async sendMessage(groupId: string, userId: string, message: string) {
        const { error } = await supabase
            .from('chats')
            .insert({
                group_id: groupId,
                user_id: userId,
                message
            })

        if (error) throw error
    },

    // Subscribe to new messages
    subscribeToGroup(groupId: string, callback: (payload: any) => void) {
        return supabase
            .channel(`chat:${groupId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'chats',
                    filter: `group_id=eq.${groupId}`
                },
                callback
            )
            .subscribe()
    }
}
