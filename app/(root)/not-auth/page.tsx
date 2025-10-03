import { InfoBlock } from '@/shared/components/common';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40 mb-10 px-4">
      <InfoBlock
        title="Authorization required"
        text="You need to be logged in to view this page."
        imageUrl="/images/lock.png"
      />
    </div>
  );
}
