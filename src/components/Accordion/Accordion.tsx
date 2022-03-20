import { ReactComponent as ArrowIcon } from 'assets/ArrowIcon.svg';
import { ReactComponent as GroupIcon } from 'assets/GroupIcon.svg';
import { CheckboxList } from 'components/CheckboxList';
import { GroupsContext } from 'contexts/GroupsContext';
import { IPanelData } from 'interfaces/panel';
import { MouseEvent, ReactElement, useContext, useRef } from 'react';
import './Accordion.css';

export const Accordion = (): ReactElement => {
  const { usersGroups } = useContext(GroupsContext);
  const isOpened = useRef<boolean>(false);
  const panelElement = useRef<HTMLElement>();

  const getPanelProperties = (accordion: HTMLElement): IPanelData => {
    panelElement.current = accordion.nextElementSibling as HTMLElement;

    return {
      element: panelElement.current,
      scrollHeight: panelElement.current.scrollHeight,
      scrollWidth: panelElement.current.scrollWidth,
    };
  };

  // Fixes accordion height when scroll shows in the page and causes width changes
  const handleAccordionHeightWithScroll = (accordion: HTMLElement): void => {
    const accordionWidth = accordion.scrollWidth;

    setTimeout(() => {
      const { element, scrollHeight, scrollWidth } = getPanelProperties(accordion);
      const isDifferentWidth = accordionWidth !== scrollWidth;

      if (isDifferentWidth) {
        element.style.maxHeight = `${scrollHeight}px`;
      }
    }, 200);
  };

  const toggleActive = (accordion: HTMLElement): void => {
    if (accordion) {
      accordion.classList.toggle('active');
      isOpened.current = !isOpened.current;
    }
  };

  const toggleTitle = (accordion: HTMLElement): void => {
    const title = accordion.querySelector('.expand-title');

    if (title?.textContent === 'Hide') {
      title.textContent = 'Show';
    } else if (title?.textContent === 'Show') {
      title.textContent = 'Hide';
    }
  };

  const toggleIcon = (accordion: HTMLElement): void => {
    const icon = accordion.querySelector('.expand-icon');
    icon?.classList.toggle('arrow-up');
  };

  const togglePanelHeight = (accordion: HTMLElement): void => {
    const { element, scrollHeight } = getPanelProperties(accordion);

    if (element.style.maxHeight) {
      element.style.maxHeight = '';
    } else {
      element.style.maxHeight = `${scrollHeight}px`;
      handleAccordionHeightWithScroll(accordion);
    }
  };

  const handleToggle = (event: MouseEvent<HTMLElement>): void => {
    const accordion = event.currentTarget;

    toggleActive(accordion);
    toggleTitle(accordion);
    toggleIcon(accordion);
    togglePanelHeight(accordion);
  };

  return (
    <div>
      {usersGroups &&
        usersGroups.map((group) => {
          const { id, name, tasks } = group;

          return (
            <ul key={id}>
              <li>
                <button
                  type="button"
                  className="accordion"
                  onClick={(event) => handleToggle(event)}
                >
                  <div className="accordion-info">
                    <GroupIcon width="16px" height="16px" />
                    <span className="accordion-title">{name}</span>
                  </div>

                  <div className="accordion-expand">
                    <span className="expand-title">Show</span>
                    <ArrowIcon className="expand-icon" />
                  </div>
                </button>
                <div className="panel">
                  <div className="panel-content">{tasks && <CheckboxList tasks={tasks} />}</div>
                </div>
              </li>
            </ul>
          );
        })}
    </div>
  );
};
