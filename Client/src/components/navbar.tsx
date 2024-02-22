import React, { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="border-2 p-2 text-white bg-black  md:flex-col md:justify-between">
      <div className="md:hidden">
        <button onClick={toggleMenu}>☰ Menu</button>
      </div>
      <div className={`md:flex ${isMenuOpen ? 'flex flex-col w-[100vw] z-40' : 'hidden'}`}>
        <a>item1</a>
        <a>item2</a>
        <a>item3</a>
        <a>item4</a>
        <a>item5</a>
        <a>item6</a>
        <a>item7</a>
        <a>item8</a>
        <a>item9</a>
        <a>item10</a>
        <a>item11</a>
        <a>item12</a>
      </div>
    </div>
  );
}

export default Navbar;
