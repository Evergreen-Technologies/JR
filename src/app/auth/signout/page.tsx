/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1ADs2FRNaQg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { signOut } from "next-auth/react";

export default function Component() {
  const username = useRef("");
  const pass = useRef("");

  const onsubmit = async () => {
    const res = await signOut({
      redirect: true,
      callbackUrl: "/auth/signin",
    });
  };
  return (
    <Card className="mx-auto max-w-sm mt-[230px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign out</CardTitle>
        <CardDescription>Are you sure you want to signout ?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button type="submit" className="w-full" onClick={onsubmit}>
            Sign out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
