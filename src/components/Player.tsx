import styled from 'styled-components';
import ActorProps from '../types/Actor';
import Image from 'next/image';

import player from '../sprites/player.png';

const wi = 16* 2;
const he = 19* 2;

export default function Player({ Xpos, Ypos, handleInteraction, ...rest } : ActorProps) {

    const Player = styled.div`
    position: absolute;
    left: ${Ypos*32}px;  
    top: ${Xpos*32}px;
    transform: translateY(-10px);
    z-index: 100;
    `;

  return(

    <Player>
      <Image src={player} alt="player" width={wi} height={he} layout="fixed"
        onClick={ handleInteraction }/>
    </Player>
  )
  
}