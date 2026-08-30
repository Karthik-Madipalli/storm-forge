'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { missionApplications, missions, notifications, profiles } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return null
  return session.user
}

async function requireUser() {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

export async function getStormforgeData() {
  const user = await requireUser()
  const [profile, applications, alerts] = await Promise.all([
    db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1),
    db.select().from(missionApplications).where(eq(missionApplications.userId, user.id)).orderBy(desc(missionApplications.createdAt)),
    db.select().from(notifications).where(eq(notifications.userId, user.id)).orderBy(desc(notifications.createdAt)),
  ])
  const openMissions = await db.select().from(missions).where(eq(missions.status, 'open')).orderBy(desc(missions.createdAt))
  return { user, profile: profile[0] ?? null, applications, alerts, missions: openMissions }
}

export async function createMission(input: { title: string; summary: string; category: string; reward: number; time: string; tags: string[] }) {
  const user = await requireUser()
  const missionId = crypto.randomUUID()
  await db.insert(missions).values({
    id: missionId,
    userId: user.id,
    title: input.title,
    summary: input.summary,
    client: `${user.name} · Student request`,
    category: input.category,
    reward: input.reward,
    status: 'open',
  })
  revalidatePath('/')
  return { id: missionId }
}

export async function applyToMission(missionId: string) {
  const user = await requireUser()
  const mission = await db.select({ id: missions.id }).from(missions).where(and(eq(missions.id, missionId), eq(missions.status, 'open'))).limit(1)
  if (!mission[0]) throw new Error('Mission unavailable')
  const existing = await db.select({ id: missionApplications.id }).from(missionApplications).where(and(eq(missionApplications.missionId, missionId), eq(missionApplications.userId, user.id))).limit(1)
  if (existing[0]) return { ok: true }
  await db.insert(missionApplications).values({ id: crypto.randomUUID(), missionId, userId: user.id })
  await db.insert(notifications).values({ id: crypto.randomUUID(), userId: user.id, title: 'Application sent', body: 'Your mission application is now being reviewed.' })
  revalidatePath('/')
  return { ok: true }
}

export async function ensureProfile() {
  const user = await requireUser()
  const existing = await db.select({ id: profiles.id }).from(profiles).where(eq(profiles.userId, user.id)).limit(1)
  if (!existing[0]) await db.insert(profiles).values({ id: crypto.randomUUID(), userId: user.id })
  return { ok: true }
}
