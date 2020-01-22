import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Calendar from '../components/availability/calendar'
import '../statics/style/style.css'
import BottomNavBar from '../components/bottom_nav_bar'
import bs from '../services/business'
import Loading from '../components/loading'
import { setProgram } from '../redux/actions/reservation'


const styleButtonSelected = 'buttonProgram mx-4 px-4 mt-4 w-1/2  bg-teal-800  flex items-center justify-center text-white'
const styleButtonUnSelected = 'buttonProgram mx-4 px-4 mt-4 w-1/2  border border-teal-800  flex items-center justify-center'

export default () => {
  const [availability, setAvailability] = useState<Array<AvailableDate>>(null)
  const [year, setYear] = useState<number>(new Date().getFullYear())
  // const [programSelected, setProgramSelected] = useState<Program>(null)
  const programSelected = useSelector((state) => state.reservation.programSelected)
  const [allPrograms, setAllPrograms] = useState<Array<Program>>([])
  const [paxSelected, setPaxSelected] = useState(null)
  const [showProgramMenu, setShowProgramMenu] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetch = async () => {
      const ap = await bs.getPrograms()
      const av = await bs.getAvailability(year)

      const preResult = []
      const grouped = []
      av.filter((d1) => d1.days.filter((d2) => d2 !== undefined).length > 0).map((w) => w.days.map((h) => (h !== undefined ? preResult.push(h) : null)))
      // eslint-disable-next-line no-return-assign
      preResult.map((r) => r.availability.map((t) => t.programId)).map((f) => grouped[f] = f)
      console.log(preResult)
      // console.log(Object.keys(grouped))
      setAllPrograms(ap)
      // console.log(ap)
      setAvailability(av)
    }
    fetch()
  }, [])

  const openMenuProgram = () => {
    setShowProgramMenu(true)
  }

  if (showProgramMenu) {
    return (
      <div className="relative bg-gray-400 h-screen">
        <div className="absolute inset-x-0 bottom-0 bg-white rounded-top ">
          <div className="flex justify-center"><div className="bg-gray-300 h-2 w-20 mt-2 rounded " /></div>
          <div className="flex">
            <div className="w-full flex justify-center font-semibold text-black border-b p-4"><span>Please Choice a program</span></div>
          </div>
          <div
            onClick={() => {
              dispatch(setProgram(null))
              setShowProgramMenu(false)
            }}
            key="Clear Selection"
            className="p-4 text-base text-indigo-500 border-b"
          >
              Clear Selection
          </div>

          {allPrograms.map((program: Program) => (
            <div
              onClick={() => {
                setShowProgramMenu(false)
                dispatch(setProgram(program))
              }}
              key={program.id}
              className="p-4 text-base text-indigo-500 border-b"
            >
              {`${program.name} ${program.bedNights} Nights / ${program.serviceDaysQuantity} fishing days`}
            </div>
          ))}
          <div className="flex justify-center"><span className="p-2 m-4 rounded-full bg-gray-300 w-20 flex justify-center" onClick={() => setShowProgramMenu(false)}>Cancel</span></div>
        </div>
        <style>
          {`
            .rounded-top { 
              border-top-left-radius: 1.5rem;
              border-top-right-radius: 1.5rem;
            }
          `}
        </style>
      </div>
    )
  }

  if (!availability) { return <Loading /> }

  return (
    <div className="container h-screen">
      <div className="flex">

        <div
          onClick={() => setShowProgramMenu(true)}
          className={programSelected ? styleButtonSelected : styleButtonUnSelected}
        >
          <span>{ programSelected ? programSelected.name : 'Program'}</span>
        </div>
        <div className={styleButtonUnSelected}>
          <span>Pax</span>
        </div>
      </div>


      <div className="flex items-center w-full mt-8">
        <div className="h-22 w-22 m-auto"><IconArrowLeft /></div>
        <div className="text-4xl font-bold text-gray-800 m-auto">{new Date().getFullYear()}</div>
        <div className="h-22 w-22 m-auto"><IconArrowRight /></div>
      </div>

      <Calendar year={new Date().getFullYear()} value={availability} defaultFunction={!programSelected ? openMenuProgram : null} />
      <BottomNavBar />
      <style>
        {`
        .container {
          display: grid;
          grid-template-rows: 55px 75px 68% 20px;
        }
        `}
      </style>
    </div>
  )
}


