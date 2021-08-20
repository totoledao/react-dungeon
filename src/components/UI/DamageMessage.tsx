import React from 'react';
import styled from 'styled-components';
import {
  currentPlayerPosX,
  currentPlayerPosY,
} from '../../../pages';

type props = {
  damage : number;
  posX? : number;
  posY? : number;
  index? : number;
}

export default function DamageMessage(
  {damage, posX = currentPlayerPosX, posY = currentPlayerPosY, index = 0} : props
  ) {

  const DamageMessage = styled.div`
  position: absolute;
  width: 1.5em;
  height: 1.5em;
  top: ${((posX)*32)-(15*(index+1))}px;
  left: ${(posY)*32}px;  
  //text-align: top;
  color: red;
  font-size: 1.1rem;
  outline-color: white;
  z-index: 1000;
`

  return (
    <DamageMessage>
      <p> {damage} </p>
    </DamageMessage>
  );
}