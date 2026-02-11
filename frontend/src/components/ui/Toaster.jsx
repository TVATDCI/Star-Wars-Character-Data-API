import { Toaster as HotToaster } from 'react-hot-toast';

/**
 * Toaster Component
 *
 * Global toast notification container with Star Wars theme styling.
 * Place this component in your Layout or App component.
 *
 * Usage:
 * import toast from 'react-hot-toast';
 * toast.success('Character created!');
 * toast.error('Something went wrong');
 * toast.loading('Saving...');
 */

export default function Toaster() {
  return (
    <HotToaster
      position='top-center'
      reverseOrder={false}
      gutter={8}
      containerClassName=''
      containerStyle={{
        zIndex: 9999,
      }}
      toastOptions={{
        // Default options for all toasts
        duration: 4000,
        style: {
          background: 'rgba(23, 23, 23, 0.95)',
          color: '#fff',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          borderRadius: '12px',
          padding: '16px 24px',
          fontSize: '14px',
          fontWeight: 500,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)',
        },

        // Success toast styling
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#22c55e',
            secondary: '#171717',
          },
          style: {
            border: '1px solid rgba(34, 197, 94, 0.5)',
          },
        },

        // Error toast styling
        error: {
          duration: 5000,
          iconTheme: {
            primary: '#ef4444',
            secondary: '#171717',
          },
          style: {
            border: '1px solid rgba(239, 68, 68, 0.5)',
          },
        },

        // Loading toast styling
        loading: {
          duration: Infinity,
          iconTheme: {
            primary: '#eab308',
            secondary: '#171717',
          },
          style: {
            border: '1px solid rgba(234, 179, 8, 0.5)',
          },
        },
      }}
    />
  );
}
