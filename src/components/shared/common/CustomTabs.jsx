import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./customTab.css";

const CustomTabs = ({ tabs, defaultTab,tabName }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get(tabName);

  useEffect(() => {
    const isValidTab = tabs.some(tab => tab.tabName === activeTab);

    if (!isValidTab) {
      navigate(`?active=${defaultTab}`);
    }
  }, [tabs, activeTab, defaultTab, navigate]);

  return (
    <div className="setting-navigation-btn">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`navigation-btn  ${tab.tabName === activeTab ? 'active-btn' : ''}`}
          onClick={() => navigate(`?active=${tab.tabName}`)}
        >
          {tab.buttonText}
        </button>
      ))}
    </div>
  );
}

export default CustomTabs;
