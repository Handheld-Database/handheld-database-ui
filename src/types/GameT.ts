type Game = {
    name: string;
    key: string;
    rank: string;
}

type GameDetails = {
    name: string
    key: string
    rank_numeric: number
    rank: string
    testers: string[]
}

export type { Game, GameDetails }