import { DomHandlerNestedSelectors } from '../../utils/DomHandlerNestedSelectors';
import RestoBaseView from './RestoBaseView';

class DropdownManager {
  activeIndex = null;

  constructor(elements) {
    this._elements = elements;
    this._handleOutsideDropdownClick = this._handleDropdownFocusOut.bind(this);
  }

  toggleDropdown() {
    const { filterButton, filterWrapper } = this._elements;

    const isExpanded = filterButton.getAttribute('aria-expanded') === 'true';

    filterButton.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    filterWrapper.classList.toggle('active');

    if (isExpanded) {
      filterWrapper.removeEventListener('focusout', this._handleOutsideDropdownClick);
    } else {
      setTimeout(() => {
        filterWrapper.addEventListener('focusout', this._handleOutsideDropdownClick);
      });
      filterButton.focus();
    }

    if (isExpanded) {
      this.activeIndex = null;
    }
  }

  handleSelectedOption() {
    const { searchBar, optionLists, filterLabel, filterButton, filterWrapper } = this._elements;

    const selectedValue = optionLists[this.activeIndex].dataset.value;
    const contentOfSelectedValue = optionLists[this.activeIndex].textContent.trim();

    if (selectedValue === 'all') searchBar.value = '';

    const shortLabels = {
      all: 'All Restaurants',
      4: '4+ ⭐',
      3: '3+ ⭐',
      2: '≤2 ⭐',
    };

    filterLabel.textContent = shortLabels[selectedValue];
    filterButton.setAttribute('aria-expanded', 'false');
    filterWrapper.classList.remove('active');

    return { selectedValue, contentOfSelectedValue };
  }

  highlightActiveOption() {
    const { optionLists, filterDropdown } = this._elements;

    optionLists.forEach((option, index) => {
      option.setAttribute('tabindex', index === this.activeIndex ? '0' : '-1');
    });
    optionLists[this.activeIndex].focus();
    filterDropdown.setAttribute('aria-activedescendant', optionLists[this.activeIndex].id);
  }

  filterLabelResetContent() {
    this._elements.filterLabel.textContent = 'filter';
  }

  _handleDropdownFocusOut(event) {
    const { filterWrapper, filterButton } = this._elements;

    const isFocusInside =
      filterWrapper.contains(event.relatedTarget) || filterButton.contains(event.relatedTarget);

    if (!isFocusInside) {
      filterButton.setAttribute('aria-expanded', 'false');
      filterWrapper.classList.remove('active');
      this.activeIndex = null;
    }
  }
}

export default class RestoListView extends RestoBaseView {
  constructor(restoListPage) {
    super(restoListPage);
    this._restoListPage = restoListPage;
    this._elements = new DomHandlerNestedSelectors(
      restoListPage.shadowRoot,
      {
        searchBar: '#searchBar',
        filterWrapper: '#filterWrapper',
        filterButton: '#filterRating',
        filterLabel: '#filterLabel',
        filterDropdown: '#filterDropdown',
        optionLists: (root) =>
          root.getElementById('filterDropdown').querySelectorAll("[role='option']"),
      },
      true,
    ).elements;
    this._dropdownManager = new DropdownManager(this._elements);

    this._startListening();
  }

  bindSearchInput(handler) {
    this._restoListPage.addEventListener('search-restaurant', (event) => {
      this.currentIndex = 0;

      const { query } = event.detail;
      handler(query);
      this._dropdownManager.filterLabelResetContent();
    });
  }

  bindFilterSelection(handler) {
    this._restoListPage.addEventListener('click-option', (event) => {
      const { index } = event.detail;

      this._dropdownManager.activeIndex = index;
      const { selectedValue, contentOfSelectedValue } =
        this._dropdownManager.handleSelectedOption();
      handler(selectedValue, contentOfSelectedValue);
    });
  }

  bindKeyboardNavigation(handler) {
    this._restoListPage.addEventListener('dropdown-keyboard-navigation', (event) => {
      const { key } = event.detail;

      if (key !== 'ArrowDown' && key !== 'ArrowUp' && key !== 'Enter' && key !== 'Escape') {
        return;
      }

      const { filterButton, filterWrapper, optionLists } = this._elements;

      switch (key) {
        case 'ArrowDown': {
          if (this._dropdownManager.activeIndex === null) {
            this._dropdownManager.activeIndex = 0;
          } else {
            this._dropdownManager.activeIndex =
              (this._dropdownManager.activeIndex + 1) % optionLists.length;
          }
          this._dropdownManager.highlightActiveOption();
          break;
        }
        case 'ArrowUp': {
          if (this._dropdownManager.activeIndex === null) {
            this._dropdownManager.activeIndex = optionLists.length - 1;
          } else {
            this._dropdownManager.activeIndex =
              (this._dropdownManager.activeIndex - 1 + optionLists.length) % optionLists.length;
          }
          this._dropdownManager.highlightActiveOption();
          break;
        }
        case 'Enter': {
          const { selectedValue, contentOfSelectedValue } =
            this._dropdownManager.handleSelectedOption();
          handler(selectedValue, contentOfSelectedValue);
          break;
        }
        case 'Escape':
          filterButton.setAttribute('aria-expanded', 'false');
          filterWrapper.classList.remove('active');
          this._dropdownManager.activeIndex = null;
          filterButton.focus();
      }
    });
  }

  _startListening() {
    this._restoListPage.addEventListener(
      'click-filter-btn',
      this._handleFilterButtonClick.bind(this),
    );
  }

  _handleFilterButtonClick() {
    this.currentIndex = 0;
    this._dropdownManager.toggleDropdown();
  }
}
