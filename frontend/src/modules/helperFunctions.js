export function timeConversion(date) {
    const diffMs = Date.now() - new Date(date);
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
        return diffMinutes + ' minutes ago';
    } else if (diffHours < 24) {
        return diffHours + ' hours ago';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return diffDays + ' days ago';
    } else if (diffDays > 7) {
        return new Date(date).toLocaleDateString();
    } else {
        return '';
    }
}
