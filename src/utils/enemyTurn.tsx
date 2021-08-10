import {
  currentPlayerPosX,
  currentPlayerPosY,
  currentEnemiesPos,
  pathFinderGrid,
  pathFinder,
} from '../../pages/';

import isAdjacent from './isAdjacent'

export default function enemyTurn ( ) {
  enemiesAttack();
  return enemiesMove();
}

function enemiesAttack() {
  console.log('attack');
}

function enemiesMove ( ) {
  
  let newEnemiesPos = [];

  for (let index = 0; index < currentEnemiesPos.length; index++) {    
    
    pathFinderGrid.setWalkableAt(currentEnemiesPos[index].i,currentEnemiesPos[index].j, true);
    
    let nextPosX;
    let nextPosY;
    
    let gridBackup = pathFinderGrid.clone();
    let path = pathFinder.findPath(
      currentEnemiesPos[index].i, currentEnemiesPos[index].j, currentPlayerPosX, currentPlayerPosY, gridBackup
    );
  
    if (path[1] === undefined) {

      let nextRandomPos = getRandomDir(currentEnemiesPos[index].i, currentEnemiesPos[index].j);
      let gridBackup2 = pathFinderGrid.clone();
      let randomPath = pathFinder.findPath(
        currentEnemiesPos[index].i, currentEnemiesPos[index].j, nextRandomPos.i, nextRandomPos.j, gridBackup2
      );

      if (randomPath[1] === undefined) {
        nextPosX = currentEnemiesPos[index].i;
        nextPosY = currentEnemiesPos[index].j;  
      } else {
        nextPosX = randomPath[1][0];
        nextPosY = randomPath[1][1];  
      }
    
    } else {
      nextPosX = path[1][0];
      nextPosY = path[1][1];
    }

    if (isAdjacent(currentEnemiesPos[index].i, currentEnemiesPos[index].j, true) === true) {
      
        newEnemiesPos.push({i: currentEnemiesPos[index].i , j: currentEnemiesPos[index].j});
        pathFinderGrid.setWalkableAt(currentEnemiesPos[index].i, currentEnemiesPos[index].j, false);       

    } else {
      newEnemiesPos.push({i: nextPosX, j: nextPosY});
      pathFinderGrid.setWalkableAt(nextPosX, nextPosY, false);
    }

  };

  return newEnemiesPos;

}

function getRandomDir (posX : number, posY : number) {

  let nextRandomPos : {i: number, j: number} ={i: posX, j: posY};
  let randomDir = Math.floor(Math.random() * 4) + 1;

  switch(randomDir) {
    case 1: //Up
      nextRandomPos = {i: posX - 1, j: posY};
      break;
    case 2: //Down
      nextRandomPos = {i: posX + 1, j: posY};
      break;
    case 3: //Left
      nextRandomPos = {i: posX, j: posY - 1};
      break;
    case 4: //Right
      nextRandomPos = {i: posX, j: posY + 1};
      break;
    default:
      nextRandomPos;
  }

  return nextRandomPos;
} 