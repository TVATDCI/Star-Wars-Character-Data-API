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
          background: 'var(--color-bg-elevated)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border-accent)',
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
            primary: 'var(--color-success)',
            secondary: 'var(--color-bg-elevated)',
          },
          style: {
            border: '1px solid var(--color-success)',
          },
        },

        // Error toast styling
        error: {
          duration: 5000,
          iconTheme: {
            primary: 'var(--color-error)',
            secondary: 'var(--color-bg-elevated)',
          },
          style: {
            border: '1px solid var(--color-border-error)',
          },
        },

        // Loading toast styling
        loading: {
          duration: Infinity,
          iconTheme: {
            primary: 'var(--color-warning)',
            secondary: 'var(--color-bg-elevated)',
          },
          style: {
            border: '1px solid var(--color-warning)',
          },
        },
      }}
    />
  );
}
