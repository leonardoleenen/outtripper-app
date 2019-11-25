import React, { useState } from 'react'
import '../statics/style/style.scss'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import dbs from '../services/database'
import bs from '../services/business'
import Waiting from '../components/loading'


export default () => {
  const disptach = useDispatch()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const provider = new dbs.fb.auth.GoogleAuthProvider()

  const showGoogleLogin = () => {
    dbs.fb.auth().signInWithPopup(provider).then((result) => {
      const { user } = result
      setIsLoading(true)
      bs.login(user.uid, user.displayName, user.email).then((token: TokenOuttripper) => {
        localStorage.setItem('user', btoa(JSON.stringify({
          token,
          photoURL: user.photoURL,
        })))

        switch (token.organizationKind) {
          case 'LODGE':
            router.push('/home')
            break
          case 'AGENCY':
            router.push('/agency')
            break
          default:
            router.push('/consumer')
            break
        }
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

  if (isLoading) return <Waiting />


  return (
    <div className="bg-gradient p-8">
      <h1>OutTripper</h1>
      <p>Please, choose your favorite social network to signin</p>
      <div className="icons">
        <div className="m-auto" onClick={() => showGoogleLogin()}><GoogleIcon /></div>
        <div
          className="m-auto"
        >
          <TwitterIcon />

        </div>
        <div className="m-auto"><LinkdinIcon /></div>
        <div className="m-auto"><FacebookIcon /></div>
      </div>
      <div className="terms">
        <input type="check" />
        I have read the terms and conditions. I agree and give my consent
      </div>
      <style jsx>
        {
          `
          @import url('https://fonts.googleapis.com/css?family=Gochi+Hand&display=swap');
          .bg-gradient{
            background: linear-gradient(179.96deg, #F56565 2.18%, #E53E3E 27.54%, #C53030 52.38%, #9B2C2C 98.95%);
            height:100vh;
            color:#fff;
          }
         
          h1{font-family: Gochi Hand;
            font-weight: normal;
            font-size: 64px;
            line-height: 75px;
            letter-spacing: 0.75px;
            text-align:center;
            margin:auto;
            padding-bottom:55px;
            padding-top:150px;
            @apply m-auto
          }
          p{
            font-family: Open Sans;
            font-weight: 300;
            font-size: 14px;
            line-height: 25px;
            text-align: center;
            letter-spacing: 0.15px;
            width:211px;
            margin:auto;
          }
          .icons{
            display:grid;
            grid-template-columns:1fr 1fr 1fr 1fr;
            margin:auto;
            margin-top:30px;
          }

          .terms{
            font-family: Open Sans;
            font-style: normal;
            font-weight: 300;
            font-size: 9px;
            line-height: 12px;
            display: flex;
            align-items: flex-end;
            letter-spacing: 0.15px;
            position:absolute;
            bottom:20px;
          }
          input{
            border: 1px solid #fff;
            width: 15px;
            height:15px;
            margin-right: 7px;
            background: transparent;
          }

          `
        }

      </style>
    </div>
  )
}


const GoogleIcon = () => (
  <svg width="40" className="svg" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Icon/Outline/google">
      <path id="MaskGoogle" fillRule="evenodd" clipRule="evenodd" d="M20.0048 6.66671C16.3681 6.66671 12.9715 8.10171 10.4381 10.71C7.9048 13.315 6.56814 16.7534 6.67314 20.3917C6.86814 27.2317 12.5881 33.03 19.4215 33.32C26.7248 33.6084 32.9531 27.9667 33.3248 20.6984C33.3365 20.485 33.3348 19.5434 33.3315 18.6667H21.6615V21.3034H30.5098L29.8348 23.4667C28.6331 27.3234 25.5865 29.97 21.6848 30.5467C18.7748 30.9684 15.7431 30.1367 13.3715 28.2417C11.0431 26.3867 9.58314 23.69 9.36314 20.8417C9.13314 17.83 10.1281 14.96 12.1715 12.755C14.9481 9.75504 19.4365 8.60004 23.2831 9.84837L24.5715 7.46671C23.1131 6.93504 21.5815 6.66671 20.0048 6.66671ZM19.9931 36.665C19.7581 36.665 19.5198 36.66 19.2814 36.65C10.7348 36.2884 3.58477 29.0384 3.33977 20.4867C3.21143 15.94 4.88143 11.6434 8.04644 8.38671C11.2148 5.12837 15.4598 3.33337 20.0048 3.33337C22.3948 3.33337 24.7048 3.83004 26.8698 4.80837C27.4714 5.08004 27.9398 5.59671 28.1514 6.22671C28.3664 6.86504 28.3064 7.57171 27.9864 8.16337L25.8331 12.1367C25.2481 13.2234 23.9281 13.69 22.7748 13.2084C20.0198 12.0867 16.6531 12.82 14.6164 15.02C13.2131 16.535 12.5281 18.5117 12.6864 20.585C12.8364 22.515 13.8431 24.355 15.4498 25.6367C17.1064 26.9584 19.2098 27.5467 21.1964 27.25C23.0298 26.9784 24.5498 26.0584 25.5831 24.6367H20.7448C19.4131 24.6367 18.3281 23.5534 18.3281 22.22V17.75C18.3281 16.4184 19.4131 15.3334 20.7448 15.3334H34.2448C35.5664 15.3334 36.6514 16.4084 36.6614 17.73C36.6664 18.7817 36.6698 20.56 36.6548 20.8667C36.1998 29.72 28.7948 36.665 19.9931 36.665Z" fill="white" />
      <mask id="maskGoogle" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="3" width="34" height="34">
        <path id="MaskGoogle" fillRule="evenodd" clipRule="evenodd" d="M20.0048 6.66671C16.3681 6.66671 12.9715 8.10171 10.4381 10.71C7.9048 13.315 6.56814 16.7534 6.67314 20.3917C6.86814 27.2317 12.5881 33.03 19.4215 33.32C26.7248 33.6084 32.9531 27.9667 33.3248 20.6984C33.3365 20.485 33.3348 19.5434 33.3315 18.6667H21.6615V21.3034H30.5098L29.8348 23.4667C28.6331 27.3234 25.5865 29.97 21.6848 30.5467C18.7748 30.9684 15.7431 30.1367 13.3715 28.2417C11.0431 26.3867 9.58314 23.69 9.36314 20.8417C9.13314 17.83 10.1281 14.96 12.1715 12.755C14.9481 9.75504 19.4365 8.60004 23.2831 9.84837L24.5715 7.46671C23.1131 6.93504 21.5815 6.66671 20.0048 6.66671ZM19.9931 36.665C19.7581 36.665 19.5198 36.66 19.2814 36.65C10.7348 36.2884 3.58477 29.0384 3.33977 20.4867C3.21143 15.94 4.88143 11.6434 8.04644 8.38671C11.2148 5.12837 15.4598 3.33337 20.0048 3.33337C22.3948 3.33337 24.7048 3.83004 26.8698 4.80837C27.4714 5.08004 27.9398 5.59671 28.1514 6.22671C28.3664 6.86504 28.3064 7.57171 27.9864 8.16337L25.8331 12.1367C25.2481 13.2234 23.9281 13.69 22.7748 13.2084C20.0198 12.0867 16.6531 12.82 14.6164 15.02C13.2131 16.535 12.5281 18.5117 12.6864 20.585C12.8364 22.515 13.8431 24.355 15.4498 25.6367C17.1064 26.9584 19.2098 27.5467 21.1964 27.25C23.0298 26.9784 24.5498 26.0584 25.5831 24.6367H20.7448C19.4131 24.6367 18.3281 23.5534 18.3281 22.22V17.75C18.3281 16.4184 19.4131 15.3334 20.7448 15.3334H34.2448C35.5664 15.3334 36.6514 16.4084 36.6614 17.73C36.6664 18.7817 36.6698 20.56 36.6548 20.8667C36.1998 29.72 28.7948 36.665 19.9931 36.665Z" fill="white" />
      </mask>
      <g mask="url(#maskGoogle)">
        <g id="&#240;&#159;&#142;&#168; Color">
          <rect id="Base" width="40" height="40" fill="white" />
        </g>
      </g>
    </g>
  </svg>
)

const FacebookIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Icon/Outline/facebook">
      <path id="Mask1" fillRule="evenodd" clipRule="evenodd" d="M16.6667 33.3334H20V23C20 22.0784 20.745 21.3334 21.6667 21.3334H25.4L26.1417 18.6667H21.6667C20.745 18.6667 20 17.9217 20 17V12.5C20 10.7534 21.495 9.33337 23.3334 9.33337H26.6667V6.66671H23.3334C19.6567 6.66671 16.6667 9.28337 16.6667 12.5V17C16.6667 17.9217 15.9217 18.6667 15 18.6667H11.6667V21.3334H15C15.9217 21.3334 16.6667 22.0784 16.6667 23V33.3334ZM21.6667 36.6667H15C14.0784 36.6667 13.3334 35.9217 13.3334 35V24.6667H10C9.07837 24.6667 8.33337 23.9217 8.33337 23V17C8.33337 16.0784 9.07837 15.3334 10 15.3334H13.3334V12.5C13.3334 7.44671 17.8184 3.33337 23.3334 3.33337H28.3334C29.255 3.33337 30 4.07837 30 5.00004V11C30 11.92 29.255 12.6667 28.3334 12.6667H23.3334V15.3334H28.3334C28.8534 15.3334 29.345 15.5784 29.66 15.9917C29.975 16.4067 30.0784 16.945 29.94 17.4467L28.2734 23.445C28.0734 24.1667 27.415 24.6667 26.6667 24.6667H23.3334V35C23.3334 35.9217 22.5884 36.6667 21.6667 36.6667Z" fill="white" />
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="8" y="3" width="23" height="34">
        <path id="Mask_2" fillRule="evenodd" clipRule="evenodd" d="M16.6667 33.3334H20V23C20 22.0784 20.745 21.3334 21.6667 21.3334H25.4L26.1417 18.6667H21.6667C20.745 18.6667 20 17.9217 20 17V12.5C20 10.7534 21.495 9.33337 23.3334 9.33337H26.6667V6.66671H23.3334C19.6567 6.66671 16.6667 9.28337 16.6667 12.5V17C16.6667 17.9217 15.9217 18.6667 15 18.6667H11.6667V21.3334H15C15.9217 21.3334 16.6667 22.0784 16.6667 23V33.3334ZM21.6667 36.6667H15C14.0784 36.6667 13.3334 35.9217 13.3334 35V24.6667H10C9.07837 24.6667 8.33337 23.9217 8.33337 23V17C8.33337 16.0784 9.07837 15.3334 10 15.3334H13.3334V12.5C13.3334 7.44671 17.8184 3.33337 23.3334 3.33337H28.3334C29.255 3.33337 30 4.07837 30 5.00004V11C30 11.92 29.255 12.6667 28.3334 12.6667H23.3334V15.3334H28.3334C28.8534 15.3334 29.345 15.5784 29.66 15.9917C29.975 16.4067 30.0784 16.945 29.94 17.4467L28.2734 23.445C28.0734 24.1667 27.415 24.6667 26.6667 24.6667H23.3334V35C23.3334 35.9217 22.5884 36.6667 21.6667 36.6667Z" fill="white" />
      </mask>
      <g mask="url(#mask0)">
        <g id="&#240;&#159;&#142;&#168; Color">
          <rect id="Base" width="40" height="40" fill="white" />
        </g>
      </g>
    </g>
  </svg>
)
const LinkdinIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Icon/Outline/linkedin">
      <path id="Mask2" fillRule="evenodd" clipRule="evenodd" d="M6.66674 16.6666H6.6634L6.66674 33.3333H10.0001V16.6666H6.66674ZM10 36.6666H6.66671C4.82837 36.6666 3.33337 35.1716 3.33337 33.3333V16.6666C3.33337 14.8283 4.82837 13.3333 6.66671 13.3333H10C11.8384 13.3333 13.3334 14.8283 13.3334 16.6666V33.3333C13.3334 35.1716 11.8384 36.6666 10 36.6666ZM25.8416 19.4873C26.0966 19.4873 26.3549 19.509 26.6099 19.549C28.8599 19.9173 30.5549 21.994 30.5549 24.3823V33.334H33.3333V24.2306C33.3333 20.0606 29.9699 16.6673 25.8333 16.6673C21.6983 16.6673 18.3333 20.0606 18.3333 24.2306V33.334H21.1116V24.2306C21.1116 22.8323 21.7199 21.5123 22.7833 20.609C23.6433 19.879 24.7249 19.4873 25.8416 19.4873ZM33.3333 36.6673H30.5549C28.7183 36.6673 27.2216 35.1706 27.2216 33.334V24.3823C27.2216 23.6206 26.7166 22.944 26.0749 22.8406C25.5149 22.744 25.1249 22.994 24.9433 23.1473C24.6266 23.4173 24.4449 23.8123 24.4449 24.2306V33.334C24.4449 35.1706 22.9499 36.6673 21.1116 36.6673H18.3333C16.4966 36.6673 14.9999 35.1706 14.9999 33.334V24.2306C14.9999 18.2206 19.8599 13.334 25.8333 13.334C31.8066 13.334 36.6666 18.2206 36.6666 24.2306V33.334C36.6666 35.1706 35.1716 36.6673 33.3333 36.6673ZM8.33337 4.99996C7.41337 4.99996 6.66671 5.74663 6.66671 6.66663C6.66671 7.58663 7.41337 8.33329 8.33337 8.33329C9.25337 8.33329 10 7.58663 10 6.66663C10 5.74663 9.25337 4.99996 8.33337 4.99996ZM8.33337 11.6666C5.57671 11.6666 3.33337 9.42329 3.33337 6.66663C3.33337 3.90996 5.57671 1.66663 8.33337 1.66663C11.09 1.66663 13.3334 3.90996 13.3334 6.66663C13.3334 9.42329 11.09 11.6666 8.33337 11.6666Z" fill="white" />
      <mask id="mask10" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="1" width="34" height="36">
        <path id="Mask_12" fillRule="evenodd" clipRule="evenodd" d="M6.66674 16.6666H6.6634L6.66674 33.3333H10.0001V16.6666H6.66674ZM10 36.6666H6.66671C4.82837 36.6666 3.33337 35.1716 3.33337 33.3333V16.6666C3.33337 14.8283 4.82837 13.3333 6.66671 13.3333H10C11.8384 13.3333 13.3334 14.8283 13.3334 16.6666V33.3333C13.3334 35.1716 11.8384 36.6666 10 36.6666ZM25.8416 19.4873C26.0966 19.4873 26.3549 19.509 26.6099 19.549C28.8599 19.9173 30.5549 21.994 30.5549 24.3823V33.334H33.3333V24.2306C33.3333 20.0606 29.9699 16.6673 25.8333 16.6673C21.6983 16.6673 18.3333 20.0606 18.3333 24.2306V33.334H21.1116V24.2306C21.1116 22.8323 21.7199 21.5123 22.7833 20.609C23.6433 19.879 24.7249 19.4873 25.8416 19.4873ZM33.3333 36.6673H30.5549C28.7183 36.6673 27.2216 35.1706 27.2216 33.334V24.3823C27.2216 23.6206 26.7166 22.944 26.0749 22.8406C25.5149 22.744 25.1249 22.994 24.9433 23.1473C24.6266 23.4173 24.4449 23.8123 24.4449 24.2306V33.334C24.4449 35.1706 22.9499 36.6673 21.1116 36.6673H18.3333C16.4966 36.6673 14.9999 35.1706 14.9999 33.334V24.2306C14.9999 18.2206 19.8599 13.334 25.8333 13.334C31.8066 13.334 36.6666 18.2206 36.6666 24.2306V33.334C36.6666 35.1706 35.1716 36.6673 33.3333 36.6673ZM8.33337 4.99996C7.41337 4.99996 6.66671 5.74663 6.66671 6.66663C6.66671 7.58663 7.41337 8.33329 8.33337 8.33329C9.25337 8.33329 10 7.58663 10 6.66663C10 5.74663 9.25337 4.99996 8.33337 4.99996ZM8.33337 11.6666C5.57671 11.6666 3.33337 9.42329 3.33337 6.66663C3.33337 3.90996 5.57671 1.66663 8.33337 1.66663C11.09 1.66663 13.3334 3.90996 13.3334 6.66663C13.3334 9.42329 11.09 11.6666 8.33337 11.6666Z" fill="white" />
      </mask>
      <g mask="url(#mask10)">
        <g id="&#240;&#159;&#142;&#168; Color">
          <rect id="Base" width="40" height="40" fill="white" />
        </g>
      </g>
    </g>
  </svg>
)

const TwitterIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Icon/Outline/twitter">
      <path id="MaskTwitter" fillRule="evenodd" clipRule="evenodd" d="M31.6927 11.0906V11.0939V11.0906ZM14.1877 29.9956C14.2277 29.9956 14.271 29.9972 14.311 30.0006C23.8027 29.9389 29.4677 22.6872 29.4677 15.6772C29.4677 15.0406 29.7944 14.6289 30.0844 14.2639C30.3477 13.9306 30.756 13.4172 31.1194 12.6772C29.7977 12.6639 28.6177 12.0772 27.931 11.2739C27.2127 10.5056 26.181 10.0356 25.0677 10.0022C23.9944 9.95889 22.8994 10.3722 22.086 11.1439C21.0027 12.1722 20.5394 13.7239 20.876 15.1906L21.311 17.0889L19.3677 17.2256C14.341 17.6022 10.8577 15.4506 8.46602 13.2239C8.47602 16.5906 9.59436 21.0822 14.6777 23.9789L16.2744 24.8889L15.2127 26.3906C14.1077 27.9556 12.4444 28.9539 10.751 29.5922C11.8694 29.8589 13.0194 29.9956 14.166 29.9956H14.186H14.1877ZM14.1877 33.3339C14.1444 33.3339 14.0977 33.3322 14.0544 33.3289C11.3827 33.3106 8.70271 32.6889 6.29605 31.5239C5.39105 31.0839 4.87938 30.1206 5.02438 29.1206C5.17105 28.1089 5.94771 27.3156 6.95438 27.1522C8.69605 26.8656 10.141 26.3556 11.1877 25.6739C4.72605 20.8422 4.89605 13.6089 5.31438 10.5456C5.43771 9.64889 6.07605 8.90055 6.93938 8.63889C7.81605 8.37222 8.72438 8.63889 9.32438 9.32055C11.8844 12.2222 14.4427 13.6806 17.4427 13.9022C17.5294 11.9606 18.356 10.0889 19.791 8.72555C21.2527 7.33722 23.1644 6.61055 25.171 6.67055C27.1794 6.73222 29.0427 7.57889 30.416 9.05389C30.556 9.21389 31.0794 9.50389 31.711 9.22055C32.5394 8.84889 33.481 8.97222 34.1677 9.54555C34.8527 10.1139 35.1444 11.0089 34.931 11.8806C34.3927 14.0989 33.3294 15.5289 32.7927 16.2139C32.5127 24.7222 25.5994 33.3339 14.1877 33.3339Z" fill="white" />
      <mask id="maskTwitter" mask-type="alpha" maskUnits="userSpaceOnUse" x="5" y="6" width="30" height="28">
        <path id="MaskTwitter" fillRule="evenodd" clipRule="evenodd" d="M31.6927 11.0906V11.0939V11.0906ZM14.1877 29.9956C14.2277 29.9956 14.271 29.9972 14.311 30.0006C23.8027 29.9389 29.4677 22.6872 29.4677 15.6772C29.4677 15.0406 29.7944 14.6289 30.0844 14.2639C30.3477 13.9306 30.756 13.4172 31.1194 12.6772C29.7977 12.6639 28.6177 12.0772 27.931 11.2739C27.2127 10.5056 26.181 10.0356 25.0677 10.0022C23.9944 9.95889 22.8994 10.3722 22.086 11.1439C21.0027 12.1722 20.5394 13.7239 20.876 15.1906L21.311 17.0889L19.3677 17.2256C14.341 17.6022 10.8577 15.4506 8.46602 13.2239C8.47602 16.5906 9.59436 21.0822 14.6777 23.9789L16.2744 24.8889L15.2127 26.3906C14.1077 27.9556 12.4444 28.9539 10.751 29.5922C11.8694 29.8589 13.0194 29.9956 14.166 29.9956H14.186H14.1877ZM14.1877 33.3339C14.1444 33.3339 14.0977 33.3322 14.0544 33.3289C11.3827 33.3106 8.70271 32.6889 6.29605 31.5239C5.39105 31.0839 4.87938 30.1206 5.02438 29.1206C5.17105 28.1089 5.94771 27.3156 6.95438 27.1522C8.69605 26.8656 10.141 26.3556 11.1877 25.6739C4.72605 20.8422 4.89605 13.6089 5.31438 10.5456C5.43771 9.64889 6.07605 8.90055 6.93938 8.63889C7.81605 8.37222 8.72438 8.63889 9.32438 9.32055C11.8844 12.2222 14.4427 13.6806 17.4427 13.9022C17.5294 11.9606 18.356 10.0889 19.791 8.72555C21.2527 7.33722 23.1644 6.61055 25.171 6.67055C27.1794 6.73222 29.0427 7.57889 30.416 9.05389C30.556 9.21389 31.0794 9.50389 31.711 9.22055C32.5394 8.84889 33.481 8.97222 34.1677 9.54555C34.8527 10.1139 35.1444 11.0089 34.931 11.8806C34.3927 14.0989 33.3294 15.5289 32.7927 16.2139C32.5127 24.7222 25.5994 33.3339 14.1877 33.3339Z" fill="white" />
      </mask>
      <g mask="url(#maskTwitter)">
        <g id="&#240;&#159;&#142;&#168; Color">
          <rect id="Base" width="40" height="40" fill="white" />
        </g>
      </g>
    </g>
  </svg>
)
