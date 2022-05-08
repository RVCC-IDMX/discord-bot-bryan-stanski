import fs, { Dirent } from 'fs';

const getFiles = (src: string, dir: string, suffix: string): string[] => {
  const files: Dirent[] = fs.readdirSync(`${src}/${dir}`, {
    withFileTypes: true,
  });

  let commandFiles: string[] = [];

  files.forEach((file: Dirent) => {
    if (file.isDirectory()) {
      commandFiles = [
        ...commandFiles,
        ...getFiles(src, `${dir}/${file.name}`, suffix),
      ];
    } else if (file.name.endsWith(suffix)) {
      commandFiles.push(`./${dir}/${file.name}`.replace(suffix, ''));
    }
  });

  // console.log(commandFiles);

  return commandFiles;
};

export default getFiles;
