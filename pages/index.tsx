import React, { ReactElement, useEffect, useState } from 'react';
import Dungeon from '2d-dungeon';
import styles from '../styles/Home.module.css';

import TileFloor from "../src/components/TileFloor";
import TileWall from "../src/components/TileWall";
import Player from "../src/components/Player";
import playerMovement from '../src/utils/playerMovement';

export default function Home() {

  const [floors, setFloors] = useState<{ i: number, j: number}[]>([]);
  const [walls, setWalls] = useState<{ i: number, j: number}[]>([]);
  const [playerPos, setPlayerPos] = useState<{ i: number, j: number}>({i: 10, j: 10});
  const [dungeonLevel, setDungeonLevel] = useState( 1 );



  const floorsTiling = React.useMemo(
    () =>( 
    floors.map((num) =>
      <TileFloor key={`${num.i}-${num.j}`}
        Xpos={num.i} Ypos={num.j}
        //handleMovement={() => setPlayerPos({i: num.i, j: num.j})}
        handleMovement={() => setPlayerPos(oldValue => playerMovement(oldValue, {i: num.i, j: num.j} ) ) }
      /> )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ),[floors])
  
  const wallsTiling = React.useMemo(
    () =>( 
    walls.map((num) =>
      <TileWall key={`${num.i}-${num.j}`}
        Xpos={num.i} Ypos={num.j}
        handleMovement={() => console.log({i: num.i, j: num.j})}
      /> )
  ),[walls])

  useEffect(() => {
    DungeonGenerator(29, 29);
  },[ setDungeonLevel ]);
  
  function DungeonGenerator(Xsize: number, Ysize: number){

    let dungeon = new Dungeon({
      max_iterations: 50,
      size: [Xsize, Ysize], 
      //seed: 'abcd', //omit for generated seed
      rooms: {
          initial: {
              min_size: [3, 3],
              max_size: [4, 4],
              max_exits: 2,
              //position: [0, 0] //OPTIONAL pos of initial room 
          },
          any: {
              min_size: [3, 3],
              max_size: [6, 6],
              max_exits: 4
          }
      },
      max_corridor_length: 8,
      min_corridor_length: 1,
      corridor_density: 0.5, //corridors per room
      symmetric_rooms: false, // exits must be in the center of a wall if true
      interconnects: 1, //extra corridors to connect rooms and make circular paths. not 100% guaranteed
      max_interconnect_length: 10,
      room_count: 15
  });
  
  dungeon.generate();
  dungeon.print(); //outputs wall map to console.log  

    for (let i = 0; i < Xsize; i++) {    
      for (let j = 0; j < Ysize; j++) {
        if ( dungeon.walls.get([i, j]) ) {
          setWalls(oldValue => [ ...oldValue, {i,j}]);        
        } else setFloors(oldValue => [ ...oldValue, {i,j}]);
      }
    }

    for(let piece of dungeon.children) {
      //piece.position; //[x, y] position of top left corner of the piece within dungeon
      //piece.tag; // 'any', 'initial' or any other key of 'rooms' options property
      //piece.size; //[width, height]
      //piece.walls.get([x, y]); //x, y- local position of piece, returns true if wall, false if empty
      for (let exit of piece.exits) {
          let {x, y, dest_piece} = exit; // local position of exit and piece it exits to
          piece.global_pos([x, y]); // [x, y] global pos of the exit
      }  
    
    setPlayerPos({ i: dungeon.start_pos[0], j: dungeon.start_pos[1] });
    }

  }

  return (
    <main>
    
    { floorsTiling }
    { wallsTiling }

    <Player Xpos={playerPos.i} Ypos={playerPos.j}/>
     
    </main>
  )
}