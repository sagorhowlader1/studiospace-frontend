import * as React from "react";

import { Banner } from "@/components/banner";
import BrowseByStudioCategories from "@/components/Browse-by-studio-categories";
import HowItWorks from "@/components/How-it-works";
import AboutUs from "@/components/About-us";

export default function Home() {
  return (
    <div className="relative">
      <Banner />
      <BrowseByStudioCategories />
      <HowItWorks />
      <AboutUs />
    </div>
  );
}
