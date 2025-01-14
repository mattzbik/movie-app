import Image from 'next/image';
import placeholderImage from './default.jpg';

export default function PlaceHolderImage() {
  return <Image src={placeholderImage} alt="" width={300} height={300} />;
}
