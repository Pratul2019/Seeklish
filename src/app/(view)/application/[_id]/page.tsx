"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { App } from '@/Components/types';

import ErrorComponent from '../error';
import Loading from './loading';
import AppModal from '@/Components/Share_Models/AppModal';

interface Params {
  _id: string;
}

interface ApiResponse {
  success: boolean;
  data: App | null;
  message?: string;
}

export default function AppPage({ params }: { params: Params }) {
  const [app, setApp] = useState<App | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAppData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        setError(new Error('API URL is not defined'));
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post<ApiResponse>(
          `${apiUrl}/api/Fetch/ShareModal/App`,
          { postid: params._id }
        );

        if (response.data.success && response.data.data) {
          setApp(response.data.data);
        } else {
          setError(new Error('Application Post not found'));
        }
      } catch (error) {
        setError(new Error('An error occurred while fetching the app data'));
        console.error('Error fetching app data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppData();
  }, [params._id]);

  const handleCloseModal = () => {
    router.push('/application');
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

  if (!app) {
    return null;
  }

  return <AppModal app={app} onClose={handleCloseModal} />;
}