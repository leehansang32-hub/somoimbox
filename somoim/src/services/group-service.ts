import { supabase } from "@/lib/supabase"
import { Group, JoinStatus } from "@/hooks/use-group-detail"

export const GroupService = {
    // Fetch all groups
    async getGroups() {
        const { data, error } = await supabase
            .from('groups')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    },

    // Fetch single group by ID
    async getGroupById(id: string) {
        const { data, error } = await supabase
            .from('groups')
            .select(`
        *,
        owner:users!owner_id(nickname, avatar_url)
      `)
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    },

    // Get user's join status for a group
    async getJoinStatus(groupId: string, userId: string): Promise<JoinStatus> {
        const { data, error } = await supabase
            .from('group_members')
            .select('status')
            .eq('group_id', groupId)
            .eq('user_id', userId)
            .maybeSingle()

        if (error) return 'guest'
        if (!data) return 'guest'

        // Map DB status to frontend status
        if (data.status === 'approved') return 'joined'
        if (data.status === 'pending') return 'pending'
        return 'guest'
    },

    // Request to join a group
    async joinGroup(groupId: string, userId: string, answer: string) {
        const { error } = await supabase
            .from('group_members')
            .insert({
                group_id: groupId,
                user_id: userId,
                status: 'pending',
                join_answer: answer
            })

        if (error) throw error
    }
}
