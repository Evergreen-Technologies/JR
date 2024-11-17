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
import { signIn } from "next-auth/react";

export default function Component() {
  const username = useRef("");
  const pass = useRef("");

  const onsubmit = async () => {
    const res = await signIn("credentials", {
      username: username.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/admin",
    });
  };
  return (
    <Card className="mx-auto max-w-sm mt-[230px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
        <CardDescription>
          أدخل اسم المستخدم وكلمة المرور الخاصة بك لتسجيل الدخول إلى حسابك
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">اسم المستخدم</Label>
            <Input
              id="email"
              type="email"
              placeholder="username..."
              required
              onChange={(e) => {
                username.current = e.target.value;
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              placeholder="password..."
              required
              onChange={(e) => (pass.current = e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" onClick={onsubmit}>
            تسجيل الدخول
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
