import React from 'react'
import '../statics/style/style.scss'
import { login } from '../redux/actions/users'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

export default () => {


  const lodge: User = {
    cn: 'Carlos Casanello',
    email: 'carloslc@gmail.com',
    accessToken: 'accesstoken',
    rol: 'LODGE',
  }


  const agency: User = {
    cn: 'Leonardo Leenen',
    email: 'leonardo@flicktrip.com',
    accessToken: 'accesstoken',
    rol: 'AGENCY',
  }

  const consumer: User = {
    cn: 'Juan Antonucci ',
    email: 'juan@cafebinario.com',
    accessToken: 'accesstoken',
    rol: 'CONSUMER',
  }

  const disptach = useDispatch()
  const router = useRouter()

  return (
    <div>
      <div onClick={() => disptach(login(consumer))}>Lodge</div>
      <div onClick={() => {
        disptach(login(agency))
        router.push('/agency/home')
      }}>Agencia</div>
      <div onClick={() => disptach(login(consumer))}>Consumer</div>
    </div>
  )
}
