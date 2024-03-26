"use client";

import { joinTeamAction } from "@/actions/join-team.action";
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
import useOnboard from "@/hooks/use-onboard-store/use-onboard-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const JoinTeamFormSchema = z.object({
  inviteCode: z
    .string()
    .trim()
    .min(6, {
      message: "Team invite code must be 6 characters.",
    })
    .max(6, {
      message: "Team invite code must be 6 characters.",
    }),
});

type JoinTeamFormInputs = z.infer<typeof JoinTeamFormSchema>;

const JoinTeamForm = () => {
  const form = useForm<JoinTeamFormInputs>({
    resolver: zodResolver(JoinTeamFormSchema),
    defaultValues: {
      inviteCode: "",
    },
  });

  const { setStep } = useOnboard();

  function onSubmit(data: JoinTeamFormInputs) {
    joinTeamAction(data);
    setStep(0);
  }

  return (
    <div className="flex flex-col gap-4 p-4 border shadow rounded-md">
      <h1 className="text-3xl font-semibold">Join a team</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="inviteCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team invite code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  You can find the invite code in your email.
                </FormDescription>
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
              Join
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JoinTeamForm;
