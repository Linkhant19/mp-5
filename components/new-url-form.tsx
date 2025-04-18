// components/new-url-form.tsx

import createUrl from "@/lib/createUrl";
import { URL } from "@/types";
import {Textarea} from "@mui/joy";
import {Button, FormHelperText, TextField}from "@mui/material";
import {useState} from "react";

export default function NewUrlForm({ append }: { append: (post: URL) => void }) {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
  
    return (
        <form
            className="space-y-4 flex flex-col items-center"
            onSubmit={async (e) => {
            e.preventDefault();
            setError("");
    
            const result = await createUrl(url, alias);
    
            if (!result.success) {
                setError(result.error || "Something went wrong.");
                return;
            }
    
            if (result.data) {
                append(result.data);
            }
            }}
        >
            <TextField
                className="w-[500px]"
                variant="filled"
                label="Insert URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
            />
            <Textarea
                className="w-[500px]"
                placeholder="Alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                required
            />
            <FormHelperText>Click to shorten your URL</FormHelperText>
            <div className="w-[500px] flex flex-col items-center">
            <Button className="w-full" type="submit" variant="contained"> Shorten </Button>
            {error && (
                <div className="mt-4 text-center text-red-600 font-semibold">
                {error} !!!
                </div>
            )}
            </div>
        </form>
    );
  }
  


