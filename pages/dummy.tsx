import React, { useState } from 'react'
import '../statics/style/style.css'
import Questionnarie from '../components/questionnaire'


export default () => {
  const defaultQuestionnarie : DefaultQuestionnarie = {
    name: false,
    nickName: true,
    workPhone: false,
    gender: false,
    email: false,
    address: true,
    passport: false,
    languages: false,
    birthDate: false,
    emergencyContactInfo: true,
    medicalConditions: true,
    dietaryRestrictions: true,
    physicalLimitations: true,
  }
  return (
    <div className="bg-black h-screen relative">
      <Questionnarie
        defaultQuestionnarie={defaultQuestionnarie}
        paxQuestionnarie={[]}
        callFunction={(result) => console.log(result)}
      />
    </div>
  )
}
