/**
 * SkeletonCard Component
 *
 * A loading placeholder for character cards.
 * Displays a pulsing animation while data is loading.
 */

export default function SkeletonCard() {
  return (
    <div className='bg-bg-card backdrop-blur-sm rounded-xl p-5 border border-border animate-pulse'>
      {/* Title skeleton */}
      <div className='h-7 bg-bg-muted rounded w-3/4 mb-4'></div>

      {/* Info rows skeleton */}
      <div className='space-y-3'>
        <div className='flex justify-between'>
          <div className='h-4 bg-bg-muted rounded w-20'></div>
          <div className='h-4 bg-bg-muted rounded w-24'></div>
        </div>
        <div className='flex justify-between'>
          <div className='h-4 bg-bg-muted rounded w-24'></div>
          <div className='h-4 bg-bg-muted rounded w-28'></div>
        </div>
        <div className='flex justify-between'>
          <div className='h-4 bg-bg-muted rounded w-16'></div>
          <div className='h-4 bg-bg-muted rounded w-20'></div>
        </div>
      </div>

      {/* Button skeleton */}
      <div className='mt-5 h-10 bg-bg-muted rounded-lg w-full'></div>
    </div>
  );
}
