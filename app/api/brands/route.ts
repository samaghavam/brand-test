import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/brand`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching brands:", error);
    return NextResponse.json(
      { error: "Failed to fetch brands" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Generate a new UUID for the brand
    const brandId = uuidv4();

    const brandData = {
      brand_id: brandId,
      brand_name: body.brand_name,
      background_image: body.background_image || null,
      main_image: body.main_image || null,
      brand_country: body.brand_country,
      brand_tags: body.brand_tags
        .map((tag: any) => tag.tag_name)
        .filter(Boolean),
      total_contributions: 0,
      total_contributed_amount: 0,
    };

    // Here you would typically save to your database
    // For now, we'll just return the formatted data
    return NextResponse.json(brandData, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create brand" },
      { status: 500 }
    );
  }
}
