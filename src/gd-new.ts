import { Command } from 'commander';
import { resolve } from 'path';
import { cp, ask, Shell, Logger } from './util';
import { existsSync, mkdirSync } from 'fs';
import ora from 'ora';

const program = new Command();
program
  .version('0.1.0')
  .arguments('<name>')
  .action(async (name: string) => {
    const src = resolve(__dirname, '..', 'scaffolds', 'new-game', '**', '*.*');
    const dest = resolve(process.cwd(), name);
    const shell = new Shell(dest);
    const l = new Logger(true);
    if (existsSync(dest)) {
      const answer = await ask(
        `Folder ${name} already exists. Continue? [Y/n] `
      );
      if (answer.toLowerCase() === 'n') process.exit();
    } else {
      mkdirSync(dest);
    }
    l.log(`Creating new GameDeck game in ${name}!`);
    const cpSpinner = ora(`Copying files`);
    try {
      await cp(src, dest);
      cpSpinner.succeed();
    } catch (err) {
      cpSpinner.fail();
      l.log(`Error copying scaffolding files: `, err);
      process.exit(1);
    }
    const depSpinner = ora(`Installing dependencies`);
    try {
      await shell.run('npm i', l);
      depSpinner.succeed();
    } catch (err) {
      depSpinner.fail();
      l.log(`Failed to install dependencies: `, err);
      process.exit(1);
    }
    process.exit();
  });

program.parse(process.argv);
