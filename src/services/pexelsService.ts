export interface PexelsPhoto {
    id: number;
    image: string;
    thumbnail: string;
    photographer: string;
    photographerUrl: string;
}

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const COLLECTION_ID = 'd7fuwai';

export async function fetchPexelsCollectionPhotos(perPage: number = 40): Promise<PexelsPhoto[]> {
    if (!API_KEY || API_KEY === 'your_api_key_here') {
        console.warn('Pexels API key is not set or is the placeholder. Please set VITE_PEXELS_API_KEY in .env');
        return [];
    }

    try {
        const response = await fetch(`https://api.pexels.com/v1/collections/${COLLECTION_ID}?per_page=${perPage}&type=photos`, {
            headers: {
                Authorization: API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`Pexels API error: ${response.statusText}`);
        }

        const data = await response.json();

        // Map to simplified objects as requested
        return data.media.map((item: any) => ({
            id: item.id,
            image: item.src.large2x,
            thumbnail: item.src.medium,
            photographer: item.photographer,
            photographerUrl: item.photographer_url
        }));
    } catch (error) {
        console.error('Error fetching Pexels collection:', error);
        throw error;
    }
}
