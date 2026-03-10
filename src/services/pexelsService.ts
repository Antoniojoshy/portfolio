export interface PexelsPhoto {
  id: number;
  image: string;
  thumbnail: string;
  photographer: string;
  photographerUrl: string;
}

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export async function fetchPexelsCollectionPhotos(page = 1, perPage = 20): Promise<PexelsPhoto[]> {

  const response = await fetch(
    `https://api.pexels.com/v1/collections/d7fuwai?per_page=${perPage}&page=${page}`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );

  const data = await response.json();

  return data.media.map((photo: any) => ({
    id: photo.id,
    image: photo.src.large,
    thumbnail: photo.src.medium,
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
  }));
}