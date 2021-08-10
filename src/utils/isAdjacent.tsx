import {
  currentPlayerPosX,
  currentPlayerPosY,
} from '../../pages/';

export default function isAdjacent(
  PosX : number,
  PosY : number,
  allowedDiagonals : boolean = false,
  Pos2X : number = currentPlayerPosX,
  Pos2Y : number = currentPlayerPosY
  ) {
  
  //Check Up
  if (PosX - Pos2X === -1 && PosY === Pos2Y)
    return true  

  //Check Down
  if (PosX - Pos2X === 1 && PosY === Pos2Y)
    return true

  //Check Left
  if (PosY - Pos2Y === 1 && PosX === Pos2X)
    return true

  //Check Right
  if (PosY - Pos2Y === -1 && PosX === Pos2X)
    return true
  
  else if (allowedDiagonals === true ) {
    //Check Up-Right
    if (PosX - Pos2X === -1 && PosY - Pos2Y === 1)
      return true  

    //Check Up-Left
    if (PosX - Pos2X === -1 && PosY - Pos2Y === -1)
      return true

    //Check Down-Right
    if (PosX - Pos2X === 1 && PosY - Pos2Y === 1)
      return true

    //Check Down-Left
    if (PosX - Pos2X === 1 && PosY - Pos2Y === -1)
      return true
  }
    
}