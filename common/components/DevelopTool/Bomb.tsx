import React from 'react';

function Bomb() {
  const [explode, setExplode] = React.useState(false);

  if (explode) {
    throw new Error('💥 CABOOM 💥');
  }

  return (
    <div className="flex justify-center bg-gray-100">
      <button
        className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
        onClick={() => setExplode(true)}
      >
        Bomb
      </button>
    </div>
  );
}

export default Bomb;
