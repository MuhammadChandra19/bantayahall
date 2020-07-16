import React from 'react';
import { useRouter } from 'next/router';
import { RouteItemInterface } from '../../../util/routes/route.item';

const Link: React.FC<RouteItemInterface> = ({ link, title, text, description, imageLink }) => {
  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault()
    router.push(link);
  }
  return (
    <a href={link} onClick={handleClick} >
      {text}
    </a>
  );
};

export default Link;