'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createWorkspace } from './actions'

export default function CreateWorkspaceForm({ userId }: { userId: string }) {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await createWorkspace(name, userId)
        setLoading(false)
        setName('')
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
                placeholder="Workspace Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Button type="submit" disabled={loading}>Create</Button>
        </form>
    )
}
