import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';

import ActorProps from '../types/Actor';
import Image from 'next/image';

import imp from '../sprites/imp_idle_anim_f0.png';

export type EnemyMovement = {
  moveEnemy : () => void;
}

const Enemy : React.ForwardRefRenderFunction<EnemyMovement> =
  ({ Xpos , Ypos, handleInteraction } : ActorProps , ref ) => {

    const [enemyTurns, setEnemyTurns] = useState(0);

    const updatedXpos = useRef<number | null>(Xpos);
    const updatedYpos = useRef<number | null>(Ypos);

    function moveEnemy() {
      console.log("Moving...");        
      updatedXpos.current = 10;
      updatedYpos.current = 10;
      setEnemyTurns(enemyTurns +1)
      console.log(updatedXpos,updatedYpos)
      return {
        updatedXpos,
        updatedYpos
      }
    }

    useImperativeHandle(ref, () => ({
        moveEnemy,
    }));

    const Enemy = styled.div`
    position: absolute;
    top: ${updatedXpos.current*32}px;
    left: ${updatedYpos.current*32}px;  
    transform: translateY(-2px);
    z-index: 90;
    `;
    
    return(
      <Enemy>
        <Image src={imp} alt="imp" width={32} height={32} onClick={ handleInteraction }/>
      </Enemy>  
    ) 
  
}

export default forwardRef(Enemy);