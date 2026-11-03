"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function GoogleCallbackPage() {
  const { completeGoogleLogin } = useAuth();
  const router = useRouter();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    (async () => {
      const ok = await completeGoogleLogin();
      router.replace(ok ? "/" : "/login");
    })();
  }, [completeGoogleLogin, router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center text-stone-600 dark:text-stone-300">
      Google callback... Please wait.
    </div>
  );
}