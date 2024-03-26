import React, { ComponentPropsWithoutRef } from "react";
import { Button } from "./button";
import { PlusIcon } from "lucide-react";

type FloatingActionButtonProps = {
  name: string;
} & ComponentPropsWithoutRef<"button">;

const FloatingActionButton = ({ name, ...rest }: FloatingActionButtonProps) => {
  return (
    <div
      className="absolute"
      style={{
        bottom: "1rem",
        right: "1rem",
      }}
    >
      <Button
        color="primary"
        aria-label={name}
        size="icon"
        style={{
          borderRadius: "50%",
          width: "3.5rem",
          height: "3.5rem",
        }}
        {...rest}
      >
        <PlusIcon size={24} />
        <span className="sr-only">{name}</span>
      </Button>
    </div>
  );
};

export default FloatingActionButton;
