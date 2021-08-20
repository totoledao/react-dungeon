export default function playerMovement(
  playerPos:{ i: number, j: number },
  nextPos: { i: number, j: number }
  ) {

  //Player is moving Up
  if (playerPos.i - nextPos.i === -1 && playerPos.j === nextPos.j)
    return { i: nextPos.i, j: nextPos.j };    

  //Player is moving Down
  if (playerPos.i - nextPos.i === 1 && playerPos.j === nextPos.j)
    return { i: nextPos.i, j: nextPos.j };

  //Player is moving Left
  if (playerPos.j - nextPos.j === 1 && playerPos.i === nextPos.i)
    return { i: nextPos.i, j: nextPos.j };

  //Player is moving Right
  if (playerPos.j - nextPos.j === -1 && playerPos.i === nextPos.i)
    return { i: nextPos.i, j: nextPos.j };
  
  //Other cases
  if (playerPos.i - nextPos.i !== 1 ||
      playerPos.i - nextPos.i !== -1
      &&
      playerPos.j - nextPos.j !== 1 ||
      playerPos.j - nextPos.j !== -1
  ) console.log("You cannot walk diagonally"); return { i: playerPos.i, j: playerPos.j }
  
}