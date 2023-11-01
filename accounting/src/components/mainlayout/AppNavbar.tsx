import React from "react";

const AppNavbar = ({ toggleDrawer, open }) => {
  return (
    <>
      <div className="bg-gray-100">
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={toggleDrawer}
            className={`px-2 py-1 rounded-lg bg-blue-500 text-white`}
          >
            Menu
          </button>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center">1</div>
        </div>
      </div>
      <div className="p-4 bg-gray-100">
        <div className="max-w-7xl mx-auto mt-4">test</div>
      </div>
    </>
  );
};

export default AppNavbar;
