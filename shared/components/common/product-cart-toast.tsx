import { motion } from 'motion/react';

interface Props {
  name: string;
  imageUrl: string;
  visible: boolean;
}

export const ProductCartToast: React.FC<Props> = ({
  name,
  imageUrl,
  visible,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20, scale: visible ? 1 : 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full max-w-xs bg-white shadow-[0_5px_15px_rgba(0,0,0,0.2)] rounded-lg pointer-events-auto flex items-center overflow-hidden px-4"
    >
      <div className="flex-shrink-0">
        <img
          src={imageUrl}
          alt={name}
          width={48}
          height={48}
          className="object-cover"
        />
      </div>
      <div className="flex-1 p-3">
        <p className="text-base font-semibold truncate">{name}</p>
        <p className="text-xs text-gray-500">Added to cart 🛒</p>
      </div>
    </motion.div>
  );
};

