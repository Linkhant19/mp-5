// components/new-url-form.tsx

import createUrl from "@/lib/createUrl";
import { URL } from "@/types";
import {Textarea} from "@mui/joy";
import {Button, FormHelperText, TextField}from "@mui/material";
import {useState} from "react";

export default function NewUrlForm({append}: {append: (post: URL) => void}) {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");

    return (
        <>
            <form
                className="space-y-4 flex flex-col items-center"
                onSubmit={(e) => {
                    e.preventDefault();
                    setError("");
                    createUrl(url, alias)
                    .then((p) => append(p))
                    .catch((err) => {
                        if (err.message && err.message.includes("Invalid URL")) {
                        setError("Enter a valid URL and make sure to include http:// or https://");
                        } else if (err.message && err.message.includes("Alias already exists")) {
                        setError("That alias already exists. Please choose a different one.");
                        } else {
                        setError(err.message || "An error occurred. Please try again.");
                        }
                    });
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

        </>
    );
}


