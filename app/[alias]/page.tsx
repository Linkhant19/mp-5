// app/[alias]/page.tsx

import { redirect, notFound } from "next/navigation";
import getCollection, { URL_COLLECTION } from "@/db";

export default async function AliasPage({ params }: { params: { alias: string } }) {
    const { alias } = params;

    const collection = await getCollection(URL_COLLECTION);
    const record = await collection.findOne({ alias });

    if (!record) {
        notFound(); 
    }

    redirect(record.url);
    return null; 
}
