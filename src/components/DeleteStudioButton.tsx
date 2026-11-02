
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteStudioButtonProps {
    studioId: string;
    ownerEmail: string;
}

export default function DeleteStudioButton({
    studioId,
    ownerEmail,
}: DeleteStudioButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/my-listings/${studioId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ownerEmail }),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            toast.add({
                type: "success",
                title: "Studio deleted successfully!",
            });

            router.refresh();

        } catch (error) {
            toast.add({
                type: "error",
                title: error instanceof Error
                    ? error.message
                    : "Failed to delete studio",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                    />
                }
            >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete Studio?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Are you sure you want to delete this studio?
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {loading ? "Deleting..." : "Yes, Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
