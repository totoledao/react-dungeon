import { currentPlayerPosX, currentPlayerPosY } from '../../pages'

export default function enemyInteraction(
  enemyPos: { i: number, j: number }
  ) {

  //Enemy is Up
  if (currentPlayerPosX - enemyPos.i === -1 && currentPlayerPosY === enemyPos.j)  

  //Enemy is Down
  if (currentPlayerPosX - enemyPos.i === 1 && currentPlayerPosY === enemyPos.j)

  //Enemy is Left
  if (currentPlayerPosY - enemyPos.j === 1 && currentPlayerPosX === enemyPos.i)

  //Enemy is Right
  if (currentPlayerPosY - enemyPos.j === -1 && currentPlayerPosX === enemyPos.i)
  
  //Enemy is DownLeft
  if (currentPlayerPosX - enemyPos.i === -1 && currentPlayerPosY - enemyPos.j === 1)  

  //Enemy is UpRight
  if (currentPlayerPosX - enemyPos.i === 1 && currentPlayerPosY - enemyPos.j === -1)

  //Enemy is UpLeft
  if (currentPlayerPosY - enemyPos.j === 1 && currentPlayerPosX - enemyPos.i === 1)

  //Enemy is DownRight
  if (currentPlayerPosY - enemyPos.j === -1 && currentPlayerPosX - enemyPos.i === -1)
  
  //Other cases
  if (Math.abs(currentPlayerPosX - enemyPos.i) > 1
      ||
      Math.abs(currentPlayerPosY - enemyPos.j) > 1
  ) return
}