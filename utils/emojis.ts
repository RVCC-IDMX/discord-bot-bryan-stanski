import cowsay from './cowsay';

export default function () {
  let emoji: string = '🥦';
  const output = cowsay();
  if (output === `\`\`\`Exceeded Discord's 2000 character limit\`\`\``) {
    emoji = '🚫';
  }
  return emoji;
}
