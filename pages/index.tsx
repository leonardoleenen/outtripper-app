import React from 'react'
import '../statics/style/style.scss'
import { login } from '../redux/actions/users'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

export default () => {


  const lodge: User = {
    uid: '1234567', 
    cn: 'Carlos Casanello',
    email: 'carloslc@gmail.com',
    accessToken: 'accesstoken',
    rol: 'LODGE',
  }


  const agency: User = {
    uid: '7654321',
    cn: 'Leonardo Leenen',
    email: 'leonardo@flicktrip.com',
    accessToken: 'accesstoken',
    rol: 'AGENCY',
  }

  const consumer: User = {
    uid: '000000',
    cn: 'Juan Antonucci ',
    email: 'juan@cafebinario.com',
    accessToken: 'accesstoken',
    rol: 'CONSUMER',
  }

  const disptach = useDispatch()
  const router = useRouter()

  return (
    <div>
      <div onClick={() => disptach(login(lodge))}>Lodge</div>
      <div onClick={() => {
        disptach(login(agency))
        router.push('/agency/home')
      }}>Agencia</div>
      <div onClick={() => disptach(login(consumer))}>Consumer</div>
    </div>
  )
}
