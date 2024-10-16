import React from 'react'
import InfoGrid from './InfoGrid'
import UserActiveBorrowings from './UserActiveBorrowings'

function UserHome({user}) {
  return (
    <>
    <InfoGrid/>
    <UserActiveBorrowings user={user}/>
    </>
    
  )
}

export default UserHome