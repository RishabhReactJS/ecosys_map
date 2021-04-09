export function getPosition(id){
const ele = document.getElementById(id)
return ele.getBoundingClientRect()
}