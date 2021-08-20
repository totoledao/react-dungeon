export default function findIndexOfValueInArray (array : {i: number, j: number}[], value : {i: number, j: number}) {
  for(var x = 0; x < array.length; x++) {
      if(array[x].i == value.i) {            
        if(array[x].j == value.j) {              
          return x;
      }}
  }
  return -1;  
}