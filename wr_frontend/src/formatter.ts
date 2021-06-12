export default {
  gameMode: (val: string): string => {
    const mode: { [K: string]: string } = {
      "1": "Skirmish",
      "2": "Multi",
      "3": "Ranked",
    };
    return mode[val.toString()] || val.toString();
  },
  victoryCondition: (val: string): string => {
    const conditions: { [K: string]: string } = {
      "1": "Destruction",
      "4": "Conquest",
      "3": "Economy",
      "5": "Breakthrough Conquest",
    };
    return conditions[val.toString()] || val.toString();
  },
  gameRule: (val: number): string => {
    const rules: { [K: string]: string } = {
      "0": "NATO vs PACT",
      "1": "NATO vs NATO",
      "2": "PACT vs PACT",
    };
    return rules[val] || val.toString();
  },
  gameType: (val: string): string => {
    const types: { [K: string]: string } = {
      "0": "NATO vs PACT",
      "1": "NATO vs NATO",
      "2": "PACT vs PACT",
    };
    return types[val] || val.toString();
  },
  incomeRate: (val: string): string => {
    const rates: { [K: string]: string } = {
      "1": "Very low",
      "2": "Low",
      "3": "Normal",
      "4": "High",
      "5": "Very high",
    };
    return rates[val] || val.toString();
  },
  map: (val: string): string => {
    const mapId: string = mapNameTrim(val);
    const map: { [T: string]: string } = {
      "2x3_Esashi": "Tropic Thunder",
      "2x3_Hwaseong": "Nuclear winter is coming",
      "2x2_port_Wonsan_Terrestre": "Wonsan harbour",
      "3x3_Muju": "Plunjing Valley",
      "2x3_Montagne_1": "Death Row",
      "2x3_Tohoku_Alt": "Paddy Field(small)",
      "2x3_Tohoku": "Paddy Field",
      "3x3_Muju_Alt": "Punchbowl",
      "3x3_Marine_3_Reduite_Terrestre": "Hell in a Very Small Place",
      "5x3_Marine_1_small_Terrestre": "Strait to the point (small)",
      "2x2_port_Wonsan": "#land_sea Wonsan harbor",
      "4x4_Marine_6": "#sea Out of the blue",
      "4x4_Marine_7": "#sea Standoff in Barents",
      "2x3_Boseong": "Apocalypse Imminent",
      "2x3_Anbyon": "Hop and Glory",
      "2x3_Montagne_3": "Chosin Reservoir",
      "3x2_Taebuko": "Jungle LAW",
      "3x2_Haenam_Alt": "Operation Chromite",
      "3x3_Highway_Small": "Highway to Seoul(small)",
      "3x2_Boryeong_Terrestre": "Gunboat diplomacy",
      "2x3_Marine_3_Terrestre": "Another D-Day in paradise(small)",
      "5x3_Marine_1_small": "#land_sea Strait to the point(small)",
      "4x4_Marine_10": "#sea Alea Jacta West",
      "4x4_Marine_9": "#sea Bulldogs and Vampires",
      "3x2_Sangju": "Tough Jungle",
      "3x3_Chongju_Alt": "Wrecks and Rocks",
      "3x2_Taean": "Bloody Ridge",
      "2x3_Montagne_2": "Cliff Hanger",
      "3x2_Haenam": "Back to Inchon",
      "5x3_Marine_1_Terrestre": "Strait to the point",
      "3x3_Pyeongtaek_Alt": "38th Perpendicular",
      "3x3_Highway": "Highway to Seoul",
      "3x3_Thuringer_Wald": "Snake Pit",
      "3x3_Thuringer_Wald_Alt": "Crossroads",
      "3x2_Boryeong": "#land_sea Gunboat diplomacy",
      "3x3_Marine_3": "#land_sea Another D-Day in paradise",
      "4x4_Marine_4": "#sea Atoll Inbound",
      "4x4_Marine_5": "#sea Waterworld",
      "4x3_Sanju_Alt": "The Green Mile",
      "5x3_Marine_1_Alt": "Battle of Yuchalnok Pass",
      "3x3_Pyeongtaek": "38th Parallel",
      "3x3_Montagne_4": "A Maze in Japan",
      "3x3_Chongju": "Korea Rocks",
      "3x3_Montagne_1": "Cold War Z",
      "3x3_Gangjin": "Floods",
      "4x4_ThreeMileIsland": "Sun of Juche",
      "4x4_ThreeMileIsland_Alt": "Final Meltdown",
      "4x3_Gjoll": "Heartbreak Ridge",
      "3x3_Asgard": "The Crown of Crags",
      "5x3_Marine_1": "#land_sea Strait to the point",
      "3x3_Marine_2": "#land_sea Smoke in the water",
      "5x3_Asgard_10v10": "Asgard",
      "5x3_Gjoll_10v10": "Gjoll",
      "2x3_Gangjin": "Mud Fight",
      "4x3_Sangju_Alt": "The Green Mile",
      "3x3_Marine_3_Terrestre": "Another D-Day in paradise",
      "4x4_Russian_Roulette": "Russian Roulette"
    };
    return map[mapId] || val.toString();
  },
  timeLimit(val: number): string {
    if (!val) return "No timelimit";
    return `${val / 60} min`;
  },
};

export function mapNameTrim(val: string): string {
  return val.replace("Destruction_", "").replace("Conquete_", "");
}