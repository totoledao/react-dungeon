import React from 'react';
import styled from 'styled-components';
import {
  currentPlayerPosX,
  currentPlayerPosY,
} from '../../../pages/';

type props = {
  textMessage : string;
}

export default function TextMessage({textMessage} : props) {

  const TextMessage = styled.div`
  position: absolute;
  width: 352px;
  height: 1.5em;
  top: ${(currentPlayerPosX-1)*32}px;
  left: ${(currentPlayerPosY-5)*32}px;
  background-color: rgba(0, 0, 0, 0.6);
  text-align: center;
  color: yellow;
  z-index: 1000;
`

  return (
    <TextMessage>
      <p> {textMessage} </p>
    </TextMessage>
  );
}