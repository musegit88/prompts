"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { PromptProps, PromptUpdateProps } from "@/types";

interface FormPageProps {
  creatorId?: string | undefined;
  initialData?: PromptUpdateProps | null;
}

const formSchema = z.object({
  prompt: z
    .string()
    .min(2, {
      message: "Prompt must be at least 2 characters.",
    })
    .max(1000),
  tag: z.string().min(2, {
    message: "Prompt must be at least 2 characters.",
  }),
});
const FormPage: React.FC<FormPageProps> = ({ creatorId, initialData }) => {
  const router = useRouter();
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const toastMessage = initialData
    ? "Prompt updated succefuly"
    : "Prompt created succefuly";
  const buttonActions = initialData ? "Update" : "Create";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      prompt: "",
      tag: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const data = {
        creatorId,
        userId: user.user?.id,
        text: values.prompt,
        tag: values.tag,
      };
      {
        initialData
          ? await axios.patch(`/api/prompts/${initialData.id}`, data)
          : await axios.post("/api/prompts/new", data);
      }

      toast.success(toastMessage);
      router.push("/home");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-28 sm:px-12 w-full sm:m-auto md:w-3/4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col  bg-white/20 border-gray-200  shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4 space-y-8"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    {...field}
                    className="w-full sm:3/4 resize-none"
                  />
                </FormControl>
                <FormDescription>Write your prompt here</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <Input
                    placeholder="#web development"
                    {...field}
                    className="w-full sm:3/4 resize-none"
                  />
                </FormControl>
                <FormDescription>Write your prompt here</FormDescription>
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center space-x-4">
            <Button
              type="button"
              variant="destructive"
              onClick={() => router.push("/home")}
            >
              Cancle
            </Button>
            <Button type="submit" disabled={loading}>
              {buttonActions}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormPage;
