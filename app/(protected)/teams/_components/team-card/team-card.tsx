import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC } from "react";

type TeamCardProps = {
  name: string;
  description?: string;
  membersCount: number;
  admins: string[];
};

const TeamCard = ({
  name,
  description,
  membersCount,
  admins,
}: TeamCardProps) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <hr className="mb-4" />
      <CardContent className="flex-grow pt-6">
        <div className="flex flex-col gap-4">
          <CardItemContent name="Members" value={membersCount} />
          <CardItemContent name="Admins" value={admins} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;

type CardItemContentProps = {
  name: string;
  value: string | number | string[];
};

const CardItemContent: FC<CardItemContentProps> = ({ name, value }) => {
  return (
    <div className="flex flex-col gap-1 ">
      <div className="flex flex-row gap-2 flex-wrap">
        {Array.isArray(value) ? (
          value.map((item) => {
            return <Badge key={item}>{item}</Badge>;
          })
        ) : (
          <h3 className="text-sm font-semibold text-foreground">{value}</h3>
        )}
      </div>
      <p className="text-xs text-foreground/60">{name}</p>
    </div>
  );
};
