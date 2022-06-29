import React from 'react'

const FullStar = () => {
  return (
    <i className="fa-solid fa-star"></i>
  )
}

const HalfStar = () => {
    return (
        <i className="fa-solid fa-star-half-stroke fa-star"></i>
    )
}

const EmptyStar = () => {
    return (
        <i className="fa-regular fa-star"></i>
    )
  }
  

export {
    FullStar,
    HalfStar,
    EmptyStar
}