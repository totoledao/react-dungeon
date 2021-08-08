import styled from 'styled-components';

import ActorProps from '../types/Actor';
import Image from 'next/image';

import imp from '../sprites/imp_idle_anim_f0.png';

export default function Enemy ({ Xpos , Ypos, handleInteraction } : ActorProps ) {

    const Enemy = styled.div`
    position: absolute;
    top: ${Xpos*32}px;
    left: ${Ypos*32}px;  
    transform: translateY(-2px);
    z-index: 90;
    `;
    
    return(
      <Enemy>
        <Image src={imp} alt="imp" width={32} height={32} onClick={ handleInteraction }/>
      </Enemy>  
    ) 
  
}