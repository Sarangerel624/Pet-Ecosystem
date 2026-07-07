import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: Request) {
  try {
    const { email, firstName, lastName } = await req.json();

    const clerk = await clerkClient();

    const clerkUser = await clerk.users.createUser({
      emailAddress: [email],
      skipPasswordChecks: true,
      skipPasswordRequirement: true,
      firstName,
      lastName,
    });

    const user = await prisma.user.create({
      data: { email, firstName, lastName, clerkId: clerkUser.id },
    });

    if (email === prisma.user.findUnique({ where: { email: user.email } })) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "successfully registered", user },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
