"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { UserPlusIcon } from "lucide-react";
import { useState } from "react";
import addUserToTeamColumn from "./add-user-to-team-column";

type AddUserToTeamProps = {
  users: any[];
  form: any;
};

const AddUserToTeam = ({ users, form }: AddUserToTeamProps) => {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  const [open, setOpen] = useState(false);

  const handleAddUser = () => {
    form.setValue("users", [...form.getValues("users"), ...selectedUsers]);
    form.handleSubmit();
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="text-primary flex gap-2">
          <UserPlusIcon size={16} /> Add user
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-8">
        <DrawerTitle>Choose users</DrawerTitle>
        <DrawerDescription>
          Selected users will be added to the team
        </DrawerDescription>

        <DataTable
          columns={addUserToTeamColumn}
          data={users}
          onRowSelection={setSelectedUsers}
        />

        <DrawerFooter
          style={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <div
            className="flex justify-end gap-2 w-full"
            style={{
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleAddUser} className="mr-2">
              Add user(s)
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddUserToTeam;
