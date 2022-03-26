import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';

let opts: IOptions = {
  text: "I don't know my fruits",
  e: '00', // Changes eyes
  T: 'U', // Changes tongue
  f: 'mona-lisa', // Changes "cow" to a different "cow". For example, if set to C3PO the cow will become C3PO
  r: true, // Randomizes "cow"
  y: false, // Changes "cow" to look young/somewhat simple
};

export default function () {
  let output: string = cowsay.say(opts);
  output = output.replace(/```/g, "'''");
  if (output.length > 1996) {
    output = "Exceeded Discord's 2000 character limit";
  }
  return `\`\`\`${output}\`\`\``;
}
