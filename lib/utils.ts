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

export function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
    return `${year}-${month}-${day}`;
}
