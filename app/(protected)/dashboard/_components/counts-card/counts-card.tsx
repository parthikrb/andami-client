import { Card } from "@/components/ui/card";
import React from "react";

type CountsCardProps = {
  name: string;
  count: number;
};

const CountsCard = ({ name, count }: CountsCardProps) => {
  return (
    <Card
      className="flex flex-col items-center bg-background rounded-lg shadow-md"
      style={{ width: "20rem", height: "13rem", padding: "4rem" }}
    >
      <h2 className="text-3xl font-normal text-foreground/60">
        #
        <span
          className="text-4xl font-bold text-primary"
          style={{
            fontSize: "7.25rem",
            marginTop: "-2.5rem",
          }}
        >
          {count}
        </span>
      </h2>
      <p className="text-lg font-semibold text-foreground/60">{name}</p>
    </Card>
  );
};

export default CountsCard;
