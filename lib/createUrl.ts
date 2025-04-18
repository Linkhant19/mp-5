// lib/createUrl.ts
"use server";

import getCollection, { URL_COLLECTION } from "@/db";
import type { URL } from "@/types";

export default async function createUrl(url: string, alias: string): Promise<URL> {
    console.log("creating new url");

    const baseUrl = "https://mp-5-lkk19.vercel.app";
    const shortUrl = `${baseUrl}/${alias}`;
    console.log("this is the shortUrl", shortUrl);

    const p = {
        url: url,
        alias: alias,
        shortUrl: shortUrl,
    };

    // This is checking for empty 
    if (!url || url.trim() === "") {
        throw new Error("URL is required.");
    }

    // Next, I will check for if they start with http:// or https://
    try {
        const parsed = new URL(url);
        if (!["http:", "https:"].includes(parsed.protocol)) {
            throw new Error("URL must start with http:// or https://");
        }
    } catch (e) {
        console.error("[createUrl] Invalid URL:", e);
        throw new Error("Invalid URL format. Please include http:// or https://");
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
            console.warn("[createUrl] Target responded with:", response.status);
            throw new Error("Target site is unreachable or returned an error status.");
        }
    } catch (e) {
        console.error("[createUrl] Fetch failed:", e);
        throw new Error("Target domain is unreachable or has no DNS record.");
    }

    // I will chck here if the alias already exists in my db
    const urlCollection = await getCollection(URL_COLLECTION);
    const existing = await urlCollection.findOne({ alias });
    if (existing) {
        throw new Error("Alias already exists. Please choose a different one.");
    }

    // insert and check if inserting was a success
    const res = await urlCollection.insertOne({ ...p });

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    // yayyyyy
    return { ...p, id: res.insertedId.toHexString() };
}
