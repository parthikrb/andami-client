"use client";

import { updateDesignationAndDepartmentAction } from "@/actions/update-designation-and-department.action";
import { getAllDepartments } from "@/api/department";
import { getAllDesignations } from "@/api/designation";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { API_KEYS } from "@/constants";
import useOnboard from "@/hooks/use-onboard-store/use-onboard-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import isEqual from "lodash/isEqual";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const DesignationAndDepartmentFormSchema = z.object({
  designationId: z.number({
    required_error: "Designation is required.",
  }),
  departmentId: z.number({
    required_error: "Department is required.",
  }),
});

type DesignationAndDepartmentFormInputs = z.infer<
  typeof DesignationAndDepartmentFormSchema
>;

type DesignationAndDepartmentFormProps = {
  meData: any;
};

const DesignationAndDepartmentForm = ({
  meData,
}: DesignationAndDepartmentFormProps) => {
  const form = useForm<DesignationAndDepartmentFormInputs>({
    resolver: zodResolver(DesignationAndDepartmentFormSchema),
    defaultValues: {
      designationId: meData?.designationId ?? undefined,
      departmentId: meData?.departmentId ?? undefined,
    },
  });

  const { setStep } = useOnboard();

  const queryClient = useQueryClient();

  const { data: designations, isLoading: isDesignationsLoading } = useQuery({
    queryKey: [API_KEYS.DESIGNATIONS],
    queryFn: () => getAllDesignations(),
  });

  const { data: departments, isLoading: isDepartmentsLoading } = useQuery({
    queryKey: [API_KEYS.DEPARTMENTS],
    queryFn: () => getAllDepartments(),
  });

  useEffect(() => {
    form.reset({
      designationId: meData?.designationId ?? undefined,
      departmentId: meData?.departmentId ?? undefined,
    });
  }, [form, meData]);

  async function onSubmit(data: DesignationAndDepartmentFormInputs) {
    setStep(1);
    if (
      isEqual(data, {
        designationId: meData?.designationId,
        departmentId: meData?.departmentId,
      })
    )
      return;
    updateDesignationAndDepartmentAction(data);
    await queryClient.refetchQueries({
      queryKey: [API_KEYS.ME, { authId: meData.authId }],
    });
  }

  return (
    <div className="flex flex-col gap-4 rounded-md border p-4 shadow">
      <h1 className="text-3xl font-semibold">Few more details about you</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="designationId"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Your designation</FormLabel>
                <FormControl>
                  <Combobox
                    options={designations?.map(
                      (designation: { id: number; title: string }) => ({
                        label: designation.title,
                        value: designation.id,
                      })
                    )}
                    {...field}
                    placeholder="Select designation"
                    searchPlaceholder="Search designations"
                    isLoading={isDesignationsLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Combobox
                    options={departments?.map(
                      (department: { id: number; name: string }) => ({
                        label: department.name,
                        value: department.id,
                      })
                    )}
                    {...field}
                    placeholder="Select department"
                    searchPlaceholder="Search departments"
                    isLoading={isDepartmentsLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-4">
            <Button type="submit" className="w-full">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default memo(DesignationAndDepartmentForm);
