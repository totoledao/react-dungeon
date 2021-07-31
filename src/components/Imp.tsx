import styled from 'styled-components';
import ActorProps from '../types/Actor';
import Image from 'next/image';

import imp from '../sprites/imp_idle_anim_f0.png';  

export default function Imp({ Xpos, Ypos, handleInteraction, ...rest } : ActorProps) {

    const Imp = styled.div`
    position: absolute;
    left: ${Ypos*32}px;  
    top: ${Xpos*32}px;
    transform: translateY(-2px);
    z-index: 90;
    `;

  return(

    <Imp>
      <Image src={imp} alt="imp" width={32} height={32} onClick={ handleInteraction }/>
    </Imp>
  )
  
}