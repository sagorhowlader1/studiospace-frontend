
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    ArrowRight,
    Heart,
    MapPin,
    Star,
    Users,
} from "lucide-react";

interface Studio {
    _id: string;
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
    rating?: number;
}

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80";

// Skeleton Component
const StudioSkeleton = () => (
    <div className="overflow-hidden rounded-[20px] border border-gray-200 bg-white dark:border-white/10 dark:bg-[#171717]">

        <div className="h-[260px] animate-pulse bg-gray-200 dark:bg-white/10" />

        <div className="space-y-4 p-5">
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-white/10" />
            <div className="flex justify-between">
                <div className="h-8 w-28 animate-pulse rounded-full bg-gray-200 dark:bg-white/10" />
                <div className="h-8 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-white/10" />
            </div>
            <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-white/10" />
        </div>
    </div>
);

const FeaturedStudiosPage = () => {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudios = async () => {
            try {
                const res = await fetch(
                    "http://localhost:8000/featured-studios"
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch studios");
                }

                const data: Studio[] = await res.json();
                setStudios(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchStudios();
    }, []);

    return (
        <section className="bg-gray-50 py-16 transition-colors duration-300 dark:bg-black">

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">

                {/* Section Heading */}
                <div className="mb-10 text-center">

                    <p className="mb-2 font-semibold text-pink-500">
                        EXPLORE CREATIVE SPACES
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        Featured Studios
                    </h2>

                    <p className="mt-3 text-gray-500 dark:text-gray-400">
                        Discover amazing spaces for your next creative project.
                    </p>

                </div>

                {/* Loading Skeleton */}
                {loading && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <StudioSkeleton key={index} />
                        ))}
                    </div>
                )}

                {/* Error Message */}
                {!loading && error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && studios.length === 0 && (
                    <p className="py-10 text-center text-gray-500 dark:text-gray-400">
                        No featured studios found.
                    </p>
                )}

                {/* Studio Cards */}
                {!loading && !error && studios.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {studios.map((studio) => (
                            <div
                                key={studio._id}
                                className="overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#171717]"
                            >

                                {/* Card Image */}
                                <div className="relative h-[260px] w-full bg-gray-200 dark:bg-white/10">

                                    <Image
                                        src={studio.imageUrl || FALLBACK_IMAGE}
                                        alt={studio.title}
                                        fill
                                        unoptimized
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover"
                                        onError={(event) => {
                                            const image = event.currentTarget;

                                            if (!image.src.includes("photo-1497366754035")) {
                                                image.src = FALLBACK_IMAGE;
                                            }
                                        }}
                                    />

                                    {/* Category */}
                                    <span className="absolute left-4 top-4 rounded-full bg-pink-500 px-4 py-1.5 text-sm font-medium text-white shadow-md">
                                        {studio.category}
                                    </span>

                                    {/* Favorite */}
                                    <button
                                        type="button"
                                        aria-label="Add to favorites"
                                        className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-black/80 text-white transition hover:text-pink-500"
                                    >
                                        <Heart size={20} />
                                    </button>

                                    {/* Price */}
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <p className="text-2xl font-bold drop-shadow-md">
                                            ${studio.hourlyRate}
                                            <span className="text-sm font-normal"> /hr</span>
                                        </p>
                                    </div>

                                    {/* Rating */}
                                    {studio.rating !== undefined && (
                                        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/80 px-3 py-1.5 text-sm text-white">
                                            <Star
                                                size={16}
                                                fill="#FBBF24"
                                                className="text-yellow-400"
                                            />
                                            {studio.rating}
                                        </div>
                                    )}

                                </div>

                                {/* Card Content */}
                                <div className="space-y-4 p-5">

                                    {/* Location */}
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                        <MapPin size={17} className="text-amber-500" />
                                        {studio.location}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {studio.title}
                                    </h3>

                                    {/* Overview */}
                                    <p className="line-clamp-2 text-base text-gray-500 dark:text-gray-400">
                                        {studio.overview}
                                    </p>

                                    {/* Capacity & Deposit */}
                                    <div className="flex flex-wrap items-center justify-between gap-2">

                                        <div className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-2 text-xs text-gray-600 dark:border-white/10 dark:text-gray-300">
                                            <Users size={15} />
                                            Up to {studio.maxCapacity} creators
                                        </div>

                                        <div className="rounded-full border border-gray-200 px-3 py-2 text-xs text-gray-600 dark:border-white/10 dark:text-gray-300">
                                            Deposit: ${studio.securityDeposit}
                                        </div>

                                    </div>

                                    {/* View Details */}
                                    <Link
                                        href={`/explore-studios/${studio._id}`}
                                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-gray-900 py-2.5 font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                    >
                                        View Details
                                        <ArrowRight size={19} />
                                    </Link>

                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </div>
        </section>
    );
};

export default FeaturedStudiosPage;
