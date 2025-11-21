/**
 * @typedef {Object} Member
 * @property {string} id - Unique ID (Lineage format: Group1-Group2-...)
 * @property {number} generationIndex - Generation level (0-6)
 * @property {string} name - Full name
 * @property {string} dob - Date of Birth (YYYY-MM-DD)
 * @property {'Male' | 'Female' | 'Other'} gender - Gender
 * @property {string[]} spouseIds - IDs of spouses
 * @property {string | null} fatherId - ID of father
 * @property {string | null} motherId - ID of mother
 * @property {string} [photo] - URL or Base64 string of photo
 * @property {string} contact - Contact information (Phone/Email)
 * @property {'M' | 'U' | 'D'} maritalStatus - Marital Status (Married, Unmarried, Divorced)
 * @property {string} notes - Additional notes
 */

/**
 * Default initial state for a new member
 */
export const defaultMember = {
    id: '',
    generationIndex: 0,
    name: '',
    dob: '',
    gender: 'Male',
    spouseIds: [],
    fatherId: null,
    motherId: null,
    photo: '',
    contact: '',
    maritalStatus: 'U',
    notes: ''
};
