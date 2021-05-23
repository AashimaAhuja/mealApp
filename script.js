// import { APIS } from './constants';

(function() {
  const inputSearch = window.search_input;
  const btnSearch = window.search_btn;
  const mealList = window.meals_list;
  const mealDetails = window.meal_details;

  const mealItemTmplate = document.querySelector('#meal_item_tmpl');
  const mealDetailsTmpl = document.querySelector('#meal_details_tmpl');

  const SEARCH_MEAL_BY_NAME =
    'https://www.themealdb.com/api/json/v1/1/search.php';

  let mealDataObj = {};

  async function searchMeal(e) {
    const inputValue = inputSearch.value;
    const response = await fetch(`${SEARCH_MEAL_BY_NAME}?s=${inputValue}`);
    const data = await response.json();

    mealDataObj = {};
    data.meals.forEach(meal => {
      mealDataObj[meal.idMeal] = meal;
    });
    console.log(mealDataObj);

    renderMeals(data.meals);
  }

  function renderMeals(data) {
    mealList.innerHTML = '';
    data &&
      data.forEach(({ strMealThumb, strMeal, idMeal }) => {
        const eleMealItem = mealItemTmplate.content.cloneNode(true);

        eleMealItem.querySelector('ul').dataset.id = idMeal;
        eleMealItem.querySelector('img').setAttribute('src', strMealThumb);
        eleMealItem.querySelector('h3').innerText = strMeal;

        mealList.appendChild(eleMealItem);
      });
  }

  function renderMealDetails(e) {
    const eleDetails = mealDetailsTmpl.content.cloneNode(true);
    const id = e.target.closest('.meal_item').dataset.id;
    eleImg = eleDetails.querySelector('img');

    console.log(id);

    const mealData = mealDataObj[id];
    const {
      strMeal,
      strMealThumb,
      strCategory,
      strArea,
      strInstructions
    } = mealData;

    const ingredients = Object.keys(mealData)
      .filter(el => el.startsWith('strIngredient'))
      .map(el => mealData[el]);

    console.log(ingredients);

    // eleDetails.querySelector('img').setAttribute('src', mealData.strMealThumb);
    eleImg.src = strMealThumb;
    mealDetails.appendChild(eleDetails);
  }

  function updateInput(e) {
    inputSearch.setAttribute('value', e.target.value);
  }

  mealList.addEventListener('click', renderMealDetails);
  inputSearch.addEventListener('change', updateInput);
  btnSearch.addEventListener('click', searchMeal);
})();
