import { writable } from 'svelte/store';

// Initialize writable store with an empty string as default value
export const usernameStore = writable('');

export function calculateUnixTimestamp(selectedDate = '', selectedTime = '') {
    const [year, month, day] = selectedDate.split('-').map(Number);
    const [hours, minutes] = selectedTime.split(':').map(Number);

    // Create a Date object in UTC
    let selectedDateTime = new Date(Date.UTC(year, month - 1, day, hours, minutes)); 

    return selectedDateTime.getTime(); 
}

export function getCurrentUnixTimestamp() {
    const currentDateTime = new Date();
    return currentDateTime.getTime();
}

export function unixToGMTPlus2(unixTimestamp = 0) {
    // Create a new Date object directly from the Unix timestamp (in milliseconds)
    const date = new Date(unixTimestamp);

    // Calculate the GMT+2 offset in minutes
    const gmtPlus2Offset = 2 * 60;

    // Get the current UTC time and add the GMT+2 offset
    const gmtPlus2Date = new Date(date.getTime() + (gmtPlus2Offset * 60 * 1000));

    // Array of month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Format the time and date string
    const hours = String(gmtPlus2Date.getUTCHours()).padStart(2, '0');
    const minutes = String(gmtPlus2Date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(gmtPlus2Date.getUTCSeconds()).padStart(2, '0');
    const day = String(gmtPlus2Date.getUTCDate()).padStart(2, '0');
    const month = monthNames[gmtPlus2Date.getUTCMonth()];
    const year = gmtPlus2Date.getUTCFullYear();

    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}

