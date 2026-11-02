"use client";

import  { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      className="mt-6 flex max-w-xs items-center gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        if (!email.trim()) return;
        toast.add({
          type: "success",
          title: "You're on the list!",
          description: `We'll send studio updates to ${email}.`,
        });
        setEmail("");
      }}
    >
      <label htmlFor="footer-email" className="sr-only">
        Creator email
      </label>
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="footer-email"
          type="email"
          name="email"
          required
          placeholder="Enter creator email..."
          className="h-10 rounded-full pl-9"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <Button
        type="submit"
        aria-label="Subscribe to newsletter"
        className="size-10 shrink-0 rounded-full p-0"
      >
        <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}
