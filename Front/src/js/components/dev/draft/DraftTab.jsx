import React from 'react';
import './DraftTab.css';

export default function DraftTab ({ tabs }) {
    return (
      <div role="tablist" className="tabs tabs-lifted">
      {tabs.map((tab, index) => (
        <React.Fragment key={index}>
        <input
          type="radio"
          name="my_tabs"
          role="tab"
          className="tab"
          aria-label={`Tab ${index + 1}`}
          defaultChecked={index === 0}
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <p>{tab.content.substring(0, 600)}</p>
        </div>
        </React.Fragment>
      ))}
      </div>
    );
  };