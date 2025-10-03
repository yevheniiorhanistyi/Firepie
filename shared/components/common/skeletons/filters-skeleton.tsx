import { Skeleton } from "@/shared/components/ui";

interface Props {
  className?: string;
}

export const FiltersSkeleton: React.FC<Props> = ({ className }) => {
  const rows = [
    "w-16 h-8 mb-5",
    "w-24 h-6 mb-3",
    "w-16 h-6 mb-4",
    "w-28 h-6 mb-5",
    "w-10 h-6 mb-3",
    "w-20 h-6 mb-4",
    "w-20 h-6 mb-4",
    "w-20 h-6 mb-12",
    "w-24 h-6 mb-2",
    "w-full h-10 mb-2",
    "w-full h-6 mb-2",
    "w-full h-6 mb-2",
    "w-3/4 h-6 mb-2",
    "w-1/2 h-6",
  ];

  return (
    <div className={className}>
      {rows.map((cls, i) => (
        <Skeleton key={i} className={`${cls} rounded-lg`} />
      ))}
    </div>
  );
}
