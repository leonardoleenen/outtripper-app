import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import bs from '../services/business'
import Loading from '../components/loading'
import dbs from '../services/database'

export default () => {
  const router = useRouter()
  const { id } = router.query
  const [invite, setInvite] = useState<Invitation>()
  const [isLoading, setIsLoading] = useState(false)
  const provider = new dbs.fb.auth.GoogleAuthProvider()


  const showGoogleLogin = () => {
    dbs.fb.auth().signInWithRedirect(provider)
  }

  useEffect(() => {
    const fetch = async () => {
      const inv = await bs.getInvitation(id as string)
      if (!inv) {
        router.push('/no_invite')
        return
      }
      setInvite(inv)

      if (inv !== null && inv.status !== 'SEND') {
        router.push('/no_invite')
        return
      }

      dbs.fb.auth().getRedirectResult().then((result) => {
        const { user } = result
        setIsLoading(true)
        bs.createUser({
          cn: user.displayName,
          uid: user.uid,
          email: user.email,
          photoAvatar: user.photoURL,
        } as User, inv).then((token: TokenOuttripper) => {
          dbs.setToken(token)
          router.push('/home')
        })
      }).catch((error) => {
        setIsLoading(false)
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const { email } = error
        // The firebase.auth.AuthCredential type that was used.
        const { credential } = error
        // ...
      })
    }

    fetch()
  }, [])

  if (!invite || isLoading) return <Loading />

  return (
    <div>

      <span>{`Hi!! ${invite.sendBy} send you a request for work with ${invite.organizationCN}. To continue, please sign in with follow social networks`}</span>
      <div>
        <button type="button" onClick={() => showGoogleLogin()}> Google</button>
      </div>
    </div>
  )
}
