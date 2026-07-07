import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ clerkId: string }> },
) {
  const { clerkId } = await params;
  if (!clerkId) {
    return NextResponse.json(
      { error: "Clerk ID is required" },
      { status: 400 },
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (user) {
      return NextResponse.json(user, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
