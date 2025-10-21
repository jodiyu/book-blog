export async function getBooks() {
    // Use revalidate for caching
    const response = await fetch('/api', { 
        next: { revalidate: 3600 } // Client-side caching: cache for 1 hour
    });
    
    // Log cache status
    const cacheStatus = response.headers.get('x-vercel-cache') || 
                       response.headers.get('cf-cache-status') || 
                       'unknown';
    console.log('Cache status:', cacheStatus);
    console.log('Response type:', response.type); 
    
    if (!response.ok) {
        console.error('Error fetching books:', response.statusText);
        throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    console.log('Books fetched successfully:', data.length, 'books');
    return data;
}