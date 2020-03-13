import React, { useState, useEffect } from 'react'


interface Props {
  defaultQuestionnarie: DefaultQuestionnarie
  paxQuestionnarie: Array<QuestionarieComponent>
  callFunction: Function
}

enum COMPONENT_KIND {
  TEXT='TEXT',
  MULTI_SELECT= 'MULTI_SELECT',
  SINGLE_SELECTION = 'SINGLE_SELECTION'
}


export default (props: Props) => {
  const { defaultQuestionnarie, paxQuestionnarie, callFunction } = props
  const [showForm, setShowForm] = useState(false)
  const [myQuestionnarie, setMyQuestionnarie] = useState<Array<QuestionarieComponent>>([])
  const [inputSelected, setInputSelected] = useState(null)

  useEffect(() => {
    const loadComponents = () => {
      const components : Array<QuestionarieComponent> = []

      if (defaultQuestionnarie.birthDate) {
        components.push({
          id: 'BIRTHDATE',
          description: 'Birth Date',
          kind: COMPONENT_KIND.TEXT,
          mandatory: true,
        })
      }

      if (defaultQuestionnarie.dietaryRestrictions) {
        components.push({
          id: 'DIETARIERESTRICTIONS',
          description: 'Dietarie Restrictions',
          kind: COMPONENT_KIND.TEXT,
          mandatory: true,
        })
      }

      if (defaultQuestionnarie.email) {
        components.push({
          id: 'EMAIL',
          description: 'Email',
          kind: COMPONENT_KIND.TEXT,
          mandatory: true,
        })
      }

      if (defaultQuestionnarie.emergencyContactInfo) {
        components.push({
          id: 'EMERGENCYCONTACTINFO',
          description: 'Emergency Contact Info',
          kind: COMPONENT_KIND.TEXT,
          mandatory: true,
        })
      }

      if (defaultQuestionnarie.gender) {
        components.push({
          id: 'GENDER',
          description: 'Gender',
          kind: COMPONENT_KIND.TEXT,
          mandatory: true,
        })
      }

      if (defaultQuestionnarie.languages) {
        components.push({
          id: 'LANGUAGES',
          description: 'Languages',
          kind: COMPONENT_KIND.TEXT,
          mandatory: true,
        })
      }

      if (defaultQuestionnarie.medicalConditions) {
        components.push({
          id: 'MEDICALCONDITIONS',
          description: 'Medical Conditions',
          kind: COMPONENT_KIND.TEXT,
          mandatory: true,
        })
      }

      if (defaultQuestionnarie.name) {
        components.push({
          id: 'NAME',
          description: 'Name',
          kind: COMPONENT_KIND.TEXT,
          mandatory: true,
        })
      }

      if (defaultQuestionnarie.nickName) {
        components.push({
          id: 'NICKNAME',
          description: 'NickName',
          kind: COMPONENT_KIND.TEXT,
          mandatory: true,
        })
      }

      if (defaultQuestionnarie.passport) {
        components.push({
          id: 'PASSPORT',
          description: 'Passport',
          kind: COMPONENT_KIND.TEXT,
          mandatory: true,
        })
      }

      if (defaultQuestionnarie.physicalLimitations) {
        components.push({
          id: 'PHYSICALLIMITATIONS',
          description: 'Physical Limitations',
          kind: COMPONENT_KIND.TEXT,
          mandatory: true,
        })
      }

      if (defaultQuestionnarie.workPhone) {
        components.push({
          id: 'WORKPHONE',
          description: 'WorkPhone',
          kind: COMPONENT_KIND.TEXT,
          mandatory: true,
        })
      }

      paxQuestionnarie.forEach((q:QuestionarieComponent) => {
        const idx: number = components.map((c:QuestionarieComponent) => c.id).indexOf(q.id)
        if (idx > -1) {
          components[idx].value = q.value
        }
      })

      setMyQuestionnarie(components)
    }

    loadComponents()
  }, [])


  const Landing = () => (
    <div className="">
      <div className="flex justify-center">
        <div className="text-lg font-semibold p-4">Pre trip questionnarie</div>
      </div>
      <div className="flex justify-center">
        <div className="text-gray-400 text-center">We need to know some information about you to enrich your experience. Please, make sure you complete this questionnarie before your trip.</div>
      </div>
      <div className="flex justify-center">
        <button onClick={() => setShowForm(true)} type="button" className="bg-teal-500 text-white px-16 py-4 mt-4 rounded-lg">Complete questionnarie</button>
      </div>
    </div>
  )

  const ProgressBar = () => (
    <div className="pt-4">
      <div className="w-full text-center py-2">{`${myQuestionnarie.filter((q:QuestionarieComponent) => q.mandatory).filter((q:QuestionarieComponent) => q.value).length} of ${myQuestionnarie.filter((q:QuestionarieComponent) => q.mandatory).length}`}</div>
      <div className="flex">
        <div className="h-1 w-1/5 bg-teal-400" />
        <div className="h-1 w-4/5 bg-gray-400" />
      </div>

    </div>
  )
  const Form = () => (
    <div className="bg-gray-100 text-gray-800 rounded-t-lg pb-8 absolute inset-x-0 bottom-0 p-4">
      <header className="p-4">
        <div className="flex">
          <div className="w-full" onClick={() => setShowForm(false)}>Cancel</div>
          <div
            className="text-base font-semibold text-teal-500"
            onClick={() => {
              setMyQuestionnarie(myQuestionnarie)
              setShowForm(false)
              callFunction(myQuestionnarie)
            }}
          >
Save

          </div>
        </div>
        <ProgressBar />
        <div className="mt-8 text-lg font-semibold">Trip Questionnarie</div>
      </header>

      <div className="overflow-y-auto" style={{ height: '450px' }}>
        { myQuestionnarie.map((c:QuestionarieComponent, index:number) => (
          <div className={`p-4 m-4 bg-white ${c.mandatory && c.value ? 'border border-green-500' : 'border border-red-500'}`} key={c.id}>
            <div className="text-base font-semibold">{c.description}</div>
            <input
              onChange={(e) => {
                setInputSelected(c.id)
                myQuestionnarie[index].value = e.target.value
                setMyQuestionnarie(Object.assign([], myQuestionnarie))
              }}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={inputSelected === c.id}
              value={c.value}
              className="py-2 w-full focus:outline-none"
              placeholder={c.description}
            />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="p-4 text-gray-100">
      {showForm ? <Form /> : <Landing />}
    </div>
  )
}
