import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UserMinusIcon } from "lucide-react";
import { MouseEvent } from "react";

type DeleteTeamUserButtonProps = {
  userName: string;
  onClick: (event: MouseEvent) => void;
};

const DeleteTeamUserButton = ({
  userName,
  onClick,
}: DeleteTeamUserButtonProps) => {
  function handleDeleteTeam(event: MouseEvent): void {
    onClick(event);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <UserMinusIcon size={16} className="text-destructive" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove the association of the user{" "}
            <strong className="text-primary">{userName}</strong> with the team.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteTeam}
            className="bg-destructive text-white hover:bg-destructive/80"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTeamUserButton;
