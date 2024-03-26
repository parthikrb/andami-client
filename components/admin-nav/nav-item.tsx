"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementType, createElement } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type NavItemProps = {
  href: string;
  Icon: ElementType;
  name: string;
};

const NavItem = ({ href, Icon, name }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.includes(href);
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className="w-12 h-12 rounded-md flex justify-center items-center cursor-pointer hover:bg-primary/10 transition-bg duration-200"
            aria-label={name}
            id={`nav-item-${name.toLowerCase()}`}
          >
            <Icon
              size={24}
              className={isActive(href) ? "text-yellow-400" : "text-foreground"}
              tabIndex={-1}
              aria-hidden="true"
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
          <div className="text-sm">{name}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NavItem;
