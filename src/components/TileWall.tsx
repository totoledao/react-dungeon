import React from 'react';
import styled from 'styled-components';
import Image from "next/image";

import TileProps from '../types/Tiles';
import wall_1 from "../sprites/wall/wall_1.png";
import wall_2 from "../sprites/wall/wall_2.png";
import wall_3 from "../sprites/wall/wall_banner_blue.png";
import wall_4 from "../sprites/wall/wall_banner_green.png";
import wall_5 from "../sprites/wall/wall_banner_red.png";
import wall_6 from "../sprites/wall/wall_banner_yellow.png";


let rng: number;
function generateRNG() {

  Math.random() >= 0.98 ? rng = Math.floor(Math.random() * (3 - 1 + 2)) + 2
  : rng = Math.floor(Math.random()*2)
  
  return rng
  
}

const wall: StaticImageData[] = [wall_1,
  wall_2,
  wall_3,
  wall_4,
  wall_5,
  wall_6,
];

export default function TileWall({Xpos, Ypos, ...rest} : TileProps) {

  const Tile = styled.div`    
    position: absolute;
    left: ${Ypos*32}px;  
    top: ${Xpos*32}px;
    z-index: 10;
    `;
  
  generateRNG();

  return (
      <Tile>
        <Image src={wall[rng]} alt="wall" width="32" height="32" />  
      </Tile>
  )
}