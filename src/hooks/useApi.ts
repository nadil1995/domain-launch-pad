
import { useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { mockApi } from '@/services/api/mockApi';

export const useApi = () => {
  const { toast } = useToast();

  const handleError = useCallback((error: Error) => {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive"
    });
  }, [toast]);

  const handleSuccess = useCallback((message: string) => {
    toast({
      title: "Success",
      description: message,
    });
  }, [toast]);

  return {
    api: mockApi,
    handleError,
    handleSuccess
  };
};
