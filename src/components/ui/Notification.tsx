import { Toaster } from 'react-hot-toast';

export const NotificationProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: '#333',
          color: '#fff',
        },
        success: {
          duration: 3000,
          style: {
            background: '#4aed88',
            color: '#fff',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: '#ff4b4b',
            color: '#fff',
          },
        },
      }}
    />
  );
}; 