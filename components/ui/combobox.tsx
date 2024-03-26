"use client";

import { CaretSortIcon, CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import React, { ForwardedRef, forwardRef, useState } from "react";

type ComboboxProps = {
  options: { label: string; value: string }[];
  placeholder?: string;
  searchPlaceholder?: string;
  noOptionsText?: string;
  value?: string | number;
  onChange: (value: string) => void;
  isLoading?: boolean;
};

export const Combobox = forwardRef(
  (
    {
      options,
      placeholder,
      searchPlaceholder,
      noOptionsText,
      value,
      onChange,
      isLoading,
    }: ComboboxProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const [open, setOpen] = useState(false);

    if (isLoading || !options?.length) {
      return (
        <Button disabled variant="outline">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      );
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
            ref={ref}
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder || "Select..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] h-[250px] p-0">
          <Command>
            <CommandInput
              placeholder={searchPlaceholder || "Search..."}
              className="h-9"
            />
            <CommandEmpty>{noOptionsText || "No options found"}</CommandEmpty>
            <CommandGroup className="overflow-y-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    const selectedId = options.find(
                      (option) => option.label.toLowerCase() === currentValue
                    )?.value;
                    onChange(selectedId || "");
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

Combobox.displayName = "Combobox";