const IconArrowRight = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Icon/Outline/arrow-ios-right">
      <path id="MaskR" fillRule="evenodd" clipRule="evenodd" d="M16.6658 31.6651C16.2892 31.6651 15.9108 31.5384 15.5992 31.2784C14.8925 30.6901 14.7975 29.6384 15.3858 28.9317L22.8458 19.9801L15.6542 11.0434C15.0775 10.3267 15.1908 9.27675 15.9075 8.70008C16.6258 8.12341 17.6742 8.23675 18.2525 8.95341L26.2992 18.9534C26.7958 19.5717 26.7892 20.4551 26.2808 21.0651L17.9475 31.0651C17.6175 31.4601 17.1442 31.6651 16.6658 31.6651Z" fill="#3B414B" />
      <mask id="mask0R" mask-type="alpha" maskUnits="userSpaceOnUse" x="15" y="8" width="12" height="24">
        <path id="Mask_2R" fillRule="evenodd" clipRule="evenodd" d="M16.6658 31.6651C16.2892 31.6651 15.9108 31.5384 15.5992 31.2784C14.8925 30.6901 14.7975 29.6384 15.3858 28.9317L22.8458 19.9801L15.6542 11.0434C15.0775 10.3267 15.1908 9.27675 15.9075 8.70008C16.6258 8.12341 17.6742 8.23675 18.2525 8.95341L26.2992 18.9534C26.7958 19.5717 26.7892 20.4551 26.2808 21.0651L17.9475 31.0651C17.6175 31.4601 17.1442 31.6651 16.6658 31.6651Z" fill="white" />
      </mask>
      <g mask="url(#mask0R)">
        <g id="&#240;&#159;&#142;&#168; Color">
          <rect id="Base" width="40" height="40" fill="#3B414B" />
        </g>
      </g>
    </g>
  </svg>

)

const IconArrowLeft = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Icon/Outline/arrow-ios-left">
      <path id="MaskL" fillRule="evenodd" clipRule="evenodd" d="M23.0484 31.6684C22.5618 31.6684 22.0784 31.4568 21.7484 31.0468L13.7018 21.0468C13.2051 20.4284 13.2118 19.5451 13.7201 18.9351L22.0534 8.9351C22.6418 8.22843 23.6934 8.13343 24.4017 8.72176C25.1084 9.3101 25.2034 10.3618 24.6134 11.0684L17.1551 20.0201L24.3467 28.9568C24.9234 29.6734 24.8101 30.7234 24.0918 31.3001C23.7851 31.5484 23.4151 31.6684 23.0484 31.6684Z" fill="#3B414B" />
      <mask id="mask0L" mask-type="alpha" maskUnits="userSpaceOnUse" x="13" y="8" width="13" height="24">
        <path id="Mask_2L" fillRule="evenodd" clipRule="evenodd" d="M23.0484 31.6684C22.5618 31.6684 22.0784 31.4568 21.7484 31.0468L13.7018 21.0468C13.2051 20.4284 13.2118 19.5451 13.7201 18.9351L22.0534 8.9351C22.6418 8.22843 23.6934 8.13343 24.4017 8.72176C25.1084 9.3101 25.2034 10.3618 24.6134 11.0684L17.1551 20.0201L24.3467 28.9568C24.9234 29.6734 24.8101 30.7234 24.0918 31.3001C23.7851 31.5484 23.4151 31.6684 23.0484 31.6684Z" fill="white" />
      </mask>
      <g mask="url(#mask0L)">
        <g id="&#240;&#159;&#142;&#168; Color">
          <rect id="Base" width="40" height="40" fill="#3B414B" />
        </g>
      </g>
    </g>
  </svg>

)
