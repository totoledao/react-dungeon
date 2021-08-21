import React from 'react';
import styled from 'styled-components';
import Image from "next/image";

import TileProps from '../types/Tiles';
import floor_1 from "../sprites/floor/floor_1.png";
import floor_2 from "../sprites/floor/floor_2.png";
import floor_3 from "../sprites/floor/floor_3.png";
import floor_4 from "../sprites/floor/floor_4.png";
import floor_5 from "../sprites/floor/floor_5.png";
import floor_6 from "../sprites/floor/floor_6.png";
import floor_7 from "../sprites/floor/floor_7.png";
import floor_8 from "../sprites/floor/floor_8.png";


let rng: number;
function generateRNG() {

  Math.random() >= 0.9 ? rng = Math.floor(Math.random() * (7 - 1 + 1)) + 1 : rng = 0  
  
  return rng
  
}

const floor: StaticImageData[] = [floor_1,
  floor_2,
  floor_3,
  floor_4,
  floor_5,
  floor_6,
  floor_7,
  floor_8
];

export default function TileFloor({Xpos, Ypos, handleMovement, ...rest} : TileProps) {

  const Tile = styled.div`
    position: absolute;
    left: ${Ypos*32}px;  
    top: ${Xpos*32}px;
    z-index: 0;
    `;

  generateRNG();

  return (
      <Tile>
        <Image src={floor[rng]} alt="floor" width="32" height="32" layout="fixed"
          onClick={ handleMovement }
        />
      </Tile>
  )
}