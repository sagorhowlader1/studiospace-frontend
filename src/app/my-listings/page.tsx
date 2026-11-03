

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import StudioListingImage from "@/components/StudioListingImage";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Users,

  Pencil,

} from "lucide-react";


import DeleteStudioButton from "@/components/DeleteStudioButton";

interface Studio {
  _id: string;
  imageUrl: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
}

const MyListingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-listings/${encodeURIComponent(user.email)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch studio listings");
  }

  const data: Studio[] = await res.json();

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">

          <div>
            <p className="text-sm font-semibold text-primary mb-2">
              STUDIO MANAGEMENT
            </p>

            <h1 className="text-3xl md:text-4xl font-bold">
              My Studio Listings
            </h1>

            <p className="text-muted-foreground mt-2">
              Manage the studio spaces you list on StudioSpace.
            </p>
          </div>
        </div>

        {/* Listings */}
        {data.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {data.map((studio) => (

              <div
                key={studio._id}
                className="bg-background border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >

                {/* Image */}
                <div className="relative h-52 bg-muted">
                  <StudioListingImage
                    src={studio.imageUrl}
                    alt={studio.title}
                  />

                  <span className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold">
                    {studio.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">

                  <h2 className="text-xl font-bold mb-3">
                    {studio.title}
                  </h2>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    {studio.location}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Users className="h-4 w-4" />
                    Maximum {studio.maxCapacity} people
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        ${studio.hourlyRate}
                        <span className="text-sm font-normal text-muted-foreground">
                          /hour
                        </span>
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        Deposit: ${studio.securityDeposit}
                      </p>
                    </div>

                    <Building2 className="h-8 w-8 text-muted-foreground/50" />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-5">


                    <Link
                      href={`/my-listings/${studio._id}/edit`}
                    >
                      <p className="flex items-center dark:bg-gray-700/90 bg-gray-300/20 rounded justify-center px-1.5 py-1">

                      <Pencil className="h-4 w-4 mr-2" />
                      Update
                      </p>
                    </Link>


                    <div className="flex-1">
                      <DeleteStudioButton
                        studioId={studio._id}
                        ownerEmail={user.email}
                      />
                    </div>

                  </div>

                </div>
              </div>

            ))}

          </div>

        ) : (

          /* Empty State */
          <div className="bg-background border rounded-2xl py-20 px-5 text-center">

            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Building2 className="h-10 w-10 text-primary" />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              No listings yet
            </h2>

            <p className="text-muted-foreground max-w-md mx-auto mb-7">
              You haven't listed a studio yet.
              Create your first space and start hosting creators.
            </p>

          </div>

        )}

      </div>
    </div>
  );
};

export default MyListingsPage;

