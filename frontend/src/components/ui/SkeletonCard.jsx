/**
 * SkeletonCard Component
 *
 * A loading placeholder for character cards.
 * Displays a pulsing animation while data is loading.
 */

export default function SkeletonCard() {
  return (
    <div className='bg-neutral-800/20 backdrop-blur-sm rounded-xl p-5 border border-neutral-700/50 animate-pulse'>
      {/* Title skeleton */}
      <div className='h-7 bg-neutral-700/50 rounded w-3/4 mb-4'></div>

      {/* Info rows skeleton */}
      <div className='space-y-3'>
        <div className='flex justify-between'>
          <div className='h-4 bg-neutral-700/50 rounded w-20'></div>
          <div className='h-4 bg-neutral-700/50 rounded w-24'></div>
        </div>
        <div className='flex justify-between'>
          <div className='h-4 bg-neutral-700/50 rounded w-24'></div>
          <div className='h-4 bg-neutral-700/50 rounded w-28'></div>
        </div>
        <div className='flex justify-between'>
          <div className='h-4 bg-neutral-700/50 rounded w-16'></div>
          <div className='h-4 bg-neutral-700/50 rounded w-20'></div>
        </div>
      </div>

      {/* Button skeleton */}
      <div className='mt-5 h-10 bg-neutral-700/50 rounded-lg w-full'></div>
    </div>
  );
}
