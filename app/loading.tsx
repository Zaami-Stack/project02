import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container space-y-8 py-10">
      <Skeleton className="h-48 w-full rounded-[32px]" />
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <Skeleton className="h-[540px] w-full rounded-[32px]" />
        <div className="space-y-8">
          <Skeleton className="h-[220px] w-full rounded-[32px]" />
          <Skeleton className="h-[220px] w-full rounded-[32px]" />
        </div>
      </div>
      <Skeleton className="h-[420px] w-full rounded-[32px]" />
    </div>
  );
}

