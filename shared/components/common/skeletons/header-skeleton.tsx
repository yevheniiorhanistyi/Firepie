import { Container } from "@/shared/components/common";
import { Skeleton } from "@/shared/components/ui";

export const HeaderSkeleton = () => {
  return (
    <div className='border-b px-2'>
      <Container className='flex items-center justify-between py-8'>
        <Skeleton className="w-[154px] min-w-[154px] h-[41px] rounded-xl" />
        <Skeleton className="w-full max-w-[811px] h-[44px] mx-10 rounded-xl" />
        <div className='flex items-center gap-2'>
          <Skeleton className="w-[101px] h-[40px] rounded-xl" />
          <Skeleton className="w-[126px] h-[40px] rounded-xl" />
        </div>
      </Container>
    </div>
  );
};