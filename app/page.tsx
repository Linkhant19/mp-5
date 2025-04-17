// app/page.tsx

import PostUrl from "@/components/post-url";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-sm p-10 pl-50 pr-50 text-blue-700 dark:text-sky-400 font-mono font-semibold">
        is your url too long? are there many many unnecessary characters that you do not need in that little link of yours? 
        are you stressed that your link would not fit into a little text box? 
        are you just tired of typing the same link over and over again?
        do you want some fun and short link without all the unnecessary text and characters?
        what do these characters mean anyway? who is typing all of these? you want to be unique.
        you want to be cool. right? what was the problem? yes your url is too long.
        is your url too long? are there many many unnecessary characters that you do not need in that little link of yours? 
        are you stressed that your link would not fit into a little text box? 
        are you just tired of typing the same link over and over again?
        do you want some fun and short link without all the unnecessary text and characters?
        what do these characters mean anyway? who is typing all of these? you want to be unique.
        you want to be cool. right? what was the problem? yes your url is too long.
        wait is this repeating?
        there is a solution.
      </p>
      <h1 className="text-5xl font-semibold p-4 text-black">
        URL SHORTENER!
      </h1>
      <PostUrl />
    </div>
  );
}