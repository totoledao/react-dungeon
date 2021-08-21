import React, { useState } from 'react';
import styled from 'styled-components';
import Image from "next/image";

import TileProps from '../types/Tiles';
import door_closed from "../sprites/door/doors_leaf_closed.png";
import door_open from "../sprites/door/doors_leaf_open.png";
import { pathFinderGrid } from '../../pages';
import isAdjacent from '../utils/isAdjacent';

export default function Door({Xpos, Ypos, handleMovement, ...rest} : TileProps) {

  const [doorIsClosed, setDoorIsClosed] = useState( true );

  const Door = styled.div`    
    position: absolute;
    left: ${Ypos*32}px;  
    top: ${Xpos*32}px;
    z-index: 20;
    `;

  function openDoor(){
    isAdjacent(Xpos , Ypos, true) && setDoorIsClosed(false);    
  }

  function closeDoor(){
    isAdjacent(Xpos , Ypos, true) && setDoorIsClosed(true);    
  }

  if (doorIsClosed) {
    pathFinderGrid.setWalkableAt(Xpos, Ypos, false);
    return (
        <Door>
          <Image src={door_closed} alt="door" width="32" height="32" layout="fixed"
            onClick={ () => { handleMovement(); openDoor(); } }
          />
        </Door>
    )
  } else {
    pathFinderGrid.setWalkableAt(Xpos, Ypos, true);
    return (
      <Door>
        <Image src={door_open} alt="door" width="32" height="32" layout="fixed"
          onClick={ () => { handleMovement(); closeDoor(); } }          
        />        
      </Door>
    )
  }
}