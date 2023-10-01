import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

import  Table from '../../components/otp/Datatable'

const Otp = () => {
  return (
    <div className='new'>
        <Sidebar />
        <div className='newContainer'>
            <Navbar />
            <Table/>
        </div>
    </div>

    
  )
}

export default Otp