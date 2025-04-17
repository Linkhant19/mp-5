// lib/createUrl.ts
"use server";

import getCollection, {URL_COLLECTION} from "@/db";
import {URL} from "@/types";

export default async function createUrl(url: string, alias: string): Promise<URL> {
    console.log("creating new url");

    const baseUrl = "https://mp-5-lkk19.vercel.app";
    const shortUrl = `${baseUrl}/${alias}`;
    console.log("this is the shortUrl", shortUrl)

    const p = {
        url: url,
        alias: alias,
        shortUrl: shortUrl,
    };

    const isValidUrl = (url: string) => {
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
            '(\\#[-a-z\\d_]*)?$','i');
        return !!urlPattern.test(url);
    }

    if (!isValidUrl(url)){
        throw new Error ("The URL is not valid. Please make sure to include http:// or https://");
    }

    // get from my db to check if the alias already exists
    const urlCollection = await getCollection(URL_COLLECTION);

    const existing = await urlCollection.findOne({ alias });
    if (existing) {
      throw new Error ('You already created this URL :(');
    }
    const res = await urlCollection.insertOne({...p});

    if (!res.acknowledged){
        throw new Error("DB insert failed");
    }
    return {...p, id:res.insertedId.toHexString()};
}

