export const auther = (magicNumber: number) => {

    const currentTime = new Date()
    // Round the current time to the nearest 2 minutes
    const roundedTime = new Date(Math.round(currentTime.getTime() / (2 * 60 * 1000)) * (2 * 60 * 1000));

    // Create a string from the prime and rounded time
    const inputString = `${magicNumber}-${roundedTime}`;

    // Use a simple hash function to generate a hash
    let hash = 0;
    for (let i = 0; i < inputString.length; i++) {
        const char = inputString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }

    // Convert the hash to a base36 string and pad to ensure it's 8 characters
    const base36Hash = Math.abs(hash).toString(16).padStart(8, '0').slice(0, 8);

    return base36Hash;
}