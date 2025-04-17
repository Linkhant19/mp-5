// components/get-url.tsx

"use client";

import { useState } from "react";
import { URL } from "@/types";
import UrlPreview from "./url-preview";
import NewUrlForm from "./new-url-form";

export default function PostUrl() {
    const [post, setPost] = useState<URL| null>(null);

    function append(newPost:URL){
        setPost(newPost);
    }

    return (
        <div className = "flex flex-col items-center">
            <NewUrlForm append={append}/>
                {post && <UrlPreview key={post.id} post={post} />}   
        </div>
    );
}