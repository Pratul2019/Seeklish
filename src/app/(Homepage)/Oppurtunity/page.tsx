import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Part-Time Options",
  description: "Few Part-Time options to explore",
};
const Oppurtunity: NextPage = () => {
  const opportunities = [
    {
      title: "On-Campus",
      description: "Explore part-time on-campus jobs in various fields.",
    },
    {
      title: "Food Delivery",
      description: "Find flexible food delivery jobs with multiple platforms.",
    },
    {
      title: "Retail & Restaurant",
      description: "Build skills in fast-paced service environments.",
    },
    {
      title: "Ride-Sharing",
      description:
        "Drive with local taxi companies or ride-sharing platforms (require own car).",
    },
    {
      title: "Pet Care",
      description: "Care for animals in stores, clinics, or as a pet sitter.",
    },
    {
      title: "Drop-Shipping",
      description: "Start an online business with drop-shipping.",
    },
  ];

  return (
    <div className="py-28 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold mb-12 text-center">
          Work Opportunities
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-4">
                {opportunity.title}
              </h2>
              <p className="text-base mb-4">{opportunity.description}</p>
              <div className="h-1 w-24 bg-cyan-500 rounded-full mt-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Oppurtunity;
