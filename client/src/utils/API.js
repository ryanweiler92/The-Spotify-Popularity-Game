export const searchGames = (query) => {
    return fetch(`https://www.cheapshark.com/api/1.0/games?title=${query}`)
}

export const getDeal = (query) => {
    return fetch (`https://www.cheapshark.com/api/1.0/deals?id=${query}`)
}