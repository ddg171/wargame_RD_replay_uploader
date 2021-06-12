import { GameType, IncomeRate, MapList, VictoryCondition } from "../data"
import { GameInfo, PlayerList, WargamePlayer, WargameReplayHeader } from "../types"

export function findHeader(data: string | undefined, regex: RegExp = /\{"game":.+\}\}/): string | null {
    if (!data) return null
    if (!regex) return null
    const result: string[] | null = regex.exec(data)
    return result ? result.toString() : null
}

export function convertGameInfo(header: any): GameInfo | null {
    if (!header) return null
    const game = header.game
    if (!game) return null
    return {
        IsNetworkMode: game.IsNetworkMode || null,
        GameMode: game.GameMode || null,
        Version: game.Version || null,
        Map: game.Map || null,
        NbMaxPlayer: parseInt(game.NbMaxPlayer),
        NbAI: parseInt(game.NbAI),
        GameType: game.GameType || null,
        Private: game.Private || null,
        InitMoney: parseInt(game.InitMoney),
        TimeLimit: parseInt(game.TimeLimit),
        ScoreLimit: parseInt(game.ScoreLimit),
        ServerName: game.ServerName || null,
        VictoryCond: game.VictoryCond || null,
        NationConstraint: game.NationConstraint || null,
        ThematicConstraint: game.ThematicConstraint || null,
        DateConstraint: game.DateConstraint || null,
        IncomeRate: game.IncomeRate || null,
        AllowNbObs: game.AllowNbObs || null,
        Seed: game.Seed || null,
    }
}

export function convertPlayerList(header: any): PlayerList | null {
    if (!header) return null
    const keys: string[] = Object.keys(header)
    if (!keys) return null
    if (keys.length === 1) return []
    const playerList: PlayerList = []
    keys.forEach((k: string) => {
        if (k === "game") return
        const p = header[k]
        if (!p) return
        const player: WargamePlayer = {
            // PlayerUserId: p.PlayerUserId.toString() || '',
            PlayerAlliance: parseInt(p.PlayerAlliance),
            PlayerIsEnteredInLobby: parseInt(p.PlayerIsEnteredInLobby),
            PlayerElo: parseInt(p.PlayerElo),
            PlayerRank: parseInt(p.PlayerRank),
            PlayerLevel: parseInt(p.PlayerLevel),
            PlayerName: p.PlayerName.toString() || null,
            // PlayerTeamName: p.PlayerTeamName.toString() || '',
            // PlayerAvatar: p.PlayerAvatar.toString() || '',
            PlayerIALevel: parseInt(p.PlayerIALevel),
            PlayerReady: parseInt(p.PlayerReady),
            PlayerDeckName: p.PlayerDeckName.toString() || null,
            PlayerDeckContent: p.PlayerDeckContent.toString() || null,
            PlayerScoreLimit: parseInt(p.PlayerScoreLimit),
            PlayerIncomeRate: parseInt(p.PlayerIncomeRate),
        }
        playerList.push(player)
    })
    return playerList
}

export function convertHeader(header: any): WargameReplayHeader | null {
    try {
        const game: GameInfo | null = convertGameInfo(header)
        const player: PlayerList | null = convertPlayerList(header)
        if (!game || !player) return null
        return { game, player }
    } catch (error) {
        console.log(error)
        return null
    }

}

export function autoId(len: number = 5): string {
    const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId: string = '';
    for (let i = 0; i < len; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
}

// ファイル名出力関数
export function fileName(ext: string = "wargamerpl2"): string {
    return `${new Date().getTime().toString()}_${autoId(10)}.${ext}`
}

// サニタイズ
export const sanitize = {
    encode: (str: string | undefined): string => {
        if (!str) return ''
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    },
    decode: (str: string | undefined) => {
        if (!str) return ''
        return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&amp;/g, '&');
    }
}