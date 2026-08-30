import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { getStormforgeData } from '@/app/actions/stormforge'
import StormforgeApp from '@/components/stormforge-app'

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')
  const data = await getStormforgeData()
  return <StormforgeApp user={session.user} initialMissions={data.missions} />
}
