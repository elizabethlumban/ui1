import * as React from "react";

interface IProps {
  link: string;
}

const Link1 = ({ link }: IProps) => {
  const redirect = () => {
    console.log("redirect");
  };

  return (
    <a
      onClick={() => {
        redirect();
      }}
      href={link}
    >
      {link}
    </a>
  );
};

export default Link1;
