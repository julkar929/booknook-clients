import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // Check if the user is authenticated with Google
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.email || !session.user.emailVerified) {
    return NextResponse.json(
      { success: false, message: "Google session পাওয়া যায়নি।" },
      { status: 401 }
    );
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": process.env.INTERNAL_API_SECRET as string,
    },
    body: JSON.stringify({
      email: session.user.email,
      name: session.user.name,
      photoUrl: session.user.image || undefined,
    }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}