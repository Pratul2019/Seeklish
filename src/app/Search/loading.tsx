import React from 'react';

const Loading = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:p-4 md:mx-4 mt-20 md:mt-0">
  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
    <div key={index} className="w-auto rounded-xl p-2 flex flex-col gap-4 bg-header shadow-gray-600 shadow-md">
      <div className="flex items-center justify-between p-2 border-b border-gray-500">
        <div className="flex">
          <div className="w-6 animate-pulse bg-gray-600 h-6 rounded"></div>
          <div className="w-6 animate-pulse bg-gray-600 h-6 rounded ml-2"></div>
        </div>
        <div className="w-48 animate-pulse bg-gray-600 h-6 rounded"></div>
        <div className="rounded-full p-2 hover:text-red-500">
          <div className="animate-pulse bg-gray-600 w-6 h-6 rounded"></div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-300 ease-in-out">
            {[1, 2, 3].map((item, innerIndex) => (
              <div key={innerIndex} className="w-full flex-shrink-0 flex flex-col gap-2 animate-pulse">
                <div className="flex items-center justify-between text-sm md:text-base">
                  <div className="flex items-center gap-2 ">
                    <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                    <div className="flex flex-col max-w-xs">
                      <div className="w-24 h-6 bg-gray-600 rounded"></div>
                      <div className="w-36 h-6 bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="p-2 rounded-b-xl flex flex-col gap-2">
                  <div className="h-6 bg-gray-600 rounded"></div>
                  <div className="h-6 bg-gray-600 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-around p-2">
        <div className="flex justify-center">
          <div className="w-12 h-6 bg-gray-600 rounded animate-pulse"></div>
        </div>
        <div className="flex justify-center">
          <div className="w-24 h-6 bg-gray-600 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  ))}
</main>
  );
};

export default Loading;