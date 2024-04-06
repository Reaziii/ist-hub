export function getMonthAndDateFromTimestamp(timestamp: number): { month: string, date: number } {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateObject = new Date(timestamp);
    const monthIndex = dateObject.getMonth();
    const month = monthNames[monthIndex];
    const date = dateObject.getDate();
    return { month, date };
}

export function getMonthAndYearFromTimestamp(timestamp: number): { month: string, year: number } {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateObject = new Date(timestamp);
    const monthIndex = dateObject.getMonth();
    const month = monthNames[monthIndex];
    const year = dateObject.getFullYear();
    return { month, year };
}