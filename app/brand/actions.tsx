"use server";

import { BrandFormData } from "./types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createBrand(formData: BrandFormData) {
  try {
    // Try to use the external API if available
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    let response;

    // Check if we have auth tokens
    const cookieStore = await cookies();
    const authToken0 = cookieStore.get(
      "sb-ginjmrvsyfbvxccpdqhq-auth-token.0"
    )?.value;
    const authToken1 = cookieStore.get(
      "sb-ginjmrvsyfbvxccpdqhq-auth-token.1"
    )?.value;

    // If we have a base URL and auth tokens, use the external API
    if (baseUrl && authToken0 && authToken1) {
      response = await fetch(`${baseUrl}/brand`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "sb-ginjmrvsyfbvxccpdqhq-auth-token.0": authToken0,
          "sb-ginjmrvsyfbvxccpdqhq-auth-token.1": authToken1,
        },
        body: JSON.stringify(formData),
        cache: "no-store",
        credentials: "include",
      });
    } else {
      // Otherwise, use the local API endpoint
      response = await fetch("/api/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create brand");
    }

    // Redirect to step 3 after successful brand creation
    redirect("/step/3");
  } catch (error) {
    console.error("Error creating brand:", error);
    throw error;
  }
}