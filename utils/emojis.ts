import * as cowsay from 'cowsay';
import { opts } from './cowsay';

export default function () {
  let emoji: string = '🥦';
  let output: string = cowsay.say(opts);
  output = output.replace(/```/g, "'''");
  if (output.length > 1996) {
    emoji = '🚫';
  }
  return emoji;
}
