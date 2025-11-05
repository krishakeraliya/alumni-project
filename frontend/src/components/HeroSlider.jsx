import { useEffect, useState } from 'react';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';


const images = [img1, img2, img3,img4,img5,img6,img7];
const messages = [
  "Welcome to SCET Nexus",
  "SCET Nexus — Because Connections Create Opportunities.",
  "IT and AI&DS Alumni. One Network. Infinite Impact",
  "From Campus to Corporate — Alumni Paths, Now Visible",
  "From SCET to Success — See Their Stories"
];

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(imageTimer);
  }, []);

  useEffect(() => {
    let charIndex = 0;
    setTypedText(''); // Clear text before new typing

    const fullText = messages[textIndex];
    const typingInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setTypedText(fullText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    const messageTimeout = setTimeout(() => {
      setTextIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(messageTimeout);
    };
  }, [textIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={images[index]}
        alt="slider"
        className="absolute w-full h-full object-cover blur-sm transition-all duration-500"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-3xl md:text-3xl text-white font-bold text-center px-4">
          {typedText}
        </h2>
      </div>
    </div>
  );
}

export default HeroSlider;
