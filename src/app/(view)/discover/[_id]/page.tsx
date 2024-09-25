"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Discover } from '@/Components/types';

import ErrorComponent from '../error';
import Loading from './loading';
import DiscoverModal from '@/Components/Share_Models/DiscoverModal';


interface Params {
  _id: string;
}

interface ApiResponse {
  success: boolean;
  data: Discover | null;
  message?: string;
}

export default function DiscoverPage({ params }: { params: Params }) {
  const [discover, setDiscover] = useState<Discover | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDiscoverData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        setError(new Error('API URL is not defined'));
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post<ApiResponse>(
          `${apiUrl}/api/Fetch/ShareModal/Discover`,
          { postid: params._id }
        );

        if (response.data.success && response.data.data) {
          setDiscover(response.data.data);
        } else {
          setError(new Error('Discover Post not found'));
        }
      } catch (error) {
        setError(new Error('An error occurred while fetching the discover data'));
        console.error('Error fetching discover data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscoverData();
  }, [params._id]);

  const handleCloseModal = () => {
    router.push('/discover');
  };

  const resetError = () => {
    setError(null);
    setIsLoading(true);
    
  };

  if (isLoading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <ErrorComponent error={error} reset={resetError} />;
  }

  if (!discover) {
    return null;
  }

  return <DiscoverModal discover={discover} onClose={handleCloseModal} />;
}