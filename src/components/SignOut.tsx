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
import { useTranslation } from "react-i18next";

const SignOut = () => {
  const { t } = useTranslation();
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
        <CardTitle className="text-2xl font-bold">{t("Logout")}</CardTitle>
        <CardDescription> {t("Are_you_sure")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button type="submit" className="w-full" onClick={onsubmit}>
            {t("Logout")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignOut;
