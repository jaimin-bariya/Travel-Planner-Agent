import { MapPin, Calendar, Globe, Zap } from "lucide-react";



const Features = () => {


    const features = [
        {
          icon: <MapPin className="h-10 w-10 text-travel-600" />,
          title: "Smart Destinations",
          description:
            "Our AI analyzes your preferences to suggest the perfect destinations for your travel style."
        },
        {
          icon: <Calendar className="h-10 w-10 text-travel-600" />,
          title: "Personalized Itineraries",
          description:
            "Get day-by-day travel plans tailored to your interests, pace, and budget."
        },
        {
          icon: <Globe className="h-10 w-10 text-travel-600" />,
          title: "Local Insights",
          description:
            "Discover hidden gems and authentic experiences with recommendations from locals."
        },
        {
          icon: <Zap className="h-10 w-10 text-travel-600" />,
          title: "Real-time Updates",
          description:
            "Stay informed with real-time weather forecasts and travel advisories."
        }
      ];

  return (
    <>
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Plan smarter, travel better
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Our AI-powered tools make trip planning effortless
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md"
            >
              <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-travel-50 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Features;