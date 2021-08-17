import React, { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Dungeon from '2d-dungeon';
import pathfinding from 'pathfinding';
import styles from '../styles/Home.module.css';

//tiles
import TileFloor from "../src/components/TileFloor";
import TileWall from "../src/components/TileWall";

//actors
import Player from "../src/components/Player";
import Enemy from '../src/components/Enemy';

//components
import TextMessage from '../src/components/UI/TextMessage';
import DamageMessage from '../src/components/UI/DamageMessage';

//utils
import playerMovement from '../src/utils/playerMovement';
import enemyInteraction from '../src/utils/enemyInteraction';
import {enemiesAttack, enemiesMove, damageDoneThisTurn} from '../src/utils/enemyTurn';
import isAdjacent from '../src/utils/isAdjacent';

//player stats exports
export let currentPlayerPosX : number;
export let currentPlayerPosY : number;
export let currentPlayerHealth : number;
export let currentPlayerDamage : number;
//other exports
export let currentEnemiesPos : { i: number, j: number}[];
export let pathFinderGrid : any;
export let pathFinder : any;

export default function Home() {

  const [floors, setFloors] = useState<{ i: number, j: number}[]>([]);
  const [walls, setWalls] = useState<{ i: number, j: number}[]>([]);
  const [enemies, setEnemies] = useState<{ i: number, j: number}[]>([]);
  const [dungeonLevel, setDungeonLevel] = useState( 1 );

  const [playerPos, setPlayerPos] = useState<{ i: number, j: number}>({i: 10, j: 10});
  const [playerHealth, setPlayerHealth] = useState( 10 );
  const [playerDamage, setPlayerDamage] = useState( 3 );
  
  const [displayTextMessage, setDisplayTextMessage] = useState( { display: false, message: "You can't do it"} );
  const [displayPlayerDamageMessage, setDisplayPlayerDamageMessage] = useState(
    { display: false, message: currentPlayerDamage, posX: 0, posY: 0 }
  );
  const [displayEnemyDamageMessage, setDisplayEnemyDamageMessage] = useState( false );
  
  function handleDisplayTextMessage(damage : string){
    setDisplayTextMessage ( { display: true, message: damage } );
    setTimeout(() => setDisplayTextMessage( oldValue => ({ ...oldValue, display: false }) ), 1100)
    return 
  }
  
  function handleDisplayEnemyDamageMessage( ){
    setDisplayEnemyDamageMessage ( true );  
    setTimeout(() => setDisplayEnemyDamageMessage( false ), 1100);    
  }

  function handleDisplayPlayerDamageMessage(    
    posX : number,
    posY : number
    ){
      setDisplayPlayerDamageMessage ({ display: true, message: currentPlayerDamage, posX: posX, posY: posY } );
      setTimeout(() => setDisplayPlayerDamageMessage(oldValue => ({ ...oldValue, display: false }) ), 1100);      
  }
  
  currentPlayerPosX =  playerPos.i;
  currentPlayerPosY =  playerPos.j;
  currentPlayerHealth =  playerHealth;
  currentPlayerDamage =  playerDamage;
  currentEnemiesPos = enemies;

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
  //dungeon.print(); //outputs wall map to console.log  

    let totalFloors : { i: number, j: number}[] = [];
    let totalWalls : { i: number, j: number}[] = [];
    let cleanedUpFloors : { i: number, j: number}[] = [];

    pathFinderGrid = new pathfinding.Grid(Xsize, Ysize);    
    pathFinder = new pathfinding.AStarFinder();

    for (let i = 0; i < Xsize; i++) {    
      for (let j = 0; j < Ysize; j++) {
        if ( dungeon.walls.get([i, j]) ) {
          setWalls(oldValue => [ ...oldValue, {i,j}]);
          totalWalls.push( {i,j} );
          pathFinderGrid.setWalkableAt(i, j, false);   
        } else totalFloors.push( {i,j} );          
      }
    }

    for (let x = 0; x < totalFloors.length; x++) {
      
      let i = totalFloors[x].i;
      let j = totalFloors[x].j;      
       
        if (totalFloors[x].i < totalWalls[totalWalls.length - 1].i) {        
          if (totalFloors[x].j < totalWalls[totalWalls.length - 1].j) {        
            setFloors( oldValue => [ ...oldValue, {i,j}] );
            cleanedUpFloors.push( {i,j} );
        }}
    }
    
    let initialPlayerPos : { i : number, j : number } = { i: 0, j: 0};

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

      initialPlayerPos = { i: dungeon.start_pos[0], j: dungeon.start_pos[1] };
   
    }

    function findIndexOfValue (array : {i: number, j: number}[], value : {i: number, j: number}) {
      for(var x = 0; x < array.length; x++) {
          if(array[x].i == value.i) {            
            if(array[x].j == value.j) {              
              return x;
          }}
      }
      return -1;
    }
    
    cleanedUpFloors.splice(findIndexOfValue (cleanedUpFloors, initialPlayerPos), 1);

    for (let x = 0; x < cleanedUpFloors.length; x++) {
      
      let i = cleanedUpFloors[x].i;
      let j = cleanedUpFloors[x].j;
       
        if (Math.random() >= 0.94) {    
            setEnemies( oldValue => [ ...oldValue, {i,j}] );
            pathFinderGrid.setWalkableAt(i, j, false);           
        }
    }
    
  }

  const floorsTiling = React.useMemo(
    () =>( 
    floors.map((num) =>
      <TileFloor key={`${num.i}-${num.j}`}
        Xpos={num.i} Ypos={num.j}        
        handleMovement={() => {
          setPlayerPos(oldValue => playerMovement(oldValue, {i: num.i, j: num.j} ) );          
          isAdjacent(num.i, num.j) && handleEnemyTurn();
          !isAdjacent(num.i, num.j) && handleDisplayTextMessage("You can't go there");
        }}
      /> )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ),[floors]);
  
  const wallsTiling = React.useMemo(
    () =>( 
    walls.map((num) =>
      <TileWall key={`${num.i}-${num.j}`}
        Xpos={num.i} Ypos={num.j}
        handleMovement={ () => { handleDisplayTextMessage("That's a wall") }  }
      /> )
  ),[walls]);

  const enemiesPlacement = React.useMemo(
    () =>( 
    enemies.map((num, index) =>    
        <Enemy key={index}
          Xpos={num.i} Ypos={num.j}
          handleInteraction={ () => {
            enemyInteraction( {i: num.i, j: num.j} );
            isAdjacent(num.i, num.j, true) && handleEnemyTurn();
            isAdjacent(num.i, num.j, true) && handleDisplayPlayerDamageMessage(num.i, num.j);
            !isAdjacent(num.i, num.j, true) && handleDisplayTextMessage("You can't hit from there");
          }}
        />
      )
  ),[enemies]);

  useEffect(() => {
    DungeonGenerator(29, 29);
  },[setDungeonLevel]);

  function handleEnemyTurn(){
    setTimeout( () => {
      setPlayerHealth(oldValue => oldValue + enemiesAttack());
      handleDisplayEnemyDamageMessage();
      handlePlayerDeath();
      setEnemies(enemiesMove());
    },100)
  }

  function handlePlayerDeath() {
    if(currentPlayerHealth <= 0) {
      handleDisplayTextMessage("YOU DIED");
    }
  }

  return (
    <main>    

    { floorsTiling }
    { wallsTiling }
    { enemiesPlacement }

    {displayTextMessage.display && <TextMessage textMessage={ displayTextMessage.message } />}
    {displayPlayerDamageMessage.display && <DamageMessage damage={displayPlayerDamageMessage.message} posX={displayPlayerDamageMessage.posX} posY={displayPlayerDamageMessage.posY} /> }
    {displayEnemyDamageMessage && damageDoneThisTurn.map((dmg, idx) => <DamageMessage key={idx} damage={dmg} index={idx} /> ) }
    
    <Player Xpos={playerPos.i} Ypos={playerPos.j} handleInteraction={ () => handleDisplayTextMessage("That's you!") }/>

    <button style={{position: "absolute", left: "950px", top: "500px" }}
      onClick={ () => { handleEnemyTurn(); console.log(damageDoneThisTurn); } }
    > MOVE </button>
     
    </main>
  )
}