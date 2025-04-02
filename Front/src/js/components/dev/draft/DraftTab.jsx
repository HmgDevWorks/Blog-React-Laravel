import React from 'react';
import './DraftTab.css';
import Editor from '../Editor/Editor';
import { Fragment } from 'react';

export default function DraftTab({ tabs }) {

  return (
    <div role="tablist" className="tabs tabs-lifted draft-tabs">
      {tabs.slice(0, 10).map((tab, index) => (
        <Fragment key={index}>
          <input
            type="radio"
            name="my_drafts"
            role="tab"
            className="tab"
            aria-label={tab.title.substring(0, 25)}
            defaultChecked={index === 0}
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <Editor post={tab} />
          </div>
        </Fragment>
      ))}
    </div>
  );
};