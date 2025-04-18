// lib/createUrl.ts
"use server";

import getCollection, { URL_COLLECTION } from "@/db";
import type { URL } from "@/types";

export default async function createUrl(url: string, alias: string): Promise<{success: boolean; data?: URL; error?: string}> {
    const baseUrl = "https://mp-5-lkk19.vercel.app";
    const shortUrl = `${baseUrl}/${alias}`;

    // This is checking for empty
    if (!url || url.trim() === "") {
        return { success: false, error: "URL is required." };
    }

    try {
        // Next, I will check for if they start with http:// or https://
        const parsed = new URL(url);
        if (!["http:", "https:"].includes(parsed.protocol)) {
        return { success: false, error: "URL must start with http:// or https://" };
        }
    } catch {
        return { success: false, error: "Invalid URL format. Please include http:// or https://" };
    }

    // trying to see if the domain will be reahable or not
    try {
        const response = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
        headers: {
            "User-Agent": "Mozilla/5.0"
        }
        });

        if (!response.ok) {
        return {
            success: false,
            error: "Target site is unreachable or returned an error status."
        };
        }
    } catch {
        return {
        success: false,
        error: "Target domain is unreachable or has no DNS record."
        };
    }

    // I will chck here if the alias already exists in my db
    const urlCollection = await getCollection(URL_COLLECTION);
    const existing = await urlCollection.findOne({ alias });
    if (existing) {
        return { success: false, error: "Alias already exists. Please choose a different one." };
    }

    // insert and check if inserting was a success
    const res = await urlCollection.insertOne({ url, alias, shortUrl });
    if (!res.acknowledged) {
        return { success: false, error: "DB insert failed" };
    }

    // yayyyyy
    return {
        success: true,
        data: { url, alias, shortUrl, id: res.insertedId.toHexString() }
    };
}
