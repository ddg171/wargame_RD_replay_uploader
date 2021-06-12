export type WargamePlayer = {
    // PlayerUserId: string
    PlayerAlliance: number | null
    PlayerIsEnteredInLobby: number | null
    PlayerElo: number | null
    PlayerRank: number | null
    PlayerLevel: number | null
    PlayerName: string | null
    // PlayerTeamName: string
    // PlayerAvatar: string
    PlayerIALevel: number | null
    PlayerReady: number | null
    PlayerDeckName: string | null
    PlayerDeckContent: string | null
    PlayerScoreLimit: number | null
    PlayerIncomeRate: number | null
}

export type PlayerList = WargamePlayer[]

export type GameInfo = {
    IsNetworkMode: string | null
    GameMode: string | null
    Version: string | null
    Map: string | null
    NbMaxPlayer: number | null
    NbAI: number | null
    GameType: string | null
    Private: number | null
    InitMoney: number | null
    TimeLimit: number | null
    ScoreLimit: number | null
    ServerName: string | null
    VictoryCond: string | null
    NationConstraint: string | null
    ThematicConstraint: string | null
    DateConstraint: number | null
    IncomeRate: string | null
    AllowNbObs: string | null
    Seed: string | null
}


export type WargameReplayHeader = {
    game: GameInfo
    player: PlayerList
}


// リプレイ投稿後のレスポンス
export type UploadResult = {
    id: string
    pin: string
    date?: string
}
