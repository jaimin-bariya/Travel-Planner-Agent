import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlaneTakeoff, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { testBackend } from "@/services/api";


const Hero = () => {

  const handleClick = async () => {
    console.log("Lets do planning");
    try {
      const res = await testBackend();
      console.log(res);
    } catch (error) {
      console.error(error);
      
    }
    

    
  }



  return (
    <>
      <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center my-20">
        <h2 className="mb-4 text-4xl font-bold text-gray-800">Your AI Travel Companion</h2>
        <p className="mx-auto mb-8 max-w-2xl text-gray-600">
          Plan your perfect trip with our intelligent travel assistant. Just tell us where you want to go, and we'll
          handle the rest.
        </p>
        <Button onClick={handleClick} size="lg" className="bg-emerald-600 hover:bg-emerald-700  cursor-pointer">
          <PlaneTakeoff className="mr-2 h-5 w-5" />
          <Link to="/start-planning">Start Planning </Link>
        </Button>
      </section>

      
    </div>
    </>
  );
};

export default Hero;