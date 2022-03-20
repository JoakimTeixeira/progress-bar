import { GroupsContext } from 'contexts/GroupsContext';
import { ReactElement, useContext } from 'react';
import './ProgressBar.css';

export const ProgressBar = (): ReactElement => {
  const { currentPercentage } = useContext(GroupsContext);

  return (
    <div className="progress-bar-container">
      {currentPercentage !== 0 && (
        <div
          className="progress-bar-text"
          style={{
            height: '24px',
            width: `${currentPercentage}%`,
            backgroundColor: currentPercentage !== 0 ? '#00b797' : 'initial',
          }}
        >
          {`${currentPercentage}%`}
        </div>
      )}
    </div>
  );
};
