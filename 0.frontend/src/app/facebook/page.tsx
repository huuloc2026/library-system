'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Facebook = () => {
  const router = useRouter()
  const handleBack = () => {
    return router.push('/')
  }
  return (
    <>
    <h1>Facebook</h1>
    <button onClick={()=>handleBack()}>Back home</button>
    </>
  )
}

export default Facebook