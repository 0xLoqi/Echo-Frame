interface FrameImage {
  src: string;
  alt: string;
  className: string;
}

export const frameImages: FrameImage[] = [
  {
    src: "/images/Framed_image.png",
    alt: "Framed artwork 1",
    className: "absolute top-24 left-8 w-32 transform -rotate-12 shadow-xl"
  },
  {
    src: "/images/Framed_image2.png",
    alt: "Framed artwork 2",
    className: "absolute bottom-16 left-24 w-44 transform rotate-6 shadow-xl"
  },
  {
    src: "/images/Framed_image3.png",
    alt: "Framed artwork 3",
    className: "absolute top-28 right-12 w-40 transform rotate-12 shadow-lg"
  },
  {
    src: "/images/Framed_image4.png",
    alt: "Framed artwork 4",
    className: "absolute bottom-12 right-16 w-36 transform -rotate-8 shadow-xl"
  },
  {
    src: "/images/Framed_image5.png",
    alt: "Framed artwork 5",
    className: "absolute top-1/3 left-80 transform -translate-y-1/2 w-44 rotate-3 shadow-lg"
  },
  {
    src: "/images/Framed_image6.png",
    alt: "Framed artwork 6",
    className: "absolute top-1/3 right-72 transform -translate-y-1/2 w-40 -rotate-6 shadow-xl"
  },
]; 