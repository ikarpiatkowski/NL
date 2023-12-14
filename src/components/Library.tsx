import { AiOutlinePlus } from 'react-icons/ai';
import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import useSubscribeModal from '@/hooks/useSubscribeModal';
import { Song } from '@/types';
import MediaItem from './MediaItem';
import { ModeToggle } from './ModeToggle';
interface LibraryProps {
  songs: Song[];
}
const Library: React.FC<LibraryProps> = ({ songs }) => {
  const { user, subscription } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const subscribeModal = useSubscribeModal();
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    if (!subscription) {
      return subscribeModal.onOpen();
    }
    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <p className="dark:text-neutral-400 text-neutral-700 font-medium text-md">
            Your custom foods
          </p>
        </div>
        <ModeToggle />
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="
                    dark:text-neutral-400 
                    text-neutral-700 
                    cursor-pointer 
                    hover:text-white 
                    transition
                  "
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <MediaItem onClick={() => {}} key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};
export default Library;
