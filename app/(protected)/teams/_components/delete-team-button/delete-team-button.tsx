import { deleteTeam } from "@/api/team";
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
import { API_KEYS } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type DeleteTeamButtonProps = {
  teamId: number;
  teamName: string;
};

const DeleteTeamButton = ({ teamId, teamName }: DeleteTeamButtonProps) => {
  const queryClient = useQueryClient();

  const deleteTeamMutation = useMutation({
    mutationFn: () => deleteTeam(teamId),
    onSuccess: () => {
      toast.success(`Team ${teamName} has been deleted`);
      queryClient.refetchQueries({
        queryKey: [API_KEYS.TEAMS],
      });
    },
  });

  const handleDeleteTeam = () => {
    deleteTeamMutation.mutate();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Trash2 className="h-4 w-4 text-destructive" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the team{" "}
            <strong className="text-primary">{teamName}</strong> and remove your
            data from our servers.
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

export default DeleteTeamButton;
