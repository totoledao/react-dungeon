import styled from 'styled-components';
import ActorProps from '../types/Actor';
import Image from 'next/image';

import player from '../sprites/knight_m_idle_anim_f3.png';

const wi = 16* 2;
const he = 28* 2;

export default function Player({ Xpos, Ypos, ...rest } : ActorProps) {

    const Player = styled.div`
    position: absolute;
    left: ${Ypos*32}px;  
    top: ${Xpos*32}px;
    transform: translateY(-24px);   
    `;

  return(

    <Player>
      <Image src={player} alt="player" width={wi} height={he} />
    </Player>
  )
  
}