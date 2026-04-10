import { cn } from "@/lib/utils";

export const InitialsAvatar = ({
  name,
  size = "sm",
}: {
  name: string;
  size?: "sm" | "md";
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "rounded-full bg-indigo-100 text-indigo-700 font-medium flex items-center justify-center shrink-0",
        size === "sm" ? "w-6 h-6 text-[10px]" : "w-8 h-8 text-xs"
      )}
    >
      {initials}
    </div>
  );
};