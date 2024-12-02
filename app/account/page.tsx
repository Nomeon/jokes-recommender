import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/account/actions'

export default async function Profile() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  let name = ''
  if (data.user?.user_metadata.name) {
    name = data.user.user_metadata.name
  } else if (data.user?.user_metadata.full_name) {
    name = data.user.user_metadata.full_name
  } else {
    name = data.user.email!
  }

  return (
    <div className='mt-10 w-full flex flex-col gap-4 items-center justify-center'>
      <div className='flex items-center gap-4'>
        <p>Hello, <b>{name}</b>!</p>
        <Button onClick={logout} variant='outline'>Sign out</Button>
      </div>
    </div>
  )
}