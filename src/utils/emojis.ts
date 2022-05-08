import cowsay from './cowsay';

export default function (output: string) {
  let emoji: string = '🐄';
  if (output === `\`\`\`Exceeded Discord's 2000 character limit\`\`\``) {
    emoji = '🚫';
  } else if (output === 'Cowsay does not exist') {
    emoji = '🚫';
  }
  return emoji;
}
