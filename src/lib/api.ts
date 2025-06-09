export async function getBooks() {
    const response = await fetch('/api');
    if (!response.ok) {
        console.error('Error fetching books:', response.statusText);
        throw new Error('Failed to fetch books');
    }
    return response.json();
}