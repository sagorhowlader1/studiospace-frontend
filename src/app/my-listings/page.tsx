
import { Suspense } from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { StudioImage } from "@/components/studio-image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { type Studio } from "@/lib/studio-style";

const LISTINGS_API_URL =
  process.env.API_URL || "http://localhost:8000";

async function getUserListings(email: string): Promise<Studio[]> {
  try {
    const res = await fetch(
      `${LISTINGS_API_URL}/my-listings/${encodeURIComponent(email)}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return Array.isArray(data) ? data : data.studios ?? [];
  } catch (error) {
    console.error("Listings API Error:", error);
    return [];
  }
}

function ListingCard({ studio }: { studio: Studio }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-lg ring-1 ring-foreground/10">
              <StudioImage
                src={studio.imageUrl}
                alt={studio.title}
                category={studio.category}
                seed={studio._id}
                className="size-14 rounded-lg object-cover"
              />
            </div>

            <div className="min-w-0">
              <h3 className="truncate font-semibold">
                {studio.title}
              </h3>

              {studio.location && (
                <p className="text-muted-foreground truncate text-sm">
                  {studio.location}
                </p>
              )}
            </div>
          </div>

          <span className="border-border text-muted-foreground rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap">
            {studio.category}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
            <span className="text-muted-foreground text-xs">
              Hourly rate
            </span>
            <span className="text-sm font-medium">
              ${studio.hourlyRate} /hr
            </span>
          </div>

          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
            <span className="text-muted-foreground text-xs">
              Security deposit
            </span>
            <span className="text-sm font-medium">
              ${studio.securityDeposit}
            </span>
          </div>

          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
            <span className="text-muted-foreground text-xs">
              Max capacity
            </span>
            <span className="text-sm font-medium">
              Up to {studio.maxCapacity} creators
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ListingsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-14 rounded-lg" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>

            <Skeleton className="h-16 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function MyListingsContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  if (!email) redirect("/login");

  const listings = await getUserListings(email);

  return (
    <>
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          My Studio Listings
        </h1>

        <p className="text-muted-foreground mt-1 text-sm">
          Manage the studio spaces you list on StudioSpace.
        </p>
      </header>

      {listings.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Building2 className="size-4" />
            </EmptyMedia>

            <EmptyTitle>No listings yet</EmptyTitle>

            <EmptyDescription>
              You haven&apos;t listed a studio yet. Create your first
              space and start hosting creators.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <Button render={<Link href="/add-new-studio" />}>
              Add Your Studio
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="flex flex-col gap-4">
          {listings.map((studio) => (
            <ListingCard key={studio._id} studio={studio} />
          ))}
        </div>
      )}
    </>
  );
}

export default function MyListingsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <Suspense fallback={<ListingsSkeleton />}>
        <MyListingsContent />
      </Suspense>
    </main>
  );
}




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

// const LISTINGS_API_URL = "http://localhost:8000";

// async function getUserListings(): Promise<Studio[]> {
//   const res = await fetch(`${LISTINGS_API_URL}/my-listings`, {
//     cache: "no-store",
//   });

//   let listings: Studio[] = [];

//   if (res.ok) {
//     const data = (await res.json()) as Studio[] | { studios?: Studio[] };
//     const list = Array.isArray(data) ? data : data.studios ?? [];
//     listings = list;
//   }

//   return listings;
// }

// function ListingCard({ studio }: { studio: Studio }) {
//   return (
//     <Card>
//       <CardContent className="flex flex-col gap-4 p-4">
//         {/* Studio */}
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
//               <h3 className="truncate font-semibold">{studio.title}</h3>
//               {studio.location ? (
//                 <p className="text-muted-foreground truncate text-sm">
//                   {studio.location}
//                 </p>
//               ) : null}
//             </div>
//           </div>
//           <span className="border-border text-muted-foreground rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap">
//             {studio.category}
//           </span>
//         </div>

//         {/* Details */}
//         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
//           <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
//             <span className="text-muted-foreground text-xs">Hourly rate</span>
//             <span className="text-sm font-medium">
//               ${studio.hourlyRate} /hr
//             </span>
//           </div>
//           <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
//             <span className="text-muted-foreground text-xs">Security deposit</span>
//             <span className="text-sm font-medium">
//               ${studio.securityDeposit}
//             </span>
//           </div>
//           <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
//             <span className="text-muted-foreground text-xs">Max capacity</span>
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

//   const listings = await getUserListings();

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
//               You haven&apos;t listed a studio yet. Create your first space and
//               start hosting creators.
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
