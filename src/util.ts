import copy = require('copy');
import * as readline from 'readline';
import { resolve } from 'path';
import { exec } from 'child_process';

const rl = readline.createInterface(process.stdin, process.stdout);

export function cp(src: string | string[], dest: string) {
  return new Promise((resolve, reject) => {
    copy(src, dest, (err, files) => {
      if (err) reject(err);
      else resolve(files);
    });
  });
}

export function ask(question: string) {
  return new Promise<string>(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

export class Logger {
  constructor(private enabled: boolean) {}

  log(...messages: any[]) {
    if (this.enabled) {
      console.log(...messages);
    }
  }
}

export class Shell {
  constructor(private cwd: string) {}

  cd(path: string) {
    this.cwd = resolve(this.cwd, path);
  }

  run(command: string, logger: Logger) {
    return new Promise((resolve, reject) => {
      const proc = exec(command, { cwd: this.cwd }, err => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
