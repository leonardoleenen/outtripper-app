import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import businessService from '../../services/business'
import Loading from '../../components/loading'
import dbs from '../../services/database'

export default () => {
  const router = useRouter()
  const [invitation, setInvitation] = useState<Invitation>(null)

  const { invitationId } = router.query

  //

  useEffect(() => {
    if (!invitationId) {
      router.push('/invitations/error')
      return
    }

    const fetchInvitation = async () => {
      const invitationFetched : Invitation = await businessService.getInvitation(invitationId as string)
      if (!invitationFetched) {
        router.push('/invitations/error')
      } else {
        setInvitation(invitationFetched)
      }
    }
    fetchInvitation()
  }, [])


  const provider = new dbs.fb.auth.GoogleAuthProvider()

  const showGoogleLogin = () => {
    dbs.fb.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential
      // The signed-in user info.
      const { user } = result

      console.log(token, user)
      // ...
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
  }


  if (!invitation) return <Loading />


  console.log(invitation)
  return (
    <div>
      <p>
        {` Hi ${invitation.invitationTo}, ${invitation.invitationSendBy} send to you a invitation to participate in ${invitation.organizationName} as ${invitation.rol}.
        If you want accept this invition, we need that you can register using some of this social networks. 

        We don't store your data, only use Auth method of Social Networks to acreditate you identity. 
        `}
      </p>

      <button type="button" onClick={showGoogleLogin}> Google </button>

    </div>
  )
}
