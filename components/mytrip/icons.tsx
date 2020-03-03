import React from 'react'

export enum ICONS {
  CONTACT='CONTACT',
  PAYMENTS='PAYMENTS',
  ITINERARY='ITINERARY',
  PRETRIP='PRETRIP',
  CHECKLIST='CHECKLIST',
  OUTLINED_PHONE = 'OUTLINED_PHONE',
  EMAIL = 'EMAIL'
}

interface Props {
  icon: string
  selected?: string
}

export default (props: Props) => {
  const { icon, selected } = props

  const Contact = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.27197 15.8555C9.39404 18.9775 13.291 21.437 16.5142 21.437C17.9741 21.437 19.2432 20.9316 20.2651 19.8198C20.8379 19.2134 21.2759 18.4272 21.2759 17.6748C21.2759 17.1357 21.0625 16.6191 20.5234 16.2373L17.0869 13.8228C16.6265 13.4971 16.2109 13.3174 15.8066 13.3174C15.3125 13.3174 14.8408 13.5869 14.313 14.0923L13.4932 14.8896C13.3809 15.0132 13.2236 15.0581 13.0776 15.0581C12.9204 15.0581 12.7632 15.002 12.6396 14.9458C11.9771 14.5977 10.7754 13.6431 9.62988 12.4976C8.49561 11.3521 7.50732 10.1616 7.18164 9.47656C7.12549 9.35303 7.06934 9.20703 7.06934 9.07227C7.06934 8.92627 7.11426 8.7915 7.23779 8.66797L8.03516 7.82568C8.5293 7.28662 8.79883 6.81494 8.79883 6.3208C8.79883 5.9165 8.63037 5.50098 8.29346 5.0293L5.94629 1.69385C5.54199 1.14355 4.9917 0.896484 4.39648 0.896484C3.67773 0.896484 2.92529 1.24463 2.2627 1.88477C1.18457 2.9292 0.712891 4.2207 0.712891 5.64697C0.712891 8.85889 3.13867 12.7222 6.27197 15.8555Z" fill={selected === ICONS.CONTACT ? '#38b2ac' : '#EDF2F7'} />
    </svg>
  )

  const Payment = () => (
    <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.6167 19.1455H21.3833C23.5732 19.1455 24.6851 18.0225 24.6851 15.8662V3.86084C24.6851 1.69336 23.5732 0.570312 21.3833 0.570312H3.6167C1.41553 0.570312 0.303711 1.68213 0.303711 3.86084V15.8662C0.303711 18.0337 1.41553 19.1455 3.6167 19.1455ZM1.69629 3.92822C1.69629 2.63672 2.38135 1.96289 3.63916 1.96289H21.3496C22.585 1.96289 23.3037 2.63672 23.3037 3.92822V4.82666H1.69629V3.92822ZM3.63916 17.7529C2.38135 17.7529 1.69629 17.0903 1.69629 15.7876V7.34229H23.3037V15.7876C23.3037 17.0903 22.585 17.7529 21.3496 17.7529H3.63916ZM4.99805 14.2153H7.74951C8.41211 14.2153 8.86133 13.7661 8.86133 13.1372V11.0483C8.86133 10.4194 8.41211 9.98145 7.74951 9.98145H4.99805C4.34668 9.98145 3.89746 10.4194 3.89746 11.0483V13.1372C3.89746 13.7661 4.34668 14.2153 4.99805 14.2153Z" fill={selected === ICONS.PAYMENTS ? '#38b2ac' : '#EDF2F7'} />
    </svg>
  )

  const Itineray = () => (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.18359 21.0776H19.8052C21.9951 21.0776 23.1182 19.9546 23.1182 17.7983V4.02979C23.1182 1.8623 21.9951 0.739258 19.8052 0.739258H4.18359C1.99365 0.739258 0.870605 1.85107 0.870605 4.02979V17.7983C0.870605 19.9658 1.99365 21.0776 4.18359 21.0776ZM4.08252 19.6851C2.90332 19.6851 2.26318 19.0674 2.26318 17.8545V7.57861C2.26318 6.36572 2.90332 5.73682 4.08252 5.73682H19.895C21.0518 5.73682 21.7256 6.36572 21.7256 7.57861V17.8545C21.7256 19.0674 21.0518 19.6851 19.895 19.6851H4.08252ZM9.75391 9.73486H10.4165C10.7759 9.73486 10.8657 9.64502 10.8657 9.29688V8.63428C10.8657 8.28613 10.7759 8.19629 10.4165 8.19629H9.75391C9.40576 8.19629 9.30469 8.28613 9.30469 8.63428V9.29688C9.30469 9.64502 9.40576 9.73486 9.75391 9.73486ZM13.561 9.73486H14.2236C14.583 9.73486 14.6729 9.64502 14.6729 9.29688V8.63428C14.6729 8.28613 14.583 8.19629 14.2236 8.19629H13.561C13.2129 8.19629 13.1118 8.28613 13.1118 8.63428V9.29688C13.1118 9.64502 13.2129 9.73486 13.561 9.73486ZM17.3794 9.73486H18.0308C18.3901 9.73486 18.48 9.64502 18.48 9.29688V8.63428C18.48 8.28613 18.3901 8.19629 18.0308 8.19629H17.3794C17.02 8.19629 16.9302 8.28613 16.9302 8.63428V9.29688C16.9302 9.64502 17.02 9.73486 17.3794 9.73486ZM5.94678 13.4746H6.60938C6.96875 13.4746 7.05859 13.396 7.05859 13.0479V12.3853C7.05859 12.0371 6.96875 11.9473 6.60938 11.9473H5.94678C5.59863 11.9473 5.49756 12.0371 5.49756 12.3853V13.0479C5.49756 13.396 5.59863 13.4746 5.94678 13.4746ZM9.75391 13.4746H10.4165C10.7759 13.4746 10.8657 13.396 10.8657 13.0479V12.3853C10.8657 12.0371 10.7759 11.9473 10.4165 11.9473H9.75391C9.40576 11.9473 9.30469 12.0371 9.30469 12.3853V13.0479C9.30469 13.396 9.40576 13.4746 9.75391 13.4746ZM13.561 13.4746H14.2236C14.583 13.4746 14.6729 13.396 14.6729 13.0479V12.3853C14.6729 12.0371 14.583 11.9473 14.2236 11.9473H13.561C13.2129 11.9473 13.1118 12.0371 13.1118 12.3853V13.0479C13.1118 13.396 13.2129 13.4746 13.561 13.4746ZM17.3794 13.4746H18.0308C18.3901 13.4746 18.48 13.396 18.48 13.0479V12.3853C18.48 12.0371 18.3901 11.9473 18.0308 11.9473H17.3794C17.02 11.9473 16.9302 12.0371 16.9302 12.3853V13.0479C16.9302 13.396 17.02 13.4746 17.3794 13.4746ZM5.94678 17.2256H6.60938C6.96875 17.2256 7.05859 17.147 7.05859 16.7988V16.1362C7.05859 15.7881 6.96875 15.6982 6.60938 15.6982H5.94678C5.59863 15.6982 5.49756 15.7881 5.49756 16.1362V16.7988C5.49756 17.147 5.59863 17.2256 5.94678 17.2256ZM9.75391 17.2256H10.4165C10.7759 17.2256 10.8657 17.147 10.8657 16.7988V16.1362C10.8657 15.7881 10.7759 15.6982 10.4165 15.6982H9.75391C9.40576 15.6982 9.30469 15.7881 9.30469 16.1362V16.7988C9.30469 17.147 9.40576 17.2256 9.75391 17.2256ZM13.561 17.2256H14.2236C14.583 17.2256 14.6729 17.147 14.6729 16.7988V16.1362C14.6729 15.7881 14.583 15.6982 14.2236 15.6982H13.561C13.2129 15.6982 13.1118 15.7881 13.1118 16.1362V16.7988C13.1118 17.147 13.2129 17.2256 13.561 17.2256Z" fill={selected === ICONS.ITINERARY ? '#38b2ac' : '#EDF2F7'} />
    </svg>
  )

  const Info = () => (
    <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5 23.167C17.6655 23.167 22.7642 18.0684 22.7642 11.9028C22.7642 5.7373 17.6655 0.638672 11.4888 0.638672C5.32324 0.638672 0.23584 5.7373 0.23584 11.9028C0.23584 18.0684 5.33447 23.167 11.5 23.167ZM11.5 21.7183C6.06445 21.7183 1.6958 17.3384 1.6958 11.9028C1.6958 6.46729 6.06445 2.09863 11.4888 2.09863C16.9243 2.09863 21.3042 6.46729 21.3154 11.9028C21.3154 17.3384 16.9355 21.7183 11.5 21.7183ZM11.4326 7.65771C12.1289 7.65771 12.668 7.11865 12.668 6.43359C12.668 5.74854 12.1289 5.19824 11.4326 5.19824C10.7476 5.19824 10.1973 5.74854 10.1973 6.43359C10.1973 7.11865 10.7476 7.65771 11.4326 7.65771ZM9.48975 18.0234H14.0942C14.4536 18.0234 14.7344 17.7539 14.7344 17.4058C14.7344 17.0576 14.4536 16.7769 14.0942 16.7769H12.4771V10.4878C12.4771 10.0273 12.2412 9.71289 11.792 9.71289H9.63574C9.27637 9.71289 8.99561 9.99365 8.99561 10.3306C8.99561 10.6899 9.27637 10.9595 9.63574 10.9595H11.1069V16.7769H9.48975C9.13037 16.7769 8.84961 17.0576 8.84961 17.4058C8.84961 17.7539 9.13037 18.0234 9.48975 18.0234Z" fill={selected === ICONS.PRETRIP ? '#38b2ac' : '#EDF2F7'} />
    </svg>
  )

  const List = () => (
    <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.20703 3.52344C2.94824 3.52344 3.54346 2.92822 3.54346 2.18701C3.54346 1.4458 2.94824 0.850586 2.20703 0.850586C1.46582 0.850586 0.870605 1.4458 0.870605 2.18701C0.870605 2.92822 1.46582 3.52344 2.20703 3.52344ZM6.97998 2.8833H22.4219C22.8149 2.8833 23.1182 2.58008 23.1182 2.18701C23.1182 1.79395 22.8149 1.50195 22.4219 1.50195H6.97998C6.58691 1.50195 6.28369 1.79395 6.28369 2.18701C6.28369 2.58008 6.58691 2.8833 6.97998 2.8833ZM2.20703 10.2393C2.94824 10.2393 3.54346 9.64404 3.54346 8.90283C3.54346 8.16162 2.94824 7.56641 2.20703 7.56641C1.46582 7.56641 0.870605 8.16162 0.870605 8.90283C0.870605 9.64404 1.46582 10.2393 2.20703 10.2393ZM6.97998 9.59912H22.4219C22.8149 9.59912 23.1182 9.2959 23.1182 8.90283C23.1182 8.50977 22.8149 8.20654 22.4219 8.20654H6.97998C6.58691 8.20654 6.28369 8.50977 6.28369 8.90283C6.28369 9.2959 6.58691 9.59912 6.97998 9.59912ZM2.20703 16.9551C2.94824 16.9551 3.54346 16.3599 3.54346 15.6187C3.54346 14.8774 2.94824 14.2822 2.20703 14.2822C1.46582 14.2822 0.870605 14.8774 0.870605 15.6187C0.870605 16.3599 1.46582 16.9551 2.20703 16.9551ZM6.97998 16.3149H22.4219C22.8149 16.3149 23.1182 16.0117 23.1182 15.6187C23.1182 15.2256 22.8149 14.9224 22.4219 14.9224H6.97998C6.58691 14.9224 6.28369 15.2256 6.28369 15.6187C6.28369 16.0117 6.58691 16.3149 6.97998 16.3149Z" fill="#EDF2F7" />
    </svg>
  )

  const OutLinedPhone = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.7344 23.035C19.7852 23.035 21.1328 22.4842 22.3164 21.1482C22.4102 21.0545 22.5039 20.949 22.5859 20.8553C23.2891 20.0701 23.6172 19.2967 23.6172 18.5584C23.6172 17.7146 23.125 16.9295 22.082 16.2029L18.6719 13.8357C17.6172 13.1092 16.3867 13.0271 15.4023 13.9998L14.5 14.9021C14.2305 15.1717 13.9961 15.1834 13.7383 15.0193C13.1055 14.6209 11.8281 13.5076 10.9609 12.6404C10.0469 11.7381 9.16797 10.7303 8.69922 9.99199C8.54688 9.72246 8.55859 9.4998 8.82812 9.23027L9.71875 8.32793C10.7031 7.34355 10.6211 6.10137 9.89453 5.0584L7.52734 1.64824C6.80078 0.605273 6.01562 0.124805 5.17188 0.113086C4.43359 0.101367 3.66016 0.441211 2.875 1.14434C2.76953 1.23809 2.67578 1.32012 2.58203 1.40215C1.24609 2.59746 0.695312 3.94512 0.695312 5.97246C0.695312 9.32402 2.75781 13.4021 6.54297 17.1873C10.3047 20.949 14.3945 23.035 17.7344 23.035ZM17.7461 21.2303C14.7578 21.2889 10.9258 18.992 7.89062 15.9686C4.83203 12.9217 2.42969 8.96074 2.48828 5.97246C2.51172 4.6834 2.96875 3.57012 3.88281 2.77324C3.96484 2.70293 4.02344 2.64434 4.10547 2.58574C4.45703 2.28105 4.83203 2.11699 5.17188 2.11699C5.51172 2.11699 5.81641 2.2459 6.03906 2.59746L8.3125 6.00762C8.55859 6.3709 8.58203 6.78105 8.21875 7.14434L7.1875 8.17559C6.37891 8.98418 6.4375 9.96855 7.02344 10.7537C7.69141 11.6561 8.85156 12.9686 9.75391 13.8592C10.6445 14.7615 12.0625 16.0271 12.9766 16.7068C13.7617 17.2928 14.7461 17.3514 15.5547 16.5428L16.5859 15.5115C16.9492 15.1482 17.3477 15.1717 17.7227 15.4061L21.1328 17.6795C21.4844 17.9139 21.6133 18.2068 21.6133 18.5584C21.6133 18.8982 21.4492 19.2732 21.1445 19.6248C21.0742 19.7068 21.0273 19.7654 20.957 19.8475C20.1602 20.7615 19.0469 21.2068 17.7461 21.2303Z" fill="#F7FAFC" />
    </svg>
  )

  const Email = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.82812 0.183594C4.13281 0.183594 0.148438 4.10938 0.148438 9.95703C0.148438 16.2617 4.30859 19.7422 10.0273 19.7422C11.5391 19.7422 12.9453 19.5312 13.9766 19.168V17.6914C13.2148 18.0312 11.6211 18.2539 10.0508 18.2539C5.33984 18.2539 1.80078 15.3359 1.80078 10.0273C1.80078 5.12891 5.11719 1.66016 9.67578 1.66016C14.3398 1.66016 17.5742 4.53125 17.5742 8.78516C17.5742 11.8203 16.543 13.5312 15.1484 13.5312C14.2461 13.5312 13.8242 12.9922 13.8242 12.2305V5.35156H12.0547V6.78125H11.9609C11.5156 5.78516 10.3789 5.12891 9.125 5.12891C6.72266 5.12891 5.04688 7.12109 5.04688 9.96875C5.04688 12.9453 6.6875 14.9492 9.125 14.9492C10.5078 14.9492 11.5977 14.2695 12.1016 13.0859H12.1953C12.3359 14.2578 13.4844 15.0547 14.8203 15.0547C17.5625 15.0547 19.2266 12.5586 19.2266 8.80859C19.2266 3.64062 15.2773 0.183594 9.82812 0.183594ZM9.41797 6.74609C11.0117 6.74609 12.0312 8.01172 12.0312 10.0156C12.0312 12.0195 11 13.2969 9.39453 13.2969C7.85938 13.2969 6.92188 12.0547 6.92188 10.0156C6.92188 7.96484 7.84766 6.74609 9.41797 6.74609Z" fill="#F7FAFC" />
    </svg>
  )


  const retrieveIcon = () => {
    switch (icon) {
      case ICONS.CONTACT:
        return <Contact />
      case ICONS.PAYMENTS:
        return <Payment />
      case ICONS.PRETRIP:
        return <Info />
      case ICONS.CHECKLIST:
        return <List />
      case ICONS.OUTLINED_PHONE:
        return <OutLinedPhone />
      case ICONS.EMAIL:
        return <Email />
      default:
        return <Itineray />
    }
  }
  return (<div>{retrieveIcon()}</div>)
}