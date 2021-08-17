import { useState } from 'react';
import styled from 'styled-components';

import ActorProps from '../types/Actor';
import Image from 'next/image';

import { currentPlayerDamage } from '../../pages';
import isAdjacent from '../utils/isAdjacent';

import imp from '../sprites/imp_idle_anim_f0.png';

export default function Enemy ({ Xpos , Ypos, handleInteraction } : ActorProps ) {

  const [health, setHealth] = useState(10);

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
      
  return(
    <Enemy>
      <Image src={imp} alt="imp" width={32} height={32}
        onClick={ () => { handleInteraction(); takeDamage(); }
      }/>
    </Enemy>  
  ) 
  
}