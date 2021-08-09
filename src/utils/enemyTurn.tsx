import {
  currentPlayerPosX,
  currentPlayerPosY,
  currentEnemiesPos,
  pathFinderGrid,
  pathFinder,
} from '../../pages/';

export default function enemyTurn ( ) {
  
  let newEnemiesPos = [];

  for (let index = 0; index < currentEnemiesPos.length; index++) {    

    let gridBackup = pathFinderGrid.clone();
    let path = pathFinder.findPath(
      currentEnemiesPos[index].i, currentEnemiesPos[index].j, currentPlayerPosX, currentPlayerPosY, gridBackup
    );

    let nextPosX = path[1][0];
    let nextPosY = path[1][1];

    if (nextPosX == currentPlayerPosX
        &&
        nextPosY == currentPlayerPosY) {

          newEnemiesPos.push({i: currentEnemiesPos[index].i , j: currentEnemiesPos[index].j})       

    } else  newEnemiesPos.push({i: nextPosX, j: nextPosY})

  };

  for (let x = 0; x < newEnemiesPos.length; x++) {
    newEnemiesPos[x] = { i : newEnemiesPos[x].i , j: newEnemiesPos[x].j };
  }

  console.log(newEnemiesPos);
  return newEnemiesPos;

}