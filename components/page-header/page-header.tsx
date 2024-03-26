import React from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <h2 className="text-foreground/60 text-md">{subtitle}</h2>}
    </div>
  );
};

export default PageHeader;
