import axios from 'axios';
import React, { MouseEvent, useEffect, useState } from 'react';
import { ReactComponent as GroupIcon } from 'assets/GroupIcon.svg';
import { ReactComponent as ArrowIcon } from 'assets/ArrowIcon.svg';
import './Accordion.css';

type TaskData = {
  description: string;
  value: number;
  checked: boolean;
};

interface IGroupData {
  name: string;
  tasks: TaskData[];
}

export function Accordion() {
  const [group, setGroup] = useState<IGroupData[]>([]);
  const [isOpened, setOpened] = useState(false);

  useEffect(() => {
    axios
      .get(
        'https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/508f46dbf6535f830aa92cf97359853c5700bab1/mock-progress'
      )
      .then((response) => {
        setGroup(response.data);
      });
  }, []);

  const updateTitle = (accordion: HTMLElement): void => {
    const accordionTitle = accordion.querySelector('.expand-title');

    if (accordionTitle?.textContent === 'Hide') {
      accordionTitle.textContent = 'Show';
    } else if (accordionTitle?.textContent === 'Show') {
      accordionTitle.textContent = 'Hide';
    }
  };

  const updateArrow = (accordion: HTMLElement): void => {
    const accordionArrow = accordion.querySelector('.expand-icon');
    accordionArrow?.classList.toggle('arrow-up');
  };

  const updatePanelHeight = (accordion: HTMLElement): void => {
    if (accordion) {
      accordion.classList.toggle('active');
      setOpened(!isOpened);
    }

    const panel = accordion.nextElementSibling as HTMLElement;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = '';
    } else {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  };

  const handleToggle = (event: MouseEvent<HTMLElement>): void => {
    const accordion = event.currentTarget;

    updateTitle(accordion);
    updateArrow(accordion);
    updatePanelHeight(accordion);
  };

  return (
    <div>
      {group &&
        group.map((item) => (
          <ul key={item.name}>
            <li>
              <button type="button" className="accordion" onClick={(event) => handleToggle(event)}>
                <div className="accordion-info">
                  <GroupIcon width="16px" height="16px" />
                  <span className="accordion-title">{item.name}</span>
                </div>

                <div className="accordion-expand">
                  <span className="expand-title">Show</span>
                  <ArrowIcon className="expand-icon" />
                </div>
              </button>
              <div className="panel">
                <p className="panel-content">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </li>
          </ul>
        ))}
    </div>
  );
}
