import { HeroKinetic } from "@/components/heroes/HeroKinetic";
import { Information } from "@/components/Information";
import { Location } from "@/components/Location";
import { Parking } from "@/components/Parking";
import { FoodSpots } from "@/components/FoodSpots";
import { GuestBook } from "@/components/GuestBook";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <HeroKinetic />
      <Information />
      <Location />
      <Parking />
      <FoodSpots />
      <GuestBook />
      <Footer />
    </main>
  );
}
