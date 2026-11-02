

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
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

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const res = await fetch(
    `${API_URL}/my-listings/${encodeURIComponent(user.email)}`,
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

         
            {/* <Link href="/add-new-studio">
              <Plus className="h-4 w-4 mr-2" />
              Add New Studio
            </Link>
           */}
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
                  {studio.imageUrl && (
                    <Image
                      src={studio.imageUrl}
                      alt={studio.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}

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
                        <Pencil className="h-4 w-4 mr-2" />
                        Update
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

              {/* <Link href="/add-new-studio">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Studio
              </Link> */}
            

          </div>

        )}

      </div>
    </div>
  );
};

export default MyListingsPage;





// "use client";

// import { Suspense } from "react";
// import Link from "next/link";
// import { Building2 } from "lucide-react";

// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";

// import { StudioImage } from "@/components/studio-image";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Empty,
//   EmptyContent,
//   EmptyDescription,
//   EmptyHeader,
//   EmptyMedia,
//   EmptyTitle,
// } from "@/components/ui/empty";
// import { Skeleton } from "@/components/ui/skeleton";
// import { type Studio } from "@/lib/studio-style";

// const LISTINGS_API_URL =
//   process.env.API_URL || "http://localhost:8000";

// async function getUserListings(email: string): Promise<Studio[]> {
//   try {
//     const res = await fetch(
//       `${LISTINGS_API_URL}/my-listings/${encodeURIComponent(email)}`,
//       {
//         cache: "no-store",
//       }
//     );

//     if (!res.ok) {
//       console.error("Failed to fetch listings:", res.status);
//       return [];
//     }

//     const data = await res.json();

//     return Array.isArray(data) ? data : data.studios ?? [];
//   } catch (error) {
//     console.error("Listings API Error:", error);
//     return [];
//   }
// }

// function ListingCard({ studio }: { studio: Studio }) {
//   return (
//     <Card>
//       <CardContent className="flex flex-col gap-4 p-4">
//         <div className="flex items-start justify-between gap-3">
//           <div className="flex min-w-0 items-center gap-3">
//             <div className="relative size-14 shrink-0 overflow-hidden rounded-lg ring-1 ring-foreground/10">
//               <StudioImage
//                 src={studio.imageUrl}
//                 alt={studio.title}
//                 category={studio.category}
//                 seed={studio._id}
//                 className="size-14 rounded-lg object-cover"
//               />
//             </div>

//             <div className="min-w-0">
//               <h3 className="truncate font-semibold">
//                 {studio.title}
//               </h3>

//               {studio.location && (
//                 <p className="text-muted-foreground truncate text-sm">
//                   {studio.location}
//                 </p>
//               )}
//             </div>
//           </div>

//           <span className="border-border text-muted-foreground rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap">
//             {studio.category}
//           </span>
//         </div>

//         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
//           <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
//             <span className="text-muted-foreground text-xs">
//               Hourly rate
//             </span>
//             <span className="text-sm font-medium">
//               ${studio.hourlyRate} /hr
//             </span>
//           </div>

//           <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
//             <span className="text-muted-foreground text-xs">
//               Security deposit
//             </span>
//             <span className="text-sm font-medium">
//               ${studio.securityDeposit}
//             </span>
//           </div>

//           <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
//             <span className="text-muted-foreground text-xs">
//               Max capacity
//             </span>
//             <span className="text-sm font-medium">
//               Up to {studio.maxCapacity} creators
//             </span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function ListingsSkeleton() {
//   return (
//     <div className="flex flex-col gap-4">
//       {Array.from({ length: 3 }).map((_, i) => (
//         <Card key={i}>
//           <CardContent className="flex flex-col gap-4 p-4">
//             <div className="flex items-center justify-between gap-3">
//               <div className="flex items-center gap-3">
//                 <Skeleton className="size-14 rounded-lg" />
//                 <div className="flex flex-col gap-2">
//                   <Skeleton className="h-4 w-40" />
//                   <Skeleton className="h-3 w-24" />
//                 </div>
//               </div>
//               <Skeleton className="h-6 w-28 rounded-full" />
//             </div>

//             <Skeleton className="h-16 w-full" />
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

// async function MyListingsContent() {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const email = session?.user?.email;

//   if (!email) redirect("/login");

//   const listings = await getUserListings(email);

//   return (
//     <>
//       <header className="mb-8">
//         <h1 className="font-heading text-3xl font-semibold tracking-tight">
//           My Studio Listings
//         </h1>

//         <p className="text-muted-foreground mt-1 text-sm">
//           Manage the studio spaces you list on StudioSpace.
//         </p>
//       </header>

//       {listings.length === 0 ? (
//         <Empty>
//           <EmptyHeader>
//             <EmptyMedia variant="icon">
//               <Building2 className="size-4" />
//             </EmptyMedia>

//             <EmptyTitle>No listings yet</EmptyTitle>

//             <EmptyDescription>
//               You haven&apos;t listed a studio yet. Create your first
//               space and start hosting creators.
//             </EmptyDescription>
//           </EmptyHeader>

//           <EmptyContent>
//             <Button render={<Link href="/add-new-studio" />}>
//               Add Your Studio
//             </Button>
//           </EmptyContent>
//         </Empty>
//       ) : (
//         <div className="flex flex-col gap-4">
//           {listings.map((studio) => (
//             <ListingCard key={studio._id} studio={studio} />
//           ))}
//         </div>
//       )}
//     </>
//   );
// }

// export default function MyListingsPage() {
//   return (
//     <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
//       <Suspense fallback={<ListingsSkeleton />}>
//         <MyListingsContent />
//       </Suspense>
//     </main>
//   );
// }




