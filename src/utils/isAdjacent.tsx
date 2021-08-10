import {
  currentPlayerPosX,
  currentPlayerPosY,
} from '../../pages/';

export default function isAdjacent(
  finalPosX : number,
  finalPosY : number,
  initialPosX : number = currentPlayerPosX,
  initialPosY : number = currentPlayerPosY,
  allowedDiagonals : boolean = false 
  ) {
  
  //Check Up
  if (initialPosX - finalPosX === -1 && initialPosY === finalPosY)
    return true  

  //Check Down
  if (initialPosX - finalPosX === 1 && initialPosY === finalPosY)
    return true

  //Check Left
  if (initialPosY - finalPosY === 1 && initialPosX === finalPosX)
    return true

  //Check Right
  if (initialPosY - finalPosY === -1 && initialPosX === finalPosX)
    return true
  
  else if (allowedDiagonals === true ) {
    //Check Up-Right
    if (initialPosX - finalPosX === -1 && initialPosY - finalPosY === 1)
      return true  

    //Check Up-Left
    if (initialPosX - finalPosX === -1 && initialPosY - finalPosY === -1)
      return true

    //Check Down-Right
    if (initialPosX - finalPosX === 1 && initialPosY - finalPosY === 1)
      return true

    //Check Down-Left
    if (initialPosX - finalPosX === 1 && initialPosY - finalPosY === -1)
      return true
  } 
    
}