import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import {FaStar} from 'react-icons/fa'

 export const StarRating = () => {
    const [rating, setRating] = useState(0)

    // Catch Rating value
    const handleRatingClick = (newRating) => {
        setRating(newRating);
      };
    // Optinal callback functions
    const onPointerEnter = () => console.log('Enter')
    const onPointerLeave = () => console.log('Leave')
    const onPointerMove = (value, index) => console.log(value, index)

    return (
        <div style={{width: '100%', height: '10rem'}}>
            {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                    key={star}
                    size={20}
                    color={star <= rating ? '#FFD700' : '#E4E5E9'}
                    onClick={() => handleRatingClick(star)}
                    style={{ cursor: 'pointer' }}
                />
            ))}
        </div>
    )
}