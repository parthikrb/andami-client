import { YELLOW } from "@/constants";
import { Egg } from "lucide-react";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <div className="flex flex-row justify-center items-center gap-4 p-16 relative h-[100vh]">
        <div className="flex flex-col gap-4 justify-center items-center w-1/2">
          <Egg color={YELLOW} fill={YELLOW} size={200} />
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
            Andami
          </h1>
        </div>
        <div className="w-1/2 min-w-1/2 flex justify-center">{children}</div>
      </div>
    </main>
  );
};

export default layout;
