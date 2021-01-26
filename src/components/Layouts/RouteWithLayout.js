import React from 'react'
import GuestPageFrame from '../PageFrames/GuestPageFrame'
import MemberPageFrame from '../PageFrames/MemberPageFrame'

export const withGuestLayout = Container => () => {
  return (
    <GuestPageFrame>
      <Container />
    </GuestPageFrame>
  )
}

export const withMemberLayout = Container => () => {
  return (
    <MemberPageFrame>
      <Container />
    </MemberPageFrame>
  )
}
