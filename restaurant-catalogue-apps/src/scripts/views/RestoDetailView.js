import RestoBaseView from './RestoBaseView';

export default class RestoDetailView extends RestoBaseView {
  constructor(restoDetailPage) {
    super(restoDetailPage);
    this._restoDetailPage = restoDetailPage;

    this._handleInputReview();
  }

  bindClickFavoriteButton(handler) {
    this._restoDetailPage.addEventListener('click-favorite', (event) => {
      const { dataResto } = event.detail;
      handler(dataResto);
    });
  }

  bindSubmitReview(handler) {
    this._restoDetailPage.addEventListener('submit-review', (event) => {
      const { inputEl, bodyEl, formEl, validationMessageBody, validationMessageInput } =
        event.detail;

      const isNameValid = this._validateInput(inputEl, validationMessageInput);
      const isBodyValid = this._validateInput(bodyEl, validationMessageBody);

      if (!isNameValid || !isBodyValid) {
        return;
      }

      const reviewData = {
        name: inputEl.value,
        review: bodyEl.value,
      };
      handler(reviewData);
      formEl.reset();
    });
  }

  renderFavoriteButton(favoriteBtn, favorited) {
    let svgIcon = favoriteBtn.querySelector('svg');
    let textSpan = favoriteBtn.querySelector('span');

    if (!svgIcon) {
      svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      favoriteBtn.prepend(svgIcon); // Tambahkan ke tombol
    }
    if (!textSpan) {
      textSpan = document.createElement('span');
      favoriteBtn.appendChild(textSpan);
    }

    if (favorited) {
      svgIcon.setAttribute('viewBox', '0 0 512 512');
      svgIcon.setAttribute('aria-hidden', 'true');
      svgIcon.setAttribute('focusable', 'false');
      svgIcon.innerHTML = `<path d="M417.84 448a16 16 0 01-11.35-4.72l-365.84-368a16 16 0 1122.7-22.56l365.83 368A16 16 0 01417.84 448zM364.92 80c-44.09 0-74.61 24.82-92.39 45.5a6 6 0 01-9.06 0C245.69 104.82 215.16 80 171.08 80a107.71 107.71 0 00-31 4.54l269.13 270.7c3-3.44 5.7-6.64 8.14-9.6 40-48.75 59.15-98.79 58.61-153C475.37 130.53 425.54 80 364.92 80zM69 149.15a115.06 115.06 0 00-9 43.49c-.54 54.21 18.63 104.25 58.61 153 18.77 22.87 52.8 59.45 131.39 112.8a31.88 31.88 0 0036 0c20.35-13.82 37.7-26.5 52.58-38.12z"/>`;
      textSpan.textContent = 'Unfavorite';
    } else {
      svgIcon.setAttribute('viewBox', '0 0 512 512');
      svgIcon.setAttribute('aria-hidden', 'true');
      svgIcon.setAttribute('focusable', 'false');
      svgIcon.innerHTML = `<path d="M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z"/>`;
      textSpan.textContent = 'Favorite';
    }

    favoriteBtn.setAttribute('aria-pressed', favorited);
    favoriteBtn.setAttribute(
      'aria-label',
      favorited ? 'Unfavorite this restaurant' : 'Favorite this restaurant',
    );
  }

  renderCategories(categoryListEl, categories = []) {
    categoryListEl.innerHTML = '';

    if (categories.length > 0) {
      categories?.forEach((category) => {
        const li = document.createElement('li');
        li.textContent = category.name;
        categoryListEl.appendChild(li);
      });
    }
  }

  renderMenus(menusEl, menus = { foods: [], drinks: [] }) {
    if (!menus || !menus.foods || !menus.drinks) return;

    const [foodMenuEl, drinkMenuEl] = menusEl;

    foodMenuEl.innerHTML = '';
    drinkMenuEl.innerHTML = '';

    menus?.foods?.forEach((food) => {
      const foodItem = document.createElement('li');
      foodItem.textContent = `- ${food.name}`;
      foodMenuEl.appendChild(foodItem);
    });

    menus?.drinks?.forEach((drink) => {
      const drinkItem = document.createElement('li');
      drinkItem.textContent = `- ${drink.name}`;
      drinkMenuEl.appendChild(drinkItem);
    });
  }

  renderCustomerReview(reviewsEl, reviews = []) {
    reviewsEl.innerHTML = '';

    if (reviews.length > 0) {
      const table = document.createElement('table');
      table.classList.add('review__table');

      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
        <th>Name</th>
        <th>Review</th>
        <th>Date</th>
      `;
      table.appendChild(headerRow);

      reviews.forEach(({ name, review, date }, index) => {
        const row = document.createElement('tr');
        row.classList.add('review__row');

        if (index % 2 !== 0) {
          row.classList.add('review__row-odd');
        }

        row.innerHTML = `
          <td>${name}</td>
          <td>${review}</td>
          <td>${date}</td>
        `;
        table.appendChild(row);
      });

      reviewsEl.appendChild(table);
    } else {
      const noReviewsElement = document.createElement('p');
      noReviewsElement.classList.add('review__item-empty');
      noReviewsElement.textContent = 'No reviews available.';
      reviewsEl.appendChild(noReviewsElement);
    }
  }

  _handleInputReview() {
    this._restoDetailPage.addEventListener('input-review', (event) => {
      const { element, validationMessageElement } = event.detail;
      this._validateInput(element, validationMessageElement);
    });
  }

  _validateInput(element, validationMessageElement) {
    const value = element.value.trim();

    const elementName = element.id === 'reviewName' ? 'Name' : 'Body';

    const errorMessage = this._checkingValidationInput(value, element, elementName);

    validationMessageElement.textContent = errorMessage;

    this._clearValidation(errorMessage, element, validationMessageElement);

    return !errorMessage;
  }

  _clearValidation(errorMessage, element, validationMessageElement) {
    if (errorMessage) {
      validationMessageElement.classList.add('visible');
      element.setAttribute('aria-invalid', 'true');
      element.style.outlineColor = '#ff6b6b';
    } else {
      validationMessageElement.classList.remove('visible');
      element.removeAttribute('aria-invalid');
      element.style.outlineColor = '';
    }
  }

  _checkingValidationInput(value, element, elementName) {
    let errorMessage = '';

    switch (true) {
      case !value:
        errorMessage = `${elementName} cannot be empty.`;
        break;

      case value.length < 3 && (element.name === 'reviewName' || element.name === 'reviewBody'):
        errorMessage = `${elementName} must be at least 3 characters long.`;
        break;

      case element.name === 'reviewName' && /^[^\w]/.test(value):
        errorMessage = 'Name cannot start with a symbol.';
        break;

      default:
        errorMessage = '';
    }

    return errorMessage;
  }
}