// // import { Suspense } from "react";
// // import Link from "next/link";
// // import { Building2 } from "lucide-react";

// // import { auth } from "@/lib/auth";

// // import { headers } from "next/headers";
// // import { redirect } from "next/navigation";

// // import { StudioImage } from "@/components/studio-image";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent } from "@/components/ui/card";
// // import {
// //   Empty,
// //   EmptyContent,
// //   EmptyDescription,
// //   EmptyHeader,
// //   EmptyMedia,
// //   EmptyTitle,
// // } from "@/components/ui/empty";
// // import { Skeleton } from "@/components/ui/skeleton";
// // import { type Studio } from "@/lib/studio-style";

// // const LISTINGS_API_URL = "http://localhost:8000";

// // async function getUserListings(): Promise<Studio[]> {
// //   const res = await fetch(`${LISTINGS_API_URL}/my-listings`, {
// //     cache: "no-store",
// //   });

// //   let listings: Studio[] = [];

// //   if (res.ok) {
// //     const data = (await res.json()) as Studio[] | { studios?: Studio[] };
// //     const list = Array.isArray(data) ? data : data.studios ?? [];
// //     listings = list;
// //   }

// //   return listings;
// // }

// // function ListingCard({ studio }: { studio: Studio }) {
// //   return (
// //     <Card>
// //       <CardContent className="flex flex-col gap-4 p-4">
// //         {/* Studio */}
// //         <div className="flex items-start justify-between gap-3">
// //           <div className="flex min-w-0 items-center gap-3">
// //             <div className="relative size-14 shrink-0 overflow-hidden rounded-lg ring-1 ring-foreground/10">
// //               <StudioImage
// //                 src={studio.imageUrl}
// //                 alt={studio.title}
// //                 category={studio.category}
// //                 seed={studio._id}
// //                 className="size-14 rounded-lg object-cover"
// //               />
// //             </div>
// //             <div className="min-w-0">
// //               <h3 className="truncate font-semibold">{studio.title}</h3>
// //               {studio.location ? (
// //                 <p className="text-muted-foreground truncate text-sm">
// //                   {studio.location}
// //                 </p>
// //               ) : null}
// //             </div>
// //           </div>
// //           <span className="border-border text-muted-foreground rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap">
// //             {studio.category}
// //           </span>
// //         </div>

// //         {/* Details */}
// //         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
// //           <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
// //             <span className="text-muted-foreground text-xs">Hourly rate</span>
// //             <span className="text-sm font-medium">
// //               ${studio.hourlyRate} /hr
// //             </span>
// //           </div>
// //           <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
// //             <span className="text-muted-foreground text-xs">Security deposit</span>
// //             <span className="text-sm font-medium">
// //               ${studio.securityDeposit}
// //             </span>
// //           </div>
// //           <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
// //             <span className="text-muted-foreground text-xs">Max capacity</span>
// //             <span className="text-sm font-medium">
// //               Up to {studio.maxCapacity} creators
// //             </span>
// //           </div>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// // function ListingsSkeleton() {
// //   return (
// //     <div className="flex flex-col gap-4">
// //       {Array.from({ length: 3 }).map((_, i) => (
// //         <Card key={i}>
// //           <CardContent className="flex flex-col gap-4 p-4">
// //             <div className="flex items-center justify-between gap-3">
// //               <div className="flex items-center gap-3">
// //                 <Skeleton className="size-14 rounded-lg" />
// //                 <div className="flex flex-col gap-2">
// //                   <Skeleton className="h-4 w-40" />
// //                   <Skeleton className="h-3 w-24" />
// //                 </div>
// //               </div>
// //               <Skeleton className="h-6 w-28 rounded-full" />
// //             </div>
// //             <Skeleton className="h-16 w-full" />
// //           </CardContent>
// //         </Card>
// //       ))}
// //     </div>
// //   );
// // }

// // async function MyListingsContent() {
// //   const session = await auth.api.getSession({
// //     headers: await headers(),
// //   });

// //   const email = session?.user?.email;

// //   if (!email) redirect("/login");

// //   const listings = await getUserListings();

// //   return (
// //     <>
// //       <header className="mb-8">
// //         <h1 className="font-heading text-3xl font-semibold tracking-tight">
// //           My Studio Listings
// //         </h1>
// //         <p className="text-muted-foreground mt-1 text-sm">
// //           Manage the studio spaces you list on StudioSpace.
// //         </p>
// //       </header>

// //       {listings.length === 0 ? (
// //         <Empty>
// //           <EmptyHeader>
// //             <EmptyMedia variant="icon">
// //               <Building2 className="size-4" />
// //             </EmptyMedia>
// //             <EmptyTitle>No listings yet</EmptyTitle>
// //             <EmptyDescription>
// //               You haven&apos;t listed a studio yet. Create your first space and
// //               start hosting creators.
// //             </EmptyDescription>
// //           </EmptyHeader>
// //           <EmptyContent>
// //             <Button render={<Link href="/add-new-studio" />}>
// //               Add Your Studio
// //             </Button>
// //           </EmptyContent>
// //         </Empty>
// //       ) : (
// //         <div className="flex flex-col gap-4">
// //           {listings.map((studio) => (
// //             <ListingCard key={studio._id} studio={studio} />
// //           ))}
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // export default function MyListingsPage() {
// //   return (
// //     <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
// //       <Suspense fallback={<ListingsSkeleton />}>
// //         <MyListingsContent />
// //       </Suspense>
// //     </main>
// //   );
// // }
