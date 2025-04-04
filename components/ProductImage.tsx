import Image from "next/image";

interface ProductImageProps {
  imageUrl: string;
  variant?: "small" | "medium" | "large" | "extraSmall"; // Add more variants if needed
}

const ProductImage = ({ imageUrl, variant = "medium" }: ProductImageProps) => {
  let size: number;

  switch (variant) {
    case "extraSmall":
      size = 40;
      break;
    case "small":
      size = 80;
      break;
    case "medium":
      size = 120;
      break;
    case "large":
      size = 160;
      break;
    default:
      size = 120;
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src={imageUrl}
        alt="Product Image"
        fill
        className="rounded-lg object-cover"
      />
    </div>
  );
};

export default ProductImage;
