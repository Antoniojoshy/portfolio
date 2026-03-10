import { useState, useEffect, useCallback } from 'react';
import { fetchPexelsCollectionPhotos, PexelsPhoto } from '../services/pexelsService';

export function usePexelsPhotos(perPage: number = 40) {
    const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadPhotos = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchPexelsCollectionPhotos(perPage);

            // Shuffle image order each page load as requested
            const shuffled = [...data].sort(() => Math.random() - 0.5);
            setPhotos(shuffled);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch photos from Pexels collection');
        } finally {
            setLoading(false);
        }
    }, [perPage]);

    useEffect(() => {
        loadPhotos();
    }, [loadPhotos]);

    return { photos, loading, error, reload: loadPhotos };
}
