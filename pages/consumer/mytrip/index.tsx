/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import Loading from '../../../components/loading'
import Panel from '../../../components/mytrip/panel'

import bs, { PAYMENT_COMMITMENT_KIND } from '../../../services/business'
import Icon, { ICONS } from '../../../components/mytrip/icons'
import SectionContact from '../../../components/mytrip/section_contact'
import SectionPreTrip from '../../../components/mytrip/section_pretrip'
import SectionCheckList from '../../../components/mytrip/section_checklist'
import ItinerayList from '../../../components/reservation/itinerary_list'
import PaymentTeamMember from '../../../components/mytrip/payment_team_member'
import {
  setMyTripReservation, setMyTripGroupLeader, setMyTripReservationToken, setMyTripAreGroupLeader,
} from '../../../redux/actions/mytrip'

export default () => {
  const SECTIONS = ICONS
  const [sectionSelected, setSectionSelected] = useState(SECTIONS.CONTACT)
  const router = useRouter()
  const { accessToken } = router.query
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState(null)

  const reservation : Reservation = useSelector((state) => state.myTrip.reservation)
  const [showCheckoutStripe, setShowCheckouStripe] = useState(false)
  const [reservationToken, setReservationToken] = useState<ReservationToken>(null)
  const [chargeServiceFeeToCustomer, setChargeServiceFeeToCustomer] = useState<boolean>(false)
  const [serviceChargeFeeSettings, setServiceChargeFeeSettings] = useState<{serviceChargeFeePercentage: number
    serviceChargeFeeFixedAmount: number}>(null)
  const [otherPaymentMethods, setOtherPaymentMethods] = useState(null)
  const dispatch = useDispatch()
  const [organization, setOrganization] = useState<Organization>(null)


  useEffect(() => {
    document.getElementsByTagName('html')[0].style.background = 'black'

    const fetch = async () => {
      if (!accessToken) {
        router.push('/consumer/404')
      }

      let rt = await bs.getReservationAccessToken(accessToken as string)
      const tk : TokenOuttripper = await bs.getToken()

      if (!tk) {
        router.push(`/consumer/login?accessToken=${accessToken}`)
        return
      }

      if (!rt.travellerId) {
        rt = await bs.bindTravellerIdToContact(rt, tk.userId, tk.photoAvatar)
      }

      const org: Organization = await bs.getOrganizationById(rt.organizationId)
      tk.organizationCn = org.cn
      tk.organizationId = org.id
      tk.rol = 'CONSUMER'
      bs.setToken(tk)
      const r = await bs.getReservation(rt.reservationId)

      const reservationTokenList : Array<ReservationToken> = await bs.getReservationAccessTokenByReservationId(rt.reservationId)

      const reservationTokenParent : ReservationToken = reservationTokenList.filter((_rt: ReservationToken) => _rt.paymentCommitmentKind)[0]

      if (reservationTokenParent && !rt.paymentCommitmentKind) {
        rt.paymentCommitmentKind = reservationTokenParent.paymentCommitmentKind
        bs.setPaymentCommitmentKindInReservationAccessToken(reservationTokenParent.paymentCommitmentKind as PAYMENT_COMMITMENT_KIND, rt)
      }

      if (r.pax.length === 1) {
        r.paymentCommitments = []
        r.paymentCommitments.push({
          amount: reservation.amountOfPurchase,
          pax: reservation.pax[0],
          payments: null,
        })
        bs.updateReservation(r)
        rt.paymentCommitmentKind = PAYMENT_COMMITMENT_KIND.SPLIT
        bs.setPaymentCommitmentKindInReservationAccessToken(PAYMENT_COMMITMENT_KIND.SPLIT, rt)
      }

      setOtherPaymentMethods(await bs.getOtherPaymentMethods())

      dispatch(setMyTripReservation(r))
      dispatch(setMyTripGroupLeader(r.pax[0]))

      dispatch(setMyTripReservationToken(rt))
      setOrganization(org)
      setReservationToken(rt)
      setToken(tk)
      setChargeServiceFeeToCustomer(await bs.getChargeServiceFeeToCustomer())
      setServiceChargeFeeSettings(await bs.getServiceChargeFeeSettings())


      // setReservation(r)
      if (rt.contactId === r.pax[0].id && !rt.paymentCommitmentKind) {
        router.push('/consumer/reservation/welcome_to_my_trip')
      } else {
        setIsLoading(false)
      }
      dispatch(setMyTripAreGroupLeader(r.pax[0].id === rt.contactId))
    }

    fetch()
  }, [])

  const renderSection = () => {
    let paymentsOfCustomer : Array<Payment> = null

    if (reservationToken.paymentCommitmentKind) { paymentsOfCustomer = reservation.paymentCommitments.filter((pc: PaymentCommitment) => pc.pax.id === reservationToken.contactId)[0].payments || [] }


    switch (sectionSelected) {
      case SECTIONS.PRETRIP:
        return <SectionPreTrip reservation={reservation} />
      case SECTIONS.CONTACT:
        return <SectionContact />
      case SECTIONS.CHECKLIST:
        return <SectionCheckList reservation={reservation} />
      case SECTIONS.PAYMENTS:
        return (
          <div>
            {reservationToken.paymentCommitmentKind ? (
              <PaymentTeamMember
                token={token}
                serviceChargeFeeSettings={serviceChargeFeeSettings}
                reservationToken={reservationToken}
                reservation={reservation}
                chargeServiceFeeToCustomer={chargeServiceFeeToCustomer}
                groupLeader={reservation.pax[0]}
                payments={paymentsOfCustomer}
                otherPaymentMethods={otherPaymentMethods}
                purchaseAmount={reservation.paymentCommitments.filter((pc: PaymentCommitment) => pc.pax.id === reservationToken.contactId)
                  .map((pc:PaymentCommitment) => pc.amount).reduce((t, v) => t += v)}
              />
            ) : (
              <div className="p-4 text-justify">
                IMPORTANT INFORMATION: Your group leader have not specified how your group will pay the reservation. Please, contact him to define how you must pay your reservation
              </div>
            )}
          </div>
        )
      default:
        return <ItinerayList darkMode reservation={reservation} />
    }
  }


  if (isLoading) return <Loading />


  // eslint-disable-next-line max-len
  const isInvited : boolean = !reservation.paymentCommitments.filter((pc) => pc.pax.id === reservationToken.contactId)[0].payments && reservation.paymentCommitments.filter((pc: PaymentCommitment) => pc.pax.id === reservationToken.contactId)[0].amount === 0


  return (
    <div className="h-screen w-screen bg-black p-4 relative">
      <header>
        <div className="mb-4 flex items-center mb-4">
          <div><IconBack /></div>
          <span className="text-white ml-6">Jurassic Lake - FullWeek program</span>
        </div>
        <div>
          <img alt="" src="https://res.cloudinary.com/dtyymz4nn/image/upload/v1581790163/Jurassic%20Lake/84191608_1794103200734607_3579079479928029184_n.jpg" />
        </div>
        <div className="flex overflow-x-scroll">
          <div className="p-4 h-24 w-24 flex-cols" onClick={() => setSectionSelected(SECTIONS.CONTACT)}>
            <Icon icon={ICONS.CONTACT} selected={sectionSelected} />
            <span className={`text-white text-xs ${sectionSelected === SECTIONS.CONTACT ? 'text-teal-500' : ''}`}>Contact</span>
          </div>
          {!isInvited ? (
            <div className="p-4 h-24 w-24 flex-cols" onClick={() => setSectionSelected(SECTIONS.PAYMENTS)}>
              <Icon icon={ICONS.PAYMENTS} selected={sectionSelected} />
              <span className={`text-white text-xs ${sectionSelected === SECTIONS.PAYMENTS ? 'text-teal-500' : ''}`}>Payments</span>
            </div>
          ) : ''}

          <div className="p-4 h-24 w-24 flex-cols" onClick={() => setSectionSelected(SECTIONS.ITINERARY)}>
            <Icon icon={ICONS.ITINERARY} selected={sectionSelected} />
            <span className={`text-white text-xs ${sectionSelected === SECTIONS.ITINERARY ? 'text-teal-500' : ''}`}>Itinerary</span>
          </div>
          <div className="p-4 h-24 w-24 flex-cols" onClick={() => setSectionSelected(SECTIONS.PRETRIP)}>
            <Icon icon={ICONS.PRETRIP} selected={sectionSelected} />
            <span className={`text-white text-xs ${sectionSelected === SECTIONS.PRETRIP ? 'text-teal-500' : ''}`}>Pre Trip</span>
          </div>
          <div className="p-4 h-24 w-24 flex-cols" onClick={() => setSectionSelected(SECTIONS.CHECKLIST)}>
            <Icon icon={ICONS.CHECKLIST} selected={sectionSelected} />
            <span className={`text-white text-xs ${sectionSelected === SECTIONS.CHECKLIST ? 'text-teal-500' : ''}`}>Check List</span>
          </div>
        </div>
      </header>
      <article className="text-white mb-8">
        {renderSection()}
      </article>

    </div>
  )
}


const IconBack = () => (
  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.33496 12.9502C6.51953 13.1279 6.73828 13.2236 6.99805 13.2236C7.52441 13.2236 7.95508 12.7998 7.95508 12.2734C7.95508 12.0137 7.8457 11.7676 7.6543 11.583L3.00586 7.05762L7.6543 2.5459C7.8457 2.35449 7.95508 2.1084 7.95508 1.85547C7.95508 1.3291 7.52441 0.905273 6.99805 0.905273C6.73145 0.905273 6.5127 0.994141 6.33496 1.17188L1.0918 6.29883C0.859375 6.52441 0.743164 6.77051 0.743164 7.06445C0.743164 7.35156 0.852539 7.59766 1.0918 7.83008L6.33496 12.9502Z" fill="#F7FAFC" />
  </svg>

)
