import React from 'react'
import Testform from '@/components/testform'
import Table from '@/components/table'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <Testform />
      <Table />
    </main>
  )
}
