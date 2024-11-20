import {
  LineSkeleton,
  SkeletonContainer,
  SkeletonItem,
  TextSkeleton,
} from "./skeleton-chat.styles";

const ChatSkeleton = () => {
  return (
    <SkeletonContainer>
      {[...Array(12)].map((_, index) => (
        <SkeletonItem key={index}>
          <TextSkeleton>
            <LineSkeleton />
          </TextSkeleton>
        </SkeletonItem>
      ))}
    </SkeletonContainer>
  );
};

export default ChatSkeleton;
