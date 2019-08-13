#!/usr/bin/env node
import commander from 'commander';
const program = new commander.Command();

program.version('0.1.0').command('new <name>', 'Create a new GameDeck game.');

program.parse(process.argv);
