import * as React from "react";

import { Banner } from "@/components/banner";
import HowItWorks from "@/components/How-it-works";
import AboutUs from "@/components/About-us";

export default function Home() {
  return (
    <div className="relative">
      <Banner />
      <HowItWorks />
      <AboutUs />
    </div>
  );
}
