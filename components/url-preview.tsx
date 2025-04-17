// components/url-preview.tsx

import { URL } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function UrlPreview({post}: {post:URL}){
    return(
        <div className ="bg-blue-200 p-6 m-4 w-full max-w-md text-center">
            <h2 className="font-bold text-xl mb-2 text-black">WE GOT YOU :D</h2>

            <div className="flex flex-row mt-10">
                <p className="text-black mr-5 mt-1"> {post.shortUrl} </p>
                <a
                    href={`/${post.alias}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                <Button variant="contained">
                    Take me there!
                </Button>
                </a>
            </div>
            
             
        </div>

    );
} 