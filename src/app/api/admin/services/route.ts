import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !["ADMIN", "CONTENT_MANAGER"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    const where = status && status !== "ALL" ? { status } : {};
    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
      db.service.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: "desc" },
      }),
      db.service.count({ where }),
    ]);

    return NextResponse.json({
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Services API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !["ADMIN", "CONTENT_MANAGER"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.slug || !data.description) {
      return NextResponse.json(
        { error: "Name, slug, and description are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingService = await db.service.findUnique({
      where: { slug: data.slug }
    });

    if (existingService) {
      return NextResponse.json(
        { error: "Service with this slug already exists" },
        { status: 400 }
      );
    }

    const service = await db.service.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        features: data.features || [],
        pricing: data.pricing || {
          startingPrice: 0,
          currency: "USD",
          billingType: "one-time"
        },
        image: data.image || null,
        status: data.status || "DRAFT",
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Service creation error:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !["ADMIN", "CONTENT_MANAGER"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, ...data } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Service ID is required" },
        { status: 400 }
      );
    }

    // If slug is being updated, check for conflicts
    if (data.slug) {
      const existingService = await db.service.findFirst({
        where: { 
          slug: data.slug,
          NOT: { id }
        }
      });

      if (existingService) {
        return NextResponse.json(
          { error: "Service with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const service = await db.service.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("Service update error:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Service ID is required" },
        { status: 400 }
      );
    }

    await db.service.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Service deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}