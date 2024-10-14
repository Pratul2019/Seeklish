import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Part-Time Options",
  description: "Few Part-Time options to explore",
};

const Opportunities = () => {
  return (
    <div className="py-28 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold mb-12 text-center">
          Work Opportunities
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">On-Campus</h2>
            <p className="text-base mb-4">
              Explore part-time on-campus jobs in various fields.
            </p>
            <div className="h-1 w-24 bg-teal-500 rounded-full mt-auto"></div>
          </div>

          <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Food Delivery</h2>
            <p className="text-base mb-4">
              Find flexible food delivery jobs with multiple platforms.
            </p>
            <div className="h-1 w-24 bg-teal-500 rounded-full mt-auto"></div>
          </div>

          <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Retail & Restaurant</h2>
            <p className="text-base mb-4">
              Build skills in fast-paced service environments.
            </p>
            <div className="h-1 w-24 bg-teal-500 rounded-full mt-auto"></div>
          </div>

          <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Ride-Sharing</h2>
            <p className="text-base mb-4">
              Drive with local taxi companies or ride-sharing platforms (require own car).
            </p>
            <div className="h-1 w-24 bg-teal-500 rounded-full mt-auto"></div>
          </div>

          <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Pet Care</h2>
            <p className="text-base mb-4">
              Care for animals in stores, clinics, or as a pet sitter.
            </p>
            <div className="h-1 w-24 bg-teal-500 rounded-full mt-auto"></div>
          </div>

          <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Drop-Shipping</h2>
            <p className="text-base mb-4">
              Start an online business with drop-shipping.
            </p>
            <div className="h-1 w-24 bg-teal-500 rounded-full mt-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opportunities;