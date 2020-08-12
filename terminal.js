#!/usr/bin/env node
const chalk = require("chalk");
const setTerminalTitle = require("set-terminal-title");
const keypress = require("keypress");

const TITLE = "Auto Clicker";
process.title = TITLE;
setTerminalTitle(TITLE);

process.stdout.write(chalk.green("Start Terminal\n"));

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on("keypress", function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == "c") {
    process.stdin.pause();
  }
});

// you must enable the mouse events before they will begin firing
keypress.enableMouse(process.stdout);

process.stdin.on("mousepress", function (info) {
  console.log('got "mousepress" event at %d x %d', info.x, info.y);
});

process.on("exit", function () {
  // disable mouse on exit, so that the state
  // is back to normal for the terminal
  keypress.disableMouse(process.stdout);
});

process.stdin.setRawMode(true);
process.stdin.resume();
