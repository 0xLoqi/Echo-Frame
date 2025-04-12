import { useEffect, useState } from 'react';

const PROMPTS = [
  "A cosmic jellyfish floating through a nebula of neon colors",
  "An ancient tree growing through a floating library in the clouds",
  "A steampunk city where mechanical butterflies fill the sunset sky",
  "A surreal underwater tea party with bioluminescent sea creatures",
  "A crystalline castle reflecting the northern lights",
  "A garden where musical instruments grow like flowers",
  "A train journey through impossible M.C. Escher-like landscapes",
  "A city where buildings are made of flowing waterfalls",
  "Dragons made of constellation stars soaring through aurora borealis",
  "A forest of giant mushrooms glowing with rainbow bioluminescence",
  "An art gallery floating in space with paintings coming to life",
  "A clockwork phoenix rising from mechanical gears",
  "A Victorian greenhouse filled with plants from alien worlds",
  "Origami animals walking through a paper craft cityscape",
  "A mystical bookshop where stories float as golden light",
  "An enchanted violin playing notes that turn into butterflies",
  "A cyberpunk cafe where coffee swirls create holographic art",
  "A lighthouse beam cutting through clouds made of dreams",
  "Ancient ruins overgrown with crystals that catch the moonlight",
  "A masquerade ball where dancers leave trails of stardust"
];

const TYPING_SPEED = 50;
const DELAY_BEFORE_DELETE = 2000;
const DELAY_BEFORE_NEXT = 1000;

export const TypeAnimation = () => {
  const [text, setText] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (text.length < PROMPTS[promptIndex].length) {
        timeout = setTimeout(() => {
          setText(PROMPTS[promptIndex].slice(0, text.length + 1));
        }, TYPING_SPEED);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, DELAY_BEFORE_DELETE);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, TYPING_SPEED / 2);
      } else {
        timeout = setTimeout(() => {
          setPromptIndex((current) => (current + 1) % PROMPTS.length);
          setIsTyping(true);
        }, DELAY_BEFORE_NEXT);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, promptIndex, isTyping]);

  return (
    <div className="h-[60px] flex items-center">
      <span className="text-neutral-800 dark:text-neutral-200">
        {text}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  );
}; 