import { useState, useEffect, useCallback } from 'react';
import { fetchPexelsCollectionPhotos, PexelsPhoto } from '../services/pexelsService';

export function usePexelsPhotos(initialPerPage: number = 6) {
    const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const loadPhotos = useCallback(async (pageNum: number, perBatch: number, append: boolean = false) => {
        if (append) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }
        setError(null);
        try {
            const data = await fetchPexelsCollectionPhotos(pageNum, perBatch);
            
            if (data.length < perBatch) {
                setHasMore(false);
            }

            if (append) {
                setPhotos(prev => [...prev, ...data]);
            } else {
                setPhotos(data);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch photos from Pexels collection');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    useEffect(() => {
        loadPhotos(1, initialPerPage, false);
    }, [loadPhotos, initialPerPage]);

    const loadMore = useCallback(async () => {
        if (loadingMore || !hasMore) return;
        const nextPage = page + 1;
        setPage(nextPage);
        await loadPhotos(nextPage, 10, true);
    }, [page, loadingMore, hasMore, loadPhotos]);

    return { 
        photos, 
        loading, 
        loadingMore, 
        error, 
        hasMore,
        loadMore,
        reload: () => {
            setPage(1);
            setHasMore(true);
            loadPhotos(1, initialPerPage, false);
        }
    };
}
