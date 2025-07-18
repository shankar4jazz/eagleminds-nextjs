import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Fetch only published services for public consumption
    const services = await db.service.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        features: true,
        pricing: true,
        image: true,
        status: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error("Public services API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}