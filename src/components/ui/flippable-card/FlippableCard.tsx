// npm i react-transition-group
// npm i --save-dev @types/react-transition-group

import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './FlippableCard.module.css'
import './flip-transition.css'

interface Props {
  rootClassName?: string
  cardClassName?: string
  frontCardElement: React.ReactNode
  backCardElement: React.ReactNode
}

export default function FlippableCard({
  rootClassName = 'w-[300px] h-[500px]',
  cardClassName,
  frontCardElement,
  backCardElement,
}: Props) {
  const { perspective_10, preserve_3d, backface_hidden, rotate_y_180 } = styles
  const [showFront, setShowFront] = useState(true)
  return (
    <div className={`${rootClassName} ${perspective_10} `}>
      <CSSTransition in={showFront} timeout={300} classNames="flip">
        <div
          onClick={() => setShowFront((prevOne) => !prevOne)}
          className={`relative ${preserve_3d} h-full w-full select-none cursor-pointer ${cardClassName}`}
        >
          <div
            className={`${backface_hidden} ${rotate_y_180} absolute h-full w-full `}
          >
            {backCardElement}
          </div>
          <div className={`${backface_hidden} h-full w-full `}>
            {frontCardElement}
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}
