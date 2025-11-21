/**
 * Generates a random 5-character string (uppercase letters and numbers).
 * @returns {string}
 */
const generateSegment = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

/**
 * Generates a unique ID for a new member.
 * If a parentId is provided, appends a new segment to it.
 * Otherwise, generates a single segment (for root/Gen 1).
 * 
 * Format: ABCXY (Gen 1) -> ABCXY-DEF12 (Gen 2) -> ...
 * 
 * @param {string | null} parentId - The ID of the parent (if applicable).
 * @returns {string} The generated unique ID.
 */
export const generateUniqueId = (parentId = null) => {
    const newSegment = generateSegment();

    if (parentId) {
        // Check if parentId already has 7 groups (max generations)
        const groups = parentId.split('-');
        if (groups.length >= 7) {
            console.warn('Maximum generation depth (7) reached. ID might exceed expected format.');
        }
        return `${parentId}-${newSegment}`;
    }

    return newSegment;
};
