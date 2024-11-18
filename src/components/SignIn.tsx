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
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const { t } = useTranslation();
  const username = useRef("");
  const pass = useRef("");

  const onsubmit = async () => {
    const res = await signIn("credentials", {
      username: username.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/admin/blog",
    });
  };
  return (
    <Card className="mx-auto max-w-sm mt-[230px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{t("Log_In")}</CardTitle>
        <CardDescription>{t("Enter_your")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("Username")}</Label>
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
            <Label htmlFor="password">{t("Password")}</Label>
            <Input
              id="password"
              type="password"
              placeholder="password..."
              required
              onChange={(e) => (pass.current = e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" onClick={onsubmit}>
            {t("Log_In")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignIn;
