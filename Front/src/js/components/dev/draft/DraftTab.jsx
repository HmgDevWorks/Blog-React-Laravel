import React from 'react';
import './DraftTab.css';
import Editor from '../editor/Editor';

export default function DraftTab ({ tabs }) {
    return (
      <div role="tablist" className="tabs tabs-lifted draft-tabs">
      {tabs.map((tab, index) => (
        <React.Fragment key={index}>
        <input
          type="radio"
          name="my_drafts"
          role="tab"
          className="tab"
          aria-label={tab.title.substring(0,25)}
          defaultChecked={index === 0}
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <p>{tab.content.substring(0, 600)}</p>
          {/* <Editor isEditable={false} postText={tab.content.substring(0, 600)} /> */}
        </div>
        </React.Fragment>
      ))}
      </div>
    );
  };