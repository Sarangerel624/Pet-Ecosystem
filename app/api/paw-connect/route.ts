import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { description, images, userId } = await req.json();

    const creatPost = await prisma.experienceExchange.create({
      data: {
        description,
        images,
        userId,
      },
    });

    if (creatPost) {
      return NextResponse.json(
        {
          message: "Post created successfully",
        },
        { status: 200 },
      );
    }
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const posts = await prisma.experienceExchange.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { postId } = await req.json();
    const deletedPost = await prisma.experienceExchange.delete({
      where: {
        id: postId,
      },
    });

    if (deletedPost) {
      return NextResponse.json(
        { message: "Post deleted successfully" },
        { status: 200 },
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { postId, editedDescription, images } = await req.json();

    const post = await prisma.experienceExchange.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return NextResponse.json(
        {
          error: "Post not found",
        },
        { status: 404 },
      );
    }

    const updatedPost = await prisma.experienceExchange.update({
      where: {
        id: postId,
      },
      data: {
        description: editedDescription,
        images: images,
      },
    });

    if (updatedPost) {
      return NextResponse.json(
        { message: "Post updated successfully" },
        { status: 200 },
      );
    }
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
