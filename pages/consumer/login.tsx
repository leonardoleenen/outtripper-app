import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import dbs from '../../services/database'
import bs from '../../services/business'

export default () => {
  const provider = new dbs.fb.auth.GoogleAuthProvider()
  const router = useRouter()
  const { accessToken } = router.query

  const showGoogleLogin = () => {
    dbs.fb.auth().signInWithRedirect(provider)
  }


  useEffect(() => {
    dbs.fb.auth().getRedirectResult().then((result) => {
      const { user } = result
      if (user) {
        bs.login(user.uid, user.displayName, user.email, user.photoURL).then((token: TokenOuttripper) => {
          router.push(`/consumer/reservation?accessToken=${accessToken}`)
          return <div> Esperando el redirect</div>
        })
      }
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const { email } = error
      // The firebase.auth.AuthCredential type that was used.
      const { credential } = error
      // ...
    })
  }, [])


  return (
    <div>
Por favor loggese
      {' '}
      <button type="button" onClick={() => showGoogleLogin()}>Logearse con Google</button>
    </div>
  )
}
