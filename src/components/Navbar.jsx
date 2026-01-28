import React from 'react'
import { Link } from 'react-router-dom'
import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlineSummarize } from "react-icons/md";



const Navbar = () => {
  return (
    <nav className='h-15 flex items-center justify-between'>
      <Link to="/">
      <div className='flex items-center'>
        <img className='w-30 ml-5' src="/sherewithus2.png" alt="Logo" />
      </div>
      </Link>
      <div className=''>
        <ul className='flex gap-10 text-xl font-semibold items-center rounded-full bg-blue-100 px-6 py-3'>
          <li><MdSpaceDashboard /></li>
          <li><MdOutlineManageAccounts /></li>
          <li><MdOutlineSummarize /></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar