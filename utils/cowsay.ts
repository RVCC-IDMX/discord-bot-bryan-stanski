import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';
import getRandomInt from './random';
import quotes from './quotes.json';

export default function () {
  /*
randomInt gets a random int from getRandomInt
It uses that random number to find the object
at that specific location in the array
It gets that object's properties for quote
and author and formats them into a string
in opts
*/

  const randomInt = getRandomInt(0, 100);
  const quoteLocation = quotes[randomInt];
  const quoteMessage = quoteLocation.quote;
  const quoteAuthor = quoteLocation.author;

  let opts: IOptions = {
    text: `${quoteMessage} - ${quoteAuthor}`,
    e: '00', // Changes eyes
    T: 'U', // Changes tongue
    f: 'mona-lisa', // Changes "cow" to a different "cow". For example, if set to C3PO the cow will become C3PO
    r: true, // Randomizes "cow"
    y: false, // Changes "cow" to look young/somewhat simple
  };

  let output: string = cowsay.say(opts);
  output = output.replace(/```/g, "'''");
  if (output.length > 1996) {
    output = "Exceeded Discord's 2000 character limit";
  }
  return `\`\`\`${output}\`\`\``;
}
