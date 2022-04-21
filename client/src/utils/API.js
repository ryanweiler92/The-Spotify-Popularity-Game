export const searchGames = (query) => {
    return fetch(`https://www.cheapshark.com/api/1.0/games?title=${query}`)
}