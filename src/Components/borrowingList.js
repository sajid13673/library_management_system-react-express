import React from 'react'
import { useLocation } from 'react-router-dom'
function BorrowingList() {
    const location = useLocation()
    const memberId = location.state.memberId
    console.log(memberId);
  return (
    <div>BorrowingList {memberId}</div>
  )
}

export default BorrowingList