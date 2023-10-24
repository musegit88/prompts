"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  text: z.string().min(2, { message: "" }),
});

interface ResultProps {
  text: string;
}

const OptPage = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ResultProps[]>([]);
  console.log(results);
  const [copied, setCopied] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/optimization", {
        text: values.text,
      });
      setResults(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleCopy = (text: string) => {
    setCopied(text);
    navigator.clipboard.writeText(text);
    setTimeout(() => setCopied(""), 2000);
  };
  return (
    <div className="px-4 sm:px-12 py-6 ">
      <div className="flex flex-col ">
        <Header
          title="New generation "
          titleBottom="AI-Powered Prompts"
          description=" Prompt optimization help to generate a perfect prompt for a new
        generation request. It is based on large language models. It can be
        used for text generation, question answering, summarization,
        translation, and more. It can also be fine tuned for other tasks like
        command generation"
          gradient="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        />
        {/* Desktop */}
        <div className="max-[640px]:hidden sm:flex gap-4 mt-8 border border-gray-500 rounded-md  p-2 w-full h-[320px]">
          <div className="w-1/2 sm:border-r p-2 sm:border-gray-500 overflow-scroll">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full sm:flex sm:flex-col space-y-4"
              >
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the task you want to achieve"
                          {...field}
                          className="w-full resize-y"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex flex-col items-end">
                  <Button type="submit" disabled={loading}>
                    Generate
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <div className="flex justify-center  w-1/2 p-2 overflow-scroll bg-gray-400 rounded-md">
            {isLoading && (
              <div className="flex items-center justify-center">
                <Image
                  src={"/loader.svg"}
                  width={40}
                  height={40}
                  alt=""
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex items-center justify-center">
              {results.length === 0 && !isLoading && (
                <div>
                  <h2>Nothing generated</h2>
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              {results.map((result) => (
                <Card>
                  <CardContent className="flex flex-col space-y-2  py-2">
                    <div
                      onClick={() => handleCopy(result.text)}
                      className="flex justify-center items-center cursor-pointer rounded-full bg-white/10 w-8 h-8"
                    >
                      <Image
                        src={copied === result.text ? "/tick.svg" : "/copy.svg"}
                        alt=""
                        width={12}
                        height={12}
                      />
                    </div>
                    <p className="overflow-y-scroll">{result.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        {/* Desktop end */}
        {/* Mobile */}
        <div className="sm:hidden flex flex-col space-y-4 mt-4">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the task you want to achieve"
                          {...field}
                          className="w-full resize-y"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex flex-col items-end">
                  <Button type="submit" disabled={loading}>
                    Generate
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <div className="flex justify-center p-2 overflow-scroll bg-gray-400 rounded-md h-[240px]">
            {isLoading && (
              <div className="flex items-center justify-center">
                <Image
                  src={"/loader.svg"}
                  width={40}
                  height={40}
                  alt=""
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex items-center justify-center">
              {results.length === 0 && !isLoading && (
                <div>
                  <h2>Nothing generated</h2>
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              {results.map((result) => (
                <Card>
                  <CardContent className="flex flex-col space-y-2  py-2">
                    <div
                      onClick={() => handleCopy(result.text)}
                      className="flex justify-center items-center cursor-pointer rounded-full bg-gray-900 dark:bg-white/10 w-8 h-8"
                    >
                      <Image
                        src={copied === result.text ? "/tick.svg" : "/copy.svg"}
                        alt=""
                        width={12}
                        height={12}
                      />
                    </div>
                    <p className="overflow-y-scroll">{result.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        {/* Mobile end */}
      </div>
    </div>
  );
};

export default OptPage;
