import styled, { keyframes } from "styled-components";

// Animação de "pulsar"
const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

// Contêiner principal
export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Item do skeleton (cada linha)
export const SkeletonItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// Skeleton para o texto
export const TextSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

// Linhas de texto no skeleton
export const LineSkeleton = styled.div<{ width?: string }>`
  height: 84px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f8f8f8 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  width: ${(props) => props.width || "100%"};
`;
