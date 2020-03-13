import React from 'react'
import Questionnarie from '../questionnaire'

interface Props {
  defaultQuestionnarie: DefaultQuestionnarie
  paxQuestionnarie: Array<QuestionarieComponent>
  callBackFunction: Function
}

export default (props: Props) => {
  const { defaultQuestionnarie, callBackFunction, paxQuestionnarie } = props
  return (
    <Questionnarie
      defaultQuestionnarie={defaultQuestionnarie}
      paxQuestionnarie={paxQuestionnarie || []}
      callFunction={callBackFunction}
    />
  )
}
