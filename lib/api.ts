import * as fs from 'fs';
import { join } from 'path'


export async function getSimiliar(scrambledWord: string) {
  const wordlist = readData();
  const possibleWords = findAllPossibleWords(await wordlist, scrambledWord.toLocaleLowerCase());
  return possibleWords;
}

async function readData(){
  const fullPath = (process.cwd() + '/docs/wordlist.txt')
  const fileContents =  fs.readFileSync(fullPath, 'utf8').split('\n').filter(Boolean)
  return fileContents;
}

function isWordPossible(word: string, scrambled: string): boolean {
  return [...new Set(word)].every(char => word.split(char).length - 1 <= scrambled.split(char).length - 1);
}

async function findAllPossibleWords(wordlist: string[], scrambledWord: string): Promise<string[]> {
  const possibleWords: string[] = wordlist.filter(word => isWordPossible(word, scrambledWord));
  return possibleWords;
}
