"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Rental } from '@/Components/types';


import Loading from './loading';
import ErrorComponent from '../error';
import RentalModal from '@/Components/Share_Models/RentalModal';


interface Params {
  _id: string;
}

interface ApiResponse {
  success: boolean;
  data: Rental | null;
  message?: string;
}

export default function RentalPage({ params }: { params: Params }) {
  const [rental, setRental] = useState<Rental | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRentalData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        setError(new Error('API URL is not defined'));
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post<ApiResponse>(
          `${apiUrl}/api/Fetch/ShareModal/Rental`,
          { postid: params._id }
        );

        if (response.data.success && response.data.data) {
          setRental(response.data.data);
        } else {
          setError(new Error('Rental Post not found'));
        }
      } catch (error) {
        setError(new Error('An error occurred while fetching the rental data'));
        console.error('Error fetching rental data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentalData();
  }, [params._id]);

  const handleCloseModal = () => {
    router.push('/rental');
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

  if (!rental) {
    return null;
  }

  return <RentalModal rental={rental} onClose={handleCloseModal} />;
}