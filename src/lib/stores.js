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
