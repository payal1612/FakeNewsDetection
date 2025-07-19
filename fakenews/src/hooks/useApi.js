import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';
import toast from 'react-hot-toast';

export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { 
    immediate = true, 
    onSuccess, 
    onError,
    dependencies = [] 
  } = options;

  const execute = async (customEndpoint = endpoint, customOptions = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiClient.request(customEndpoint, customOptions);
      setData(result);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      setError(err.message);
      
      if (onError) {
        onError(err);
      } else {
        toast.error(err.message);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate && endpoint) {
      execute();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    execute,
    refetch: () => execute()
  };
};

export const useAsyncOperation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (operation, options = {}) => {
    const { 
      loadingMessage = 'Processing...',
      successMessage = 'Operation completed successfully!',
      showSuccess = true 
    } = options;

    try {
      setLoading(true);
      setError(null);
      
      if (loadingMessage) {
        toast.loading(loadingMessage);
      }

      const result = await operation();
      
      toast.dismiss();
      
      if (showSuccess && successMessage) {
        toast.success(successMessage);
      }
      
      return result;
    } catch (err) {
      toast.dismiss();
      setError(err.message);
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    execute
  };
};