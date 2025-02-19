import React from 'react'
import UserActiveBorrowings from './UserActiveBorrowings'
import UserPendingFines from './UserPendingFines'

function UserHome({user}) {
  return (
    <>
    <UserActiveBorrowings user={user}/>
    <UserPendingFines fines={user?.member?.fines}/>
    </>
    
  )
}

export default UserHome