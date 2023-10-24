"use client";
import { PromptProps } from "@/types";
import PromptCard from "./prompt-card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChangeEventHandler, useState } from "react";

interface FeedProps {
  data?: PromptProps[];
  results?: PromptProps[];
  handleTagClick?: (a: string) => void;
}
const PromptsCardList: React.FC<FeedProps> = ({
  data,
  results,
  handleTagClick,
}) => {
  let body = (
    <div className="space-y-6">
      {results &&
        results?.map((post) => (
          <PromptCard
            key={post.id}
            posts={post}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  );
  if (!results) {
    body = (
      <div className="space-y-6">
        {data?.map((post) => (
          <PromptCard
            key={post.id}
            posts={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="py-8 sm:columns-2 sm:gap-4  lg:columns-3 lg:px-4 xl:columns-4">
      {body}
    </div>
  );
};
const Feed: React.FC<FeedProps> = ({ data, results }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState<
    PromptProps[] | undefined
  >([]);
  const filterPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, "i");
    return data?.filter(
      (item) =>
        regex.test(item.username) ||
        regex.test(item.prompt) ||
        regex.test(item.tag)
    );
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchText(event.target.value);
    setTimeout(() => {
      const searchResults = filterPrompts(event.target.value);
      setSearchedResults(searchResults);
    }, 500);
  };
  const handleTagClick = (tag: string) => {
    setSearchText(tag);
    const searchresults = filterPrompts(tag);
    setSearchedResults(searchresults);
  };
  return (
    <div className="flex flex-col justify-center items-center space-y-2 mt-14 ">
      <div className="flex justify-center mb-12 sm:w-full">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="search prompts"
            value={searchText}
            onChange={handleSearch}
            className="italic"
          />
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden grid grid-cols-2 gap-y-2 sm:flex flex-wrap space-x-2">
        {data?.map((item) => (
          <Button
            size="sm"
            key={item.id}
            onClick={() => handleTagClick(item.tag)}
            className="flex gap-x-2"
          >
            <span> #</span> <span>{item.tag}</span>
          </Button>
        ))}
      </div>
      {/* Desktop End*/}

      {/* Mobile */}
      <div className="sm:hidden flex flex-wrap items-center gap-2">
        {data?.map((item) => (
          <span
            key={item.id}
            onClick={() => handleTagClick(item.tag)}
            className="bg-slate-400 rounded-md px-2 text-sm"
          >
            # {item.tag}
          </span>
        ))}
      </div>
      {/* Mobile end */}
      <div className="">
        {searchText ? (
          <PromptsCardList
            results={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PromptsCardList
            data={data}
            handleTagClick={handleTagClick}
          />
        )}
      </div>
    </div>
  );
};

export default Feed;
