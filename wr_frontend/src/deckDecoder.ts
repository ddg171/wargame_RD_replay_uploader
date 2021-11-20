import {debugLog} from "./util/debug"

export type DeckInfo = {
  side: string | undefined;
  nation: string | undefined;
  spec: string | undefined;
  era: string | undefined;
};

const initialSADFVersion= 58710

const strMap: { [S: string]: string } = {
  A: "000000",
  B: "000001",
  C: "000010",
  D: "000011",
  E: "000100",
  F: "000101",
  G: "000110",
  H: "000111",
  I: "001000",
  J: "001001",
  K: "001010",
  L: "001011",
  M: "001100",
  N: "001101",
  O: "001110",
  P: "001111",
  Q: "010000",
  R: "010001",
  S: "010010",
  T: "010011",
  U: "010100",
  V: "010101",
  W: "010110",
  X: "010111",
  Y: "011000",
  Z: "011001",
  a: "011010",
  b: "011011",
  c: "011100",
  d: "011101",
  e: "011110",
  f: "011111",
  g: "100000",
  h: "100001",
  i: "100010",
  j: "100011",
  k: "100100",
  l: "100101",
  m: "100110",
  n: "100111",
  o: "101000",
  p: "101001",
  q: "101010",
  r: "101011",
  s: "101100",
  t: "101101",
  u: "101110",
  v: "101111",
  w: "110000",
  x: "110001",
  y: "110010",
  z: "110011",
  "0": "110100",
  "1": "110101",
  "2": "110110",
  "3": "110111",
  "4": "111000",
  "5": "111001",
  "6": "111010",
  "7": "111011",
  "8": "111100",
  "+": "111110",
  "9": "111101",
  "/": "111111",
  "=": "",
};

const sideMap: { [N: string]: string } = {
  "0": "BLU",
  "1": "RED",
  "2": "INVALID",
};

const nationMap: { [N: string]: string } = {
  "000000001100": "USA",
  "000000101100": "UK",
  "000001001100": "FRA",
  "000001101100": "BRD",
  "000010001100": "CAN",
  "000010101100": "DEN",
  "000011001100": "SWE",
  "000011101100": "NOR",
  "000100001100": "ANZAC",
  "000100101100": "JAP",
  "000101001100": "ROK",
  "000101101100": "NED",
  "000110001100": "ISR",
  "000111100000": "EU",
  "000111100001": "SCA",
  "001000000001":"SCA",
  "000111100010": "CW",
  "000111100011": "BD",
  "000111100110": "LJUT",
  "000111101000": "NORAD",
  "000111101001": "BDRNL",
  "000111101100": "SADF",
  "010000001100": "DDR",
  "010000101100": "USSR",
  "010001001100": "POL",
  "010001101100": "CZS",
  "010010001100": "PRC",
  "010010101100": "DPRK",
  "010011001100": "FIN",
  "010011101100": "YU",
  "010100100100": "RD",
  "010100100101": "NSWP",
  "010100101010": "FINPL",
  "010100101011": "YUCZE",
  "010100101100": "REDFOR",
  "001000001100":"NATO",
  "001000001001":"BDRNL",
  "001000000011":"BD"
};

const specMap: { [N: string]: string } = {
  "0": "MOTO",
  "1": "ARM",
  "2": "SUP",
  "3": "MAR",
  "4": "MECH",
  "5": "AIR",
  "6": "NAV",
  "7": "GEN",
};

const eraMap: { [N: string]: string } = {
  "0": "C",
  "1": "B",
  "2": "A",
};

function changeBinary(str: string): string {
  const bin: string | undefined = strMap[str];
  return bin;
}

export function changeBinaryStr(deck: string): string | null {
  const deckSplitted: string[] = deck.replace("@", "").split("");
  const binSplitted: string[] = deckSplitted.map((s: string) =>
    changeBinary(s)
  );
  return binSplitted.join("");
}

function nationCode(bin:string|undefined,version=0):string|undefined{
  if(!bin) return undefined
  if(isNaN(version)) return undefined
  if(bin === "000111101100" &&  version< initialSADFVersion) return "NATO" 
  return nationMap[bin];
}

export function decodeDeck(deck: string,version:number): DeckInfo | null {
  const binDeck: string | null = changeBinaryStr(deck);
  if (!binDeck) return null;
  const side: string | undefined = sideMap[binDeck.charAt(1)];
  const nation: string | undefined = nationCode(binDeck.substr(0, 12),version)
  const specCode: string = binDeck.substr(12, 3);
  const spec: string | undefined = specMap[parseInt(specCode, 2).toString()];
  const eraCode: string = binDeck.substr(15, 2);
  const era: string | undefined = eraMap[parseInt(eraCode, 2).toString()];
  const result =  { side, nation, spec, era }
  debugLog(result)
  return result;
}
