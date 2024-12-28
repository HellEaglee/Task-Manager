import React from "react";

interface TabNavProps {
  tabs: number;
  setTabs: React.Dispatch<React.SetStateAction<number>>;
}

const TabNav: React.FC<TabNavProps> = ({ tabs, setTabs }) => {
  const tabItems = [
    { label: "All", value: 0 },
    { label: "Favorites", value: 1 },
    { label: "Archives", value: 2 },
  ];

  function handleTabClick(value: number) {
    setTabs(value);
  }

  return (
    <div className="flex w-[43.75rem] gap-16 border-b-[0.0625rem] border-gray">
      {tabItems.map((tab) => (
        <div
          key={tab.value}
          className={`${
            tabs === tab.value
              ? "text-graywhite border-b-[0.125rem] border-primary"
              : "text-graysilver"
          } px-4 cursor-pointer`}
          onMouseUp={() => handleTabClick(tab.value)}
        >
          <p className="text-xl font-semibold">{tab.label}</p>
        </div>
      ))}
    </div>
  );
};

export default TabNav;
