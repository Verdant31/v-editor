export function getMouseDirection(e: MouseEvent, lastPoint: { x: number | null , y: number | null }) {
  return  e.clientX > lastPoint.x ? 'right'
  : e.clientX < lastPoint.x ? 'left'
  : 'none'
}