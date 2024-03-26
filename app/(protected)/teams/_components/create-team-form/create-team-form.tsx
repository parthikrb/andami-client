"use client";

import { createTeamWithOrganization } from "@/api/team";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { API_KEYS } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AddUserToTeam from "../add-user-to-team/add-user-to-team";
import DeleteTeamUserButton from "../delete-team-user-button/delete-team-user-button";
import editTeamFormColumn from "./create-team-form-column";

const CreateTeamForm = () => {
  const form = useForm<{
    name: string;
    description: string;
    users: any[];
  }>({
    defaultValues: {
      name: "",
      description: "",
      users: [],
    },
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  const availableRoles: any[] = queryClient.getQueryData([
    API_KEYS.ROLES,
  ]) as any[];

  const allUsers: any[] = (queryClient.getQueryData([API_KEYS.USERS]) ||
    []) as any[];

  const databaseUser: any = queryClient.getQueryData([API_KEYS.ME]) as any;

  const updateTeamMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createTeamWithOrganization({
        ...data,
        organization: databaseUser?.organization?.name,
      }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [API_KEYS.TEAMS],
      });

      toast.success("Team created successfully");
      router.back();
    },
  });

  const onSubmit = (data: Record<string, string | any[]>) => {
    const employeeRole = availableRoles.find(
      (role) => role.name?.toLocaleLowerCase() === "employee"
    );

    const sanitizedData = {
      ...data,
      users: (data.users as any[]).map((user: any) => {
        if (!user.role) {
          return {
            ...user,
            role: employeeRole,
          };
        }
        return user;
      }),
    };
    updateTeamMutation.mutate(sanitizedData);
  };

  const handleCancel = () => {
    form.reset();
    router.back();
  };

  const handleRemoveUser = (userId: number) => {
    form.setValue(
      "users",
      form.getValues("users").filter((user: any) => user.id !== userId)
    );
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="users"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Users</FormLabel>
                <FormControl>
                  <DataTable
                    data={field.value || []}
                    columns={[
                      ...editTeamFormColumn.slice(0, 4),
                      {
                        header: "Role",
                        accessorKey: "role",
                        cell: ({ row }) => {
                          const userId = Number(row.getValue("id"));

                          const role: any["role"] = row.getValue("role");

                          const selectedRole =
                            role?.name || availableRoles.at(-1)?.name;

                          return (
                            <Select
                              value={selectedRole}
                              onValueChange={(value) => {
                                field.onChange(
                                  field.value.map((user) => {
                                    if (user.id === userId) {
                                      return {
                                        ...user,
                                        role: availableRoles.find(
                                          (role) => role.id === Number(value)
                                        ),
                                      };
                                    }
                                    return user;
                                  })
                                );
                              }}
                            >
                              <SelectTrigger
                                style={{
                                  width: "180px",
                                }}
                              >
                                <SelectValue>{selectedRole}</SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {availableRoles?.map((role) => {
                                  if (
                                    role.name?.toLocaleLowerCase() === "admin"
                                  )
                                    return null;
                                  return (
                                    <SelectItem
                                      key={role.id}
                                      value={role.id?.toString()!}
                                    >
                                      {role.name}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          );
                        },
                      },
                      {
                        header: "Actions",
                        cell: ({ row }) => {
                          const id: number = row.getValue("id");

                          return (
                            <div className="text-right space-x-2">
                              <DeleteTeamUserButton
                                userName={row.getValue("fullName")}
                                onClick={() => handleRemoveUser(id)}
                              />
                            </div>
                          );
                        },
                        enableColumnFilter: false,
                        enableSorting: false,
                        enableHiding: false,
                        meta: {
                          align: "right",
                        },
                      },
                    ]}
                    optionalComponent={
                      <AddUserToTeam users={allUsers} form={form} />
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className="flex justify-end gap-4"
            style={{
              justifyContent: "flex-end",
            }}
          >
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" className="btn-primary">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateTeamForm;
