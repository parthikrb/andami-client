"use client";

import { createOrganizationAndTeamAction } from "@/actions/create-organization-and-team.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useOnboard from "@/hooks/use-onboard-store/use-onboard-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CreateTeamFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Team name must be at least 3 characters.",
    })
    .max(30, {
      message: "Team name must be at most 30 characters.",
    }),
  description: z
    .string()
    .max(200, {
      message: "Description must be at most 200 characters.",
    })
    .optional(),
  organization: z
    .string()
    .min(3, {
      message: "Organization must be at least 3 characters.",
    })
    .max(30, {
      message: "Organization must be at most 30 characters.",
    })
    .max(30, {
      message: "Organization must be at most 30 characters.",
    }),
});

type CreateTeamFormInputs = z.infer<typeof CreateTeamFormSchema>;

const CreateTeamForm = () => {
  const form = useForm<CreateTeamFormInputs>({
    resolver: zodResolver(CreateTeamFormSchema),
    defaultValues: {
      name: "",
      description: "",
      organization: "",
    },
  });

  const { setStep } = useOnboard();

  function onSubmit(data: CreateTeamFormInputs) {
    createOrganizationAndTeamAction(data);
    toast.success("Team created successfully!");
  }

  return (
    <div className="flex flex-col gap-4 p-4 border shadow rounded-md">
      <h1 className="text-3xl font-semibold">Create a team</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  The team will be part of this organization.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              className="border-primary w-1/2"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
            <Button type="submit" className="w-1/2">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateTeamForm;
