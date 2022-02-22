export function checkIfRedditPostMatchesToday(postDate): boolean {
    const today = new Date()
    return postDate.getDate() === today.getDate() &&
    postDate.getMonth() === today.getMonth() &&
    postDate.getFullYear() === today.getFullYear();
}