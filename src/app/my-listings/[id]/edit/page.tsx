
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

interface Studio {
    title: string;
    category: string;
    hourlyRate: number;
    securityDeposit: number;
    maxCapacity: number;
    location: string;
    imageUrl: string;
    amenities: string[];
    overview: string;
    ownerName: string;
    ownerEmail: string;
}

const STUDIO_CATEGORIES = [
    "Photo Studio",
    "Film Stage",
    "Podcast Lounge",
    "Music Suite",
    "Workshop",
    "Dance Studio",
    "Co-working Loft",
];

const AMENITIES = [
    "High-speed Wi-Fi",
    "Free Parking",
    "Air Conditioning",
    "Restroom",
    "Green Room",
    "Makeup Station",
    "Natural Light",
    "Soundproofing",
    "Equipment Rental",
    "Coffee & Snacks",
    "24/7 Access",
    "Wheelchair Access",
];

export default function EditStudioPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const { data: session, isPending } = authClient.useSession();

    const [studio, setStudio] = useState<Studio | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isPending) return;

        if (!session?.user) {
            router.push("/login");
            return;
        }

        const fetchStudio = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/my-listings/edit/${id}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch studio");
                }

                const data = await res.json();

                if (data.ownerEmail !== session.user.email) {
                    throw new Error("You cannot edit this studio");
                }

                setStudio(data);
            } catch (error) {
                toast.add({
                    type: "error",
                    title: error instanceof Error
                        ? error.message
                        : "Failed to load studio",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchStudio();
    }, [id, session, isPending, router]);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!studio || !session?.user) return;

        const formData = new FormData(e.currentTarget);

        const updatedData = {
            title: formData.get("title"),
            category: formData.get("category"),
            hourlyRate: Number(formData.get("hourlyRate")),
            securityDeposit: Number(formData.get("securityDeposit")),
            maxCapacity: Number(formData.get("maxCapacity")),
            location: formData.get("location"),
            imageUrl: formData.get("imageUrl"),
            amenities: studio.amenities,
            overview: formData.get("overview"),
            ownerEmail: session.user.email,
        };

        setSaving(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/my-listings/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            toast.add({
                type: "success",
                title: "Studio updated successfully!",
            });

            router.push("/my-listings");
            router.refresh();
        } catch (error) {
            toast.add({
                type: "error",
                title: error instanceof Error
                    ? error.message
                    : "Failed to update studio",
            });
        } finally {
            setSaving(false);
        }
    };

    if (isPending || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner className="size-10" />
            </div>
        );
    }

    if (!studio) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p>Studio not found.</p>
                <Button onClick={() => router.push("/my-listings")}>
                    Back to My Listings
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30 py-12 px-4">
            <div className="max-w-2xl mx-auto bg-background border rounded-2xl p-6 md:p-8">

                <h1 className="text-3xl font-bold mb-2">
                    Update Studio
                </h1>

                <p className="text-muted-foreground mb-8">
                    Edit your studio information below.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            name="title"
                            defaultValue={studio.title}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Category</label>
                        <select
                            name="category"
                            defaultValue={studio.category}
                            className="w-full h-10 rounded-md border bg-background px-3"
                            required
                        >
                            {STUDIO_CATEGORIES.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Hourly Rate ($)</label>
                            <Input
                                name="hourlyRate"
                                type="number"
                                min="0"
                                defaultValue={studio.hourlyRate}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Security Deposit ($)</label>
                            <Input
                                name="securityDeposit"
                                type="number"
                                min="0"
                                defaultValue={studio.securityDeposit}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Max Capacity</label>
                        <Input
                            name="maxCapacity"
                            type="number"
                            min="1"
                            defaultValue={studio.maxCapacity}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Location</label>
                        <Input
                            name="location"
                            defaultValue={studio.location}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Image URL</label>
                        <Input
                            name="imageUrl"
                            type="url"
                            defaultValue={studio.imageUrl}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Amenities</label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                            {AMENITIES.map((amenity) => (
                                <label key={amenity} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={studio.amenities?.includes(amenity) ?? false}
                                        onChange={(e) => {
                                            setStudio((prev) => {
                                                if (!prev) return prev;

                                                return {
                                                    ...prev,
                                                    amenities: e.target.checked
                                                        ? [...(prev.amenities || []), amenity]
                                                        : (prev.amenities || []).filter(
                                                            (item) => item !== amenity
                                                        ),
                                                };
                                            });
                                        }}
                                    />
                                    {amenity}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Detailed Overview</label>
                        <Textarea
                            name="overview"
                            defaultValue={studio.overview}
                            rows={6}
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={saving}
                        >
                            {saving ? "Updating..." : "Update Studio"}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}
