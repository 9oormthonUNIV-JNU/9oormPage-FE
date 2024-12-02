import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  // 둘 중 하나라도 데이터 로딩 상태라면 스피너 표시
  const display = isFetching || isMutating ? "block" : "none";

  return (
    <div
      style={{
        position: "absolute",
        display,
        zIndex: 9999,
        top: "45%",
        left: "45%",
      }}
    >
      <Loader2 color="white" className="h-10 w-10 animate-spin" />
    </div>
  );
}
