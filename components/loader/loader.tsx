import { Loader2Icon } from "lucide-react";

const Loader = () => {
  return (
    <div
      className="flex items-center justify-center h-full w-full"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      <Loader2Icon size="2em" className="animate-spin text-primary" />
    </div>
  );
};

export default Loader;
