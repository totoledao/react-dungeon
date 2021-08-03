import { currentPlayerPosX, currentPlayerPosY } from '../../pages'

export default function enemyInteraction(
  enemyPos: { i: number, j: number }
  ) {

  //Enemy is Up
  if (currentPlayerPosX - enemyPos.i === -1 && currentPlayerPosY === enemyPos.j)
    console.log("Dano")    

  //Enemy is Down
  if (currentPlayerPosX - enemyPos.i === 1 && currentPlayerPosY === enemyPos.j)
    console.log("Dano")

  //Enemy is Left
  if (currentPlayerPosY - enemyPos.j === 1 && currentPlayerPosX === enemyPos.i)
    console.log("Dano")

  //Enemy is Right
  if (currentPlayerPosY - enemyPos.j === -1 && currentPlayerPosX === enemyPos.i)
    console.log("Dano")
  
    //Enemy is DownLeft
  if (currentPlayerPosX - enemyPos.i === -1 && currentPlayerPosY - enemyPos.j === 1)
    console.log("Dano")    

  //Enemy is UpRight
  if (currentPlayerPosX - enemyPos.i === 1 && currentPlayerPosY - enemyPos.j === -1)
    console.log("Dano")

  //Enemy is UpLeft
  if (currentPlayerPosY - enemyPos.j === 1 && currentPlayerPosX - enemyPos.i === 1)
    console.log("Dano")

  //Enemy is DownRight
  if (currentPlayerPosY - enemyPos.j === -1 && currentPlayerPosX - enemyPos.i === -1)
    console.log("Dano")
  
  //Other cases
  if (Math.abs(currentPlayerPosX - enemyPos.i) > 1
      ||
      Math.abs(currentPlayerPosY - enemyPos.j) > 1
  ) console.log("You can't hit from there")
}