//I didn't write any of the code in lib/

import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

export default function useUser({ redirectTo = false, redirectIfFound = false, redirectTarget="feed"} = {}) {
  const { data: user, mutate: mutateUser } = useSWR('/api/user')

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTarget)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}