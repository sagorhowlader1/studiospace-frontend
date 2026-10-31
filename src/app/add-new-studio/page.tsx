"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { authClient } from "@/lib/auth-client"
import { Spinner } from "@/components/ui/spinner"

const STUDIO_CATEGORIES = [
    "Photo Studio",
    "Film Stage",
    "Podcast Lounge",
    "Music Suite",
    "Workshop",
    "Dance Studio",
    "Co-working Loft",
] as const

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
] as const

export function AddNewStudioPage() {
    const router = useRouter()
    const { data: session, isPending } = authClient.useSession()

    const [category, setCategory] = React.useState<string | null>(null)
    const [amenities, setAmenities] = React.useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const toggleAmenity = (amenity: string, checked: boolean) => {
        setAmenities((prev) =>
            checked
                ? [...prev, amenity]
                : prev.filter((item) => item !== amenity)
        )
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!category) {
            toast.add({
                type: "error",
                title: "Please select a studio category.",
            })
            return
        }

        const formData = new FormData(e.currentTarget)
        const values = Object.fromEntries(formData.entries())

        const studio = {
            title: values.title,
            category,
            hourlyRate: Number(values.hourlyRate),
            securityDeposit: Number(values.securityDeposit),
            maxCapacity: Number(values.maxCapacity),
            location: values.location,
            imageUrl: values.imageUrl,
            amenities,
            overview: values.overview,
            ownerName: values.ownerName,
            ownerEmail: values.ownerEmail,
        }

        setIsSubmitting(true)
        try {
            // TODO: swap this stub for the real API call once the backend exists, e.g.
            const res = await fetch("http://localhost:8000/add-new-studio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studio),
            })
            if (!res.ok) throw new Error("Failed to create studio")

            toast.add({
                type: "success",
                title: "Studio added successfully.",
                description: `${studio.title} is now listed on StudioSpace.`,
            })
            router.push("/my-studio-listings")
        } catch {
            toast.add({
                type: "error",
                title: "Something went wrong, Please try again!",
            })
        } finally {
            setIsSubmitting(false)
        }
    }


    if (isPending) {
        return (
            <div className="grid min-h-svh place-items-center bg-background px-4 py-10">
                <p className="text-sm text-muted-foreground"> <Spinner className="size-10" />Loading…</p>
            </div>
        )
    }

    if (!session) {
        return (
            <div className="grid min-h-svh place-items-center bg-background px-4 py-10">
                <Card className="w-full max-w-sm text-center">
                    <CardHeader>
                        <CardTitle className="text-xl">Sign in required</CardTitle>
                        <CardDescription>
                            You need to be logged in to list your studio.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-3">
                        <Button className="h-10 flex-1 cursor-pointer" onClick={() => router.push("/login")}>
                            Login
                        </Button>
                        <Button
                            className="h-10 flex-1 cursor-pointer"
                            variant="outline"
                            onClick={() => router.push("/registration")}
                        >
                            Create Account
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="grid min-h-svh place-items-center bg-background px-4 py-10">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Add New Studio</CardTitle>
                    <CardDescription>
                        Fill in the details below to list your space on StudioSpace.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="title">Title</FieldLabel>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="e.g. Downtown Daylight Photo Studio"
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="category">Category</FieldLabel>
                                <Select
                                    name="category"
                                    value={category}
                                    onValueChange={setCategory}
                                >
                                    <SelectTrigger id="category" className="w-full">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {STUDIO_CATEGORIES.map((item) => (
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="hourlyRate">Hourly Rate ($)</FieldLabel>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-muted-foreground">
                                            $
                                        </span>
                                        <Input
                                            id="hourlyRate"
                                            name="hourlyRate"
                                            type="number"
                                            min={0}
                                            step="1"
                                            placeholder="25"
                                            className="pl-6"
                                            required
                                        />
                                    </div>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="securityDeposit">Security Deposit ($)</FieldLabel>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-muted-foreground">
                                            $
                                        </span>
                                        <Input
                                            id="securityDeposit"
                                            name="securityDeposit"
                                            type="number"
                                            min={0}
                                            step="1"
                                            placeholder="200"
                                            className="pl-6"
                                            required
                                        />
                                    </div>
                                </Field>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="maxCapacity">Max Capacity</FieldLabel>
                                    <Input
                                        id="maxCapacity"
                                        name="maxCapacity"
                                        type="number"
                                        min={1}
                                        step="1"
                                        placeholder="10"
                                        required
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="location">Location / Address</FieldLabel>
                                    <Input
                                        id="location"
                                        name="location"
                                        type="text"
                                        placeholder="123 Studio Ave, Brooklyn, NY"
                                        required
                                    />
                                </Field>
                            </div>

                            <Field>
                                <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
                                <Input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="url"
                                    placeholder="https://example.com/studio.jpg"
                                    required
                                />
                                <FieldDescription>
                                    Paste a link to a cover photo of your studio.
                                </FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel>Amenities</FieldLabel>
                                <div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2 md:grid-cols-3">
                                    {AMENITIES.map((amenity) => (
                                        <Field
                                            key={amenity}
                                            orientation="horizontal"
                                            className="w-auto"
                                        >
                                            <Checkbox
                                                id={`amenity-${amenity}`}
                                                checked={amenities.includes(amenity)}
                                                onCheckedChange={(checked) =>
                                                    toggleAmenity(
                                                        amenity,
                                                        checked === true
                                                    )
                                                }
                                            />
                                            <FieldLabel
                                                htmlFor={`amenity-${amenity}`}
                                                className="flex-1 cursor-pointer rounded-md border border-transparent p-1.5 text-sm font-normal leading-snug hover:bg-muted/50"
                                            >
                                                {amenity}
                                            </FieldLabel>
                                        </Field>
                                    ))}
                                </div>
                                <FieldDescription>
                                    Select everything your studio offers.
                                </FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="overview">Detailed Overview</FieldLabel>
                                <Textarea
                                    id="overview"
                                    name="overview"
                                    rows={6}
                                    placeholder="Describe the space, available equipment, house rules, ideal use cases…"
                                    required
                                />
                            </Field>

                            <FieldSet>
                                <FieldLegend variant="label">Studio Owner</FieldLegend>
                                <Field>
                                    <FieldLabel htmlFor="ownerName">Name</FieldLabel>
                                    <Input
                                        id="ownerName"
                                        name="ownerName"
                                        type="text"
                                        value={session.user.name}
                                        readOnly
                                    />
                                    <FieldDescription>
                                        Taken from your account and cannot be changed here.
                                    </FieldDescription>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="ownerEmail">Email</FieldLabel>
                                    <Input
                                        id="ownerEmail"
                                        name="ownerEmail"
                                        type="email"
                                        value={session.user.email}
                                        readOnly
                                    />
                                </Field>
                            </FieldSet>

                            <Button
                                type="submit"
                                className="h-10 w-full cursor-pointer"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Adding Studio…" : "Add Studio"}
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddNewStudioPage
