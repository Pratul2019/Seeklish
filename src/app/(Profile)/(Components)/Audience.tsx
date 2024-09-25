import Image from "next/image";
import { IoIosClose } from "react-icons/io";

interface AudienceModalProps {
  audience: { name: string; image: string }[];
  onClose: () => void;
}

const AudienceModal: React.FC<AudienceModalProps> = ({ audience, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-header p-6 rounded-3xl max-w-xs w-full relative flex flex-col max-h-80 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Audience</h2>
          <IoIosClose
            size={30}
            onClick={onClose}
            className="hover:text-red-500 cursor-pointer"
          />
        </div>

        <ul>
          {audience.map((aud, index) => (
            <li key={index} className="p-2">
              <div className="flex items-center">
                <Image
                  src={aud.image}
                  alt={aud.name}
                  className="w-10 h-10 rounded-full mr-2"
                  width={40}
                  height={40}
                  priority
                />
                <span>{aud.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AudienceModal;
