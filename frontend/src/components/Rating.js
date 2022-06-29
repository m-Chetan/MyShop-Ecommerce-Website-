import React from 'react'
import { FullStar,HalfStar,EmptyStar } from './Star'

const Rating = ({rating,text}) => {
  return (
      <>
        {rating>=1 ? <FullStar /> : rating>=0.5 ? <HalfStar /> : <EmptyStar />}
        {rating>=2 ? <FullStar /> : rating>=1.5 ? <HalfStar /> : <EmptyStar />}
        {rating>=3 ? <FullStar /> : rating>=2.5 ? <HalfStar /> : <EmptyStar />}
        {rating>=4 ? <FullStar /> : rating>=3.5 ? <HalfStar /> : <EmptyStar />}
        {rating>=5 ? <FullStar /> : rating>=4.5 ? <HalfStar /> : <EmptyStar />}
        {text && text} 
      </>
    
    
  )
}

export default Rating