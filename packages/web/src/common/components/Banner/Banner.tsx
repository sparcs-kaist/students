import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

type BannerProps = {
  images?: string[];
  onClick?: (idx: number) => void;
};

const BannerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 0px;

  position: relative;

  border-radius: 4px;
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

const Banner: React.FC<BannerProps> = ({
  images = ["temp/1.jpg", "temp/2.jpg", "temp/3.jpg"],
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
    <BannerWrapper>
      <Arrow onClick={handlePrev}>{"<"}</Arrow>

      <div>
        <Image
          src={`/${images[currentIndex]}`}
          alt={`배너 이미지 ${currentIndex + 1}`}
          width={840}
          height={336}
          onClick={() => onClick(currentIndex)}
        />
      </div>

      <Arrow onClick={handleNext}>{">"}</Arrow>
    </BannerWrapper>
  );
};
export default Banner;
