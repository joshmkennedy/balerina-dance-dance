import { GameArea } from "./GameArea";
export default function physics(speedX, speedY, x, y) {
  speedY += 0.7; // gravity
  x += speedX;
  y += speedY;
  speedX *= 0.9; // friction
  speedY *= 0.9; // friction

  return { speedX, speedY, x, y };
}
