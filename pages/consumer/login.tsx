import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loading from '../../components/loading'
import dbs from '../../services/database'
import bs from '../../services/business'

export default () => {
  const provider = new dbs.fb.auth.GoogleAuthProvider()
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { accessToken } = router.query

  const showGoogleLogin = () => {
    dbs.fb.auth().signInWithRedirect(provider)
  }


  useEffect(() => {
    dbs.fb.auth().getRedirectResult().then(async (result) => {
      const { user } = result
      if (user) {
        /*
        console.log('Tiene usuario')
        bs.login(user.uid, user.displayName, user.email, user.photoURL).then((token: TokenOuttripper) => {
          router.push(`/consumer/mytrip?accessToken=${accessToken}`)
          console.log('paso el login')
          setIsLoading(false)
          return <div> Esperando el redirect</div>
        })
        */
        const token : TokenOuttripper = await bs.login(user.uid, user.displayName, user.email, user.photoURL)

        if (token) {
          router.push(`/consumer/mytrip?accessToken=${accessToken}`)
          return
        }
      }

      setIsLoading(false)

      // setIsLoading(false)
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


  if (isLoading) return <Loading />

  return (
    <div className="h-screen text-white">
      <div className="p-12 flex items-center justify-center">
        <img src="/img/logowhite.png" className="h-10 w-10" alt="" />
      </div>
      <div className="p-8 flex items-center justify-center">
        <span className="text-4xl font-bold flex text-center">Welcome, </span>
      </div>

      <div className="px-8">
        <span className="text-sm font-thin flex text-center leading-relaxed">
          {`Your Next Trip coming soon!

Sign up to manage your reservation, make online payments, check your pre-trip and gear recomendations, among other things to enrich your travel experience. `}
        </span>
      </div>


      <div className="fixed bottom-0 justify-center w-full mb-8">
        <div className="flex items-center justify-center">
          <button className="flex mx-8 w-full rounded-lg px-4 py-2 bg-gray-300" type="button" onClick={() => showGoogleLogin()}>
            <div>
              <IconGoogle />
            </div>
            <div className="w-full">
              <span className="ml-4 text-gray-800 font-semibold">Continue with Google</span>
            </div>
          </button>
        </div>
        <div className="p-4 font-thin flex items-center justify-center">
          <span>Powered By Outtripper</span>
        </div>
      </div>

      <style>
        {`
          .h-screen {
            background-image: url('/img/mytrip_background.jpg');
          }
        `}
      </style>
    </div>


  )
}


const IconGoogle = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.3491 8.99779H10.9926V13.2545H16.909C16.6538 14.6304 15.8799 15.7941 14.7133 16.5738C13.7272 17.2331 12.4688 17.6229 10.9897 17.6229C8.12616 17.6229 5.70401 15.6881 4.83834 13.0882C4.62049 12.4289 4.49436 11.7238 4.49436 10.9986C4.49436 10.2734 4.62049 9.56821 4.83834 8.90892C5.70687 6.31192 8.12902 4.37707 10.9926 4.37707C12.6064 4.37707 14.054 4.93316 15.1948 6.02241L18.3479 2.86645C16.4417 1.08925 13.9565 0 10.9926 0C6.6958 0 2.97801 2.46515 1.16928 6.05967C0.424006 7.5445 -0.000228882 9.22423 -0.000228882 11.0014C-0.000228882 12.7786 0.424006 14.4555 1.16928 15.9403C2.97801 19.5349 6.6958 22 10.9926 22C13.9622 22 16.4503 21.0139 18.2677 19.3342C20.3458 17.4194 21.5469 14.5988 21.5469 11.2479C21.5469 10.4683 21.4781 9.72013 21.3491 8.99779Z" fill="#2D3748" />
  </svg>
)
