import { HeroKinetic } from "@/components/heroes/HeroKinetic";
import { Greeting } from "@/components/Greeting";
import { Information } from "@/components/Information";
import { Location } from "@/components/Location";
import { Parking } from "@/components/Parking";
import { FoodSpots } from "@/components/FoodSpots";
import { GuestBook } from "@/components/GuestBook";
import { Sponsors } from "@/components/Sponsors";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <HeroKinetic />
      <Greeting />
      <Information />
      <Location />
      <Parking />
      <FoodSpots />
      <GuestBook />
      <Sponsors />
      <Footer />
    </main>
  );
}
