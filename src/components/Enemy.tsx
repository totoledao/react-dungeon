import { forwardRef, useRef, useState } from 'react';
import styled from 'styled-components';

import ActorProps from '../types/Actor';
import Image from 'next/image';

import { currentPlayerDamage } from '../../pages';
import isAdjacent from '../utils/isAdjacent';

import imp from '../sprites/imp_idle_anim_f0.png';
import { getDeadEnemies } from '../utils/enemyTurn';

export default function Enemy ({ Xpos , Ypos, handleInteraction } : ActorProps ) {

  const [health, setHealth] = useState(10);
  const [isAlive, setIsAlive] = useState(true);

  const Enemy = styled.div`
  position: absolute;
  top: ${Xpos*32}px;
  left: ${Ypos*32}px;  
  transform: translateY(-2px);
  z-index: 90;
  `;
  
  function takeDamage () {    
    isAdjacent(Xpos , Ypos, true) && setHealth(oldValue => oldValue - currentPlayerDamage);
  }
  
  if( isAlive && health <= 0 ){
    getDeadEnemies(Xpos, Ypos);
    setIsAlive(false);
  }

  if( health <= 0 ){
    return null
  }
  
  return(
    <Enemy>
      <Image src={imp} alt="imp" width={32} height={32} layout="fixed"
        onClick={ () => { handleInteraction(); takeDamage(); }
      }/>
    </Enemy>  
  ) 
  
}