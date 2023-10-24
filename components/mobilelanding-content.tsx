"use client"


import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const MobileLandingContent = () => {
  return (
    <div className="mt-32 flex flex-col items-center justify-center space-y-4 w-full">
      <div className="w-full">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="lg" className="w-full text-lg font-bold py-4 bg-gradient-to-r from-sky-400 to-fuchsia-500 bg-clip-text text-transparent">
              Discover
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>
              Discover a world of inspiration and creativity! Our website is
              designed to help you find the perfect prompt to get your creative
              juices flowing. With a wide variety of prompts to choose from,
              including writing prompts, art prompts, and more, you're sure to
              find something that sparks your imagination.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <div className="w-full">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="lg" className="w-full text-lg font-bold py-4 bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
              Create
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>
              From brainstorming and outlining to drafting and revising, our
              tools are here to help you stay organized and focused on your
              creative vision. So why wait? Start creating today and see where
              your imagination takes you!.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <div className="w-full">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="lg" className="w-full text-lg font-bold py-4 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
              Share
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>
              Finally, once you've finished your project, it's time to share it
              with the world! Our website makes it easy to share your work with
              others and connect with a community of like-minded creatives.
            </p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default MobileLandingContent;
