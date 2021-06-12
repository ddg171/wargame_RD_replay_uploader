// 陣営設定
export const GameType: { [T: string]: string } = {
    0: "NATO vs PACT",
    1: "NATO v sNATO",
    2: "PACT vs PACT",
}

// ゲームルール
export const VictoryCondition: { [T: string]: string } = {
    1: "Destruction",
    2: "Siege",
    3: "Economy",
    4: "Conquest",
    5: "BreakthroughConquest",
}

// ポイント収入
export const IncomeRate: { [T: string]: string } = {
    1: "VeryLow",
    2: "Low",
    3: "Normal",
    4: "High",
    5: "VeryHigh",
}

// 部屋の国縛り設定
export const NationConstraint: { [T: string]: string } = {
    "-1": "None",
    "0": "Any",
    "1": "Nation",
    "2": "Coalition",
}

// 部屋の兵科縛り設定
export const ThematicConstraint: { [T: string]: string } = {
    "-2": "Any",
    "-1": "None",
    "0": "Motorized",
    "1": "Armored",
    "2": "Support",
    "3": "Marine",
    "4": "Mechanized",
    "5": "Airborne",
    "6": "Naval",
}

export const DateConstraint: { [T: string]: string } = {
    "-1": "None",
    "0": "1985",
    "1": "1980",
}

type Size = "1vs1" | "2vs2" | "3vs3" | "4vs4" | "10vs10"
type Rule = "Destruction" | "Conquest" | "Economy"

type MapData = {
    name: string
    size: Size
    hasSea?: boolean
    rules?: string[]
}

export const MapList: { [T: string]: MapData } = {
    "Destruction_2x2_port_Wonsan_Terrestre": { size: "1vs1", name: "Wonsan harbour", rules: ["Destruction", "Economy"], },
    "Destruction_2x2_port_Wonsan": { size: "1vs1", name: "Wonsan harbour", hasSea: true, rules: ["Destruction", "Economy"], },
    "Destruction_2x3_Hwaseong": { size: "1vs1", name: "Nuclear winter is coming", rules: ["Destruction", "Economy"], },
    "Destruction_2x3_Esashi": { size: "1vs1", name: "Tropic Thunder", rules: ["Destruction", "Economy"], },
    "Destruction_2x3_Boseong": { size: "1vs1", name: "Apocalypse Imminent", rules: ["Destruction", "Economy"], },
    "Destruction_2x3_Tohoku": { size: "2vs2", name: "Paddy Field", rules: ["Destruction", "Economy"], },
    "Destruction_2x3_Anbyon": { size: "2vs2", name: "Hop and Glory", rules: ["Destruction", "Economy"], },
    "Destruction_2x3_Gangjin": {
        size: "1vs1", name: "Mud Fight !", rules: ["Destruction", "Economy"],
    },
    "Destruction_2x3_Montagne_2": { size: "3vs3", name: "Cliff Hanger", rules: ["Destruction", "Economy"], },
    "Destruction_3x2_Boryeong_Terrestre": { size: "2vs2", name: "Gunboat diplomacy", rules: ["Destruction", "Economy"], },
    "Destruction_3x2_Haenam": { size: "3vs3", name: "Back to Inchon", rules: ["Destruction", "Economy"], },
    "Destruction_3x3_Marine_2": { size: "4vs4", name: "Smoke in the water", hasSea: true, rules: ["Destruction", "Economy"], },
    "Destruction_3x3_Marine_3": {
        size: "3vs3", name: "Another D - Day in paradise", hasSea: true, rules: ["Destruction", "Economy"],
    },
    "Destruction_3x2_Boryeong": { size: "3vs3", name: "Gunboat diplomacy", hasSea: true, rules: ["Destruction", "Economy"], },
    "Destruction_3x2_Taean": { size: "3vs3", name: "Bloody Ridge", rules: ["Destruction", "Economy"], },
    "Destruction_3x2_Taebuko": { size: "2vs2", name: "Jungle LAW", rules: ["Destruction", "Economy"], },
    "Destruction_3x2_Sangju": { size: "2vs2", name: "Tough Jungle", rules: ["Destruction", "Economy"], },
    "Destruction_3x2_Montagne_3": { size: "2vs2", name: "Chosin Reservoir", rules: ["Destruction", "Economy"], },
    "Destruction_3x3_Muju": { size: "1vs1", name: "Plunjing Valley", rules: ["Destruction", "Economy"], },
    "Destruction_3x3_Pyeongtaek": { size: "3vs3", name: "38th Parallel", rules: ["Destruction", "Economy"], },
    "Destruction_3x3_Marine_3_Terrestre": { size: "2vs2", name: "Another D - Day in paradise", rules: ["Destruction", "Economy"], },
    "Destruction_3x3_Montagne_1": { size: "4vs4", name: "Cold War Z", rules: ["Destruction", "Economy"], },
    "Destruction_3x3_Montagne_4": { size: "3vs3", name: "A Maze in Japan", rules: ["Destruction", "Economy"], },
    "Destruction_3x3_Chongju": { size: "4vs4", name: "Korea Rocks", rules: ["Destruction", "Economy"], },
    "Destruction_3x3_Gangjin": { size: "4vs4", name: "Floods", rules: ["Destruction", "Economy"], },
    "Destruction_4x4_Marine_6": { size: "1vs1", name: "Out of the blue", rules: ["Destruction", "Economy"], },
    "Destruction_4x4_Marine_7": { size: "1vs1", name: "Standoff in Barents", rules: ["Destruction", "Economy"], },
    "Destruction_4x4_Marine_9": { size: "2vs2", name: "Bulldogs and Vampires", rules: ["Destruction", "Economy"], },
    "Destruction_4x4_Marine_10": { size: "2vs2", name: "Alea Jacta West", rules: ["Destruction", "Economy"], },
    "Destruction_4x4_Marine_4": { size: "3vs3", name: "Atoll Inbound", rules: ["Destruction", "Economy"], },
    "Destruction_4x4_Marine_5": { size: "3vs3", name: "Waterworld", rules: ["Destruction", "Economy"], },
    "Destruction_5x3_Marine_1_small_Terrestre": { size: "1vs1", name: "Strait to the point(small)", rules: ["Destruction", "Economy"], },
    "Destruction_5x3_Marine_1_small": { size: "2vs2", name: "Strait to the point(small)", hasSea: true, rules: ["Destruction", "Economy"], },
    "Destruction_5x3_Marine_1_Terrestre": { size: "3vs3", name: "Strait to the point", rules: ["Destruction", "Economy"], },
    "Destruction_5x3_Marine_1": { size: "4vs4", name: "Strait to the point", hasSea: true, rules: ["Destruction", "Economy"], },
    "Destruction_5x3_Asgard_10v10": { size: "10vs10", name: "Asgard", rules: ["Destruction", "Economy"], },
    "Destruction_5x3_Gjoll_10v10": { size: "10vs10", name: "Gjoll", rules: ["Destruction", "Economy"], },
    "Destruction_4x4_Russian_Roulette": { size: "10vs10", name: "Russian Roulette", rules: ["Destruction", "Economy"], },
    "Conquete_2x2_port_Wonsan_Terrestre": { size: "1vs1", name: "Wonsan harbour", rules: ["Conquest"], },
    "Conquete_2x2_port_Wonsan": { size: "1vs1", name: "Wonsan harbour", hasSea: true, rules: ["Conquest"], },
    "Conquete_2x3_Hwaseong": { size: "1vs1", name: "Nuclear winter is coming", rules: ["Conquest"], },
    "Conquete_2x3_Boseong": { size: "1vs1", name: "Apocalypse Imminent", rules: ["Conquest"], },
    "Conquete_2x3_Esashi": { size: "1vs1", name: "Tropic Thunder", rules: ["Conquest"], },
    "Conquete_2x3_Tohoku": { size: "2vs2", name: "Paddy Field", rules: ["Conquest"], },
    "Conquete_2x3_Anbyon": { size: "2vs2", name: "Hop and Glory", rules: ["Conquest"], },
    "Conquete_2x3_Gangjin": { size: "1vs1", name: "Mud Fight!", rules: ["Conquest"], },
    "Conquete_2x3_Montagne_2": { size: "3vs3", name: "Cliff Hanger", rules: ["Conquest"], },
    "Conquete_3x2_Boryeong_Terrestre": { size: "2vs2", name: "Gunboat diplomacy", rules: ["Conquest"], },
    "Conquete_3x2_Montagne_3": { size: "2vs2", name: "Chosin Reservoir", rules: ["Conquest"], },
    "Conquete_3x2_Sangju": { size: "2vs2", name: "Tough Jungle", rules: ["Conquest"], },
    "Conquete_3x2_Taebuko": { size: "2vs2", name: "Jungle LAW", rules: ["Conquest"], },
    "Conquete_3x2_Boryeong": { size: "3vs3", name: "Gunboat diplomacy", hasSea: true, rules: ["Conquest"], },
    "Conquete_3x2_Taean": { size: "3vs3", name: "Bloody Ridge", rules: ["Conquest"], },
    "Conquete_3x2_Haenam": { size: "3vs3", name: "Back to Inchon", rules: ["Conquest"], },
    "Conquete_3x3_Marine_2": { size: "4vs4", name: "Smoke in the water", hasSea: true, rules: ["Conquest"], },
    "Conquete_3x3_Marine_3": { size: "3vs3", name: "Another D - Day in paradise", hasSea: true, rules: ["Conquest"], },
    "Conquete_3x3_Muju": { size: "1vs1", name: "Plunjing Valley", rules: ["Conquest"], },
    "Conquete_3x3_Pyeongtaek": { size: "3vs3", name: "38th Parallel", rules: ["Conquest"], },
    "Conquete_3x3_Marine_3_Terrestre": { size: "2vs2", name: "Another D - Day in paradise", rules: ["Conquest"], },
    "Conquete_3x3_Montagne_1": { size: "4vs4", name: "Cold War Z", rules: ["Conquest"], },
    "Conquete_3x3_Montagne_4": { size: "3vs3", name: "A Maze in Japan", rules: ["Conquest"], },
    "Conquete_3x3_Chongju": { size: "4vs4", name: "Korea Rocks", rules: ["Conquest"], },
    "Conquete_3x3_Gangjin": { size: "4vs4", name: "Floods", rules: ["Conquest"], },
    "Conquete_3x3_Highway_Small": { size: "2vs2", name: "Highway to Seoul", rules: ["Conquest"] },
    "Conquete_4x4_Marine_6": { size: "1vs1", name: "Out of the blue", rules: ["Conquest"], },
    "Conquete_4x4_Marine_7": { size: "1vs1", name: "Standoff in Barents", rules: ["Conquest"], },
    "Conquete_4x4_Marine_9": { size: "2vs2", name: "Bulldogs and Vampires", rules: ["Conquest"], },
    "Conquete_4x4_Marine_10": { size: "2vs2", name: "Alea Jacta West", rules: ["Conquest"], },
    "Conquete_4x4_Marine_4": { size: "3vs3", name: "Atoll Inbound", rules: ["Conquest"], },
    "Conquete_4x4_Marine_5": { size: "3vs3", name: "Waterworld", rules: ["Conquest"], },
    "Conquete_5x3_Marine_1_small_Terrestre": { size: "1vs1", name: "Strait to the point(small)", rules: ["Conquest"], },
    "Conquete_5x3_Marine_1_small": { size: "2vs2", name: "Strait to the point(small)", hasSea: true, rules: ["Conquest"], },
    "Conquete_5x3_Marine_1_Terrestre": { size: "3vs3", name: "Strait to the point", rules: ["Conquest"], },
    "Conquete_5x3_Marine_1": { size: "4vs4", name: "Strait to the point", hasSea: true, rules: ["Conquest"], },
    "Conquete_5x3_Asgard_10v10": { size: "10vs10", name: "Asgard", rules: ["Conquest"], },
    "Conquete_5x3_Gjoll_10v10": { size: "10vs10", name: "Gjoll", rules: ["Conquest"], },
    "Conquete_4x4_Russian_Roulette": { size: "10vs10", name: "Russian Roulette", rules: ["Conquest"], },
}

export const PlayerAlliance: { [T: string]: ("NATO" | "PACT") } = {
    0: "NATO",
    1: "PACT"
}