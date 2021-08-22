import { mouseDown, mouseUp } from '../../pages';

export default function longPress() {
  
  if(mouseUp - mouseDown >= 400) {
    console.log("LONG");
    
    return true    
  } else {
    console.log("SHORT")
    return false   
  }
  
}