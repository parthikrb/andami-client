import { StoreApi, UseBoundStore, create } from "zustand";
import { useShallow } from "zustand/react/shallow";

type OnboardStore = {
  step: number;
  setStep: (step: number) => void;
  createOrJoinTeam: "create" | "join";
  setCreateOrJoinTeam: (createOrJoinTeam: "create" | "join") => void;
};

const useOnboardStore: UseBoundStore<StoreApi<OnboardStore>> = create(
  (set) => ({
    step: 0,
    setStep: (step: number) => set({ step }),
    createOrJoinTeam: "create",
    setCreateOrJoinTeam: (createOrJoinTeam: "create" | "join") =>
      set({ createOrJoinTeam }),
  })
);

const useOnboard = () =>
  useOnboardStore(
    useShallow((state: OnboardStore) => ({
      step: state.step,
      setStep: state.setStep,
      createOrJoinTeam: state.createOrJoinTeam,
      setCreateOrJoinTeam: state.setCreateOrJoinTeam,
    }))
  );

export default useOnboard;
