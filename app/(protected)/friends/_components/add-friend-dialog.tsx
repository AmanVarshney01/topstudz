"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";

import { createFriendRequest } from "@/db/actions";
import { createFriendRequestSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = createFriendRequestSchema;

export default function AddFriendDialog() {
  const [open, setOpen] = useState(false);

  const { executeAsync, isExecuting } = useAction(createFriendRequest, {
    onSuccess: ({ data }) => {
      toast.success(data?.message);
      setOpen(false);
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await executeAsync(values);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Friend</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogDescription>
            Add a friend by searching for their email address.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="xyz@mail.com" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    Enter the email address of the user you want to add as a
                    friend.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isExecuting} type="submit">
              {isExecuting && <LoaderCircle className="animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
