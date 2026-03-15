import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';

export const useShopRecommendations = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [recommendedData, setRecommendedData] = useState({
        breed: null,
        products: [],
        services: [],
        isLoading: false,
        error: null
    });

    const breedName = searchParams.get('breed');

    useEffect(() => {
        if (!breedName) {
            setRecommendedData({
                breed: null,
                products: [],
                services: [],
                isLoading: false,
                error: null
            });
            return;
        }

        const fetchRecommendations = async () => {
            setRecommendedData(prev => ({ ...prev, isLoading: true, error: null }));
            try {
                // Using the merged API endpoint
                const response = await api.get(`/ai/recommendations?breedName=${encodeURIComponent(breedName)}`);
                
                if (response.data.success) {
                    setRecommendedData({
                        breed: response.data.data.breed,
                        products: response.data.data.products || [],
                        services: response.data.data.services || [],
                        isLoading: false,
                        error: null
                    });
                } else {
                    throw new Error(response.data.message || 'Failed to fetch recommendations');
                }
            } catch (err) {
                console.error('Error fetching recommendations:', err);
                setRecommendedData(prev => ({ 
                    ...prev, 
                    isLoading: false, 
                    error: 'Không thể tải gợi ý cho giống này.' 
                }));
            }
        };

        fetchRecommendations();
    }, [breedName]);

    const clearRecommendations = () => {
        searchParams.delete('breed');
        setSearchParams(searchParams);
    };

    return {
        ...recommendedData,
        breedName,
        clearRecommendations
    };
};
