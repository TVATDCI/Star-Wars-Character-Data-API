/**
 * SkeletonDetail Component
 *
 * A loading placeholder for the character detail view.
 * Displays pulsing animations while character data is loading.
 */

export default function SkeletonDetail() {
  return (
    <div className='max-w-4xl mx-auto mt-14 px-4 animate-pulse'>
      {/* Back button skeleton */}
      <div className='h-10 bg-neutral-700/50 rounded-lg w-32 mb-6'></div>

      <div className='bg-neutral-800/20 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50'>
        {/* Header section */}
        <div className='flex flex-col md:flex-row gap-6 mb-8'>
          {/* Avatar skeleton */}
          <div className='w-32 h-32 bg-neutral-700/50 rounded-full mx-auto md:mx-0'></div>

          {/* Info section */}
          <div className='flex-1 space-y-4'>
            <div className='h-8 bg-neutral-700/50 rounded w-3/4'></div>
            <div className='h-5 bg-neutral-700/50 rounded w-1/2'></div>
            <div className='h-5 bg-neutral-700/50 rounded w-2/3'></div>
            <div className='flex gap-3 mt-4'>
              <div className='h-10 bg-neutral-700/50 rounded-lg w-24'></div>
              <div className='h-10 bg-neutral-700/50 rounded-lg w-24'></div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className='space-y-4 mb-8'>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='space-y-2'>
              <div className='flex justify-between'>
                <div className='h-4 bg-neutral-700/50 rounded w-24'></div>
                <div className='h-4 bg-neutral-700/50 rounded w-12'></div>
              </div>
              <div className='h-3 bg-neutral-700/30 rounded-full w-full'></div>
            </div>
          ))}
        </div>

        {/* Details section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-3'>
            <div className='h-5 bg-neutral-700/50 rounded w-32'></div>
            <div className='h-4 bg-neutral-700/50 rounded w-full'></div>
            <div className='h-4 bg-neutral-700/50 rounded w-5/6'></div>
          </div>
          <div className='space-y-3'>
            <div className='h-5 bg-neutral-700/50 rounded w-32'></div>
            <div className='h-4 bg-neutral-700/50 rounded w-full'></div>
            <div className='h-4 bg-neutral-700/50 rounded w-4/5'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
