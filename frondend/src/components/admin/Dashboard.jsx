import React from 'react'
import AdminHeader from './AdminHeader'
import ViewUsers from './ViewUsers'

const Dashboard = () => {
  return (
    <>
    <AdminHeader/>
    <div>
      <ViewUsers/>
    </div>
    </>
  )
}

export default Dashboard
