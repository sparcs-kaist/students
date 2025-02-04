import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

type BannerProps = {
  images?: string[];
  alt?: string[];
  onClick?: (idx: number) => void;
};

const BannerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 0px;
  width: 100%;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 2.5 / 1;
`;

const Arrow = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
  gap: 0px;

  margin: 0 -40px;
  width: 18px;
  height: 18px;

  background: rgba(94, 94, 94, 0.5);
  color: white;
  border-radius: 4px;
  z-index: 1;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
`;

const Banner: React.FC<BannerProps> = ({
  images = ["temp/1.jpg", "temp/2.jpg", "temp/3.jpg"],
  alt = ["배너 이미지 1", "배너 이미지 2", "배너 이미지 3"],
  onClick = _idx => {},
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const index = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // 5초마다 이미지 변경

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div>
      <BannerWrapper>
        <Arrow onClick={handlePrev}>{"<"}</Arrow>
        <StyledImage
          src={`/${images[currentIndex]}`}
          alt={alt[currentIndex]}
          width={0}
          height={0}
          sizes="40vw"
          onClick={() => onClick(currentIndex)}
        />

        <Arrow onClick={handleNext}>{">"}</Arrow>
      </BannerWrapper>

      {/* 배너 하단에 페이지 인덱스를 표시하는 부분
      <IndexWrapper>
        {currentIndex + 1} / {images.length}
      </IndexWrapper> */}
    </div>
  );
};
export default Banner;
