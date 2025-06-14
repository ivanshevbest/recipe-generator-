document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#recipe-generator-form");
    const recipesContainer = document.querySelector("#recipes-container");
    const resultSection = document.querySelector("#result-section");

    form.addEventListener("submit", event => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        // Получаем данные из формы
        const ingredientsInput = document.querySelector("#ingredients-input").value.trim().split(',');
        const categoryRadioButtons = document.querySelectorAll('input[name="category"]');
        let selectedCategory = null;

        // Проверяем выбранную категорию
        categoryRadioButtons.forEach(button => {
            if (button.checked) {
                selectedCategory = button.value;
            }
        });

        // Проверьте, что поля заполнены
        if (!selectedCategory || !ingredientsInput.length) {
            alert("Заполните форму полностью.");
            return;
        }

        // Массивы рецептов для каждой категории
        const holidayTableRecipes = [{
            title: 'Новогодний салат',
            ingredients: ['Куриная грудка', 'Яблоко зелёное', 'Майонез'],
            steps: ['Натрите яблоки.', 'Отварите курицу.', 'Соберите салат слоями.']
        }, {
            title: 'Рулетики из лаваша',
            ingredients: ['Лаваш тонкий', 'Творожный сыр', 'Зелёный горошек'],
            steps: ['Намажьте лаваш творожным сыром.', 'Посыпьте горошком.', 'Заверните рулетиком и запеките.']
        }, {
            title: 'Фаршированные перцы',
            ingredients: ['Перец болгарский', 'Рис отварной', 'Фарш свино-говяжий'],
            steps: ['Промойте перцы и удалите сердцевину.', 'Заполните фаршем с рисом.', 'Запеките в духовке.']
        }];

        const everydayTableRecipes = [{
            title: 'Простая паста карбонара',
            ingredients: ['Спагетти', 'Яйцо', 'Панчетта (бекон)', 'Пармиджано Реджано'],
            steps: ['Отварите спагетти.', 'Обжарьте панчетту.', 'Сделайте соус из яиц и сыра.', 'Все перемешайте.']
        }, {
            title: 'Гороховый суп-пюре',
            ingredients: ['Горох сушёный', 'Картофель', 'Лук репчатый'],
            steps: ['Замочите горох заранее.', 'Проварите все ингредиенты.', 'Пюрируйте смесь блендером.']
        }, {
            title: 'Тушёная капуста с сосисками',
            ingredients: ['Капуста белокочанная', 'Сосиски', 'Растительное масло'],
            steps: ['Обжарьте капусту.', 'Добавьте сосиски.', 'Доведите до готовности.']
        }];

        const fastCookingRecipes = [{
            title: 'Яичница-глазунья',
            ingredients: ['Яйца куриные', 'Сливочное масло'],
            steps: ['Растопите масло.', 'Аккуратно разбейте яйцо.', 'Жарьте до нужной степени прожарки.']
        }, {
            title: 'Хрустящие бутерброды',
            ingredients: ['Хлеб белый', 'Сыр твёрдый', 'Сливочное масло'],
            steps: ['Натрите хлеб маслом.', 'Посыпьте сыром.', 'Запеките в духовке.']
        }, {
            title: 'Омлет с колбасой',
            ingredients: ['Яйца', 'Колбаса варёная', 'Соль'],
            steps: ['Взбейте яйца.', 'Нарежьте колбасу.', 'Обжарьте всё вместе.']
        }];

        const meatyDishesRecipes = [{
            title: 'Запечённая свинина с картофелем',
            ingredients: ['Свинина', 'Картофель', 'Соль, специи'],
            steps: ['Нарезанные ломтики картофеля уложите на противень.', 'Сверху положите куски свинины.', 'Запекайте в духовке.']
        }, {
            title: 'Свиные отбивные',
            ingredients: ['Свинина (окорок)', 'Яйцо', 'Панировочные сухари'],
            steps: ['Отбейте мясо.', 'Обмакните в яйцо и сухари.', 'Обжарьте до золотистой корочки.']
        }, {
            title: 'Плов домашний',
            ingredients: ['Рис длиннозёрный', 'Мясо баранина/свинина', 'Морковь', 'Лук репчатый'],
            steps: ['Обжарьте мясо.', 'Добавьте морковь и лук.', 'Закиньте промытый рис, залейте водой и тушите.']
        }];

        const vegetableDishesRecipes = [{
            title: 'Овощное рагу',
            ingredients: ['Кабачки', 'Цветная капуста', 'Картофель', 'Морковь'],
            steps: ['Обжарьте мелко нарезанные овощи.', 'Добавьте воду.', 'Тушите до мягкости овощей.']
        }, {
            title: 'Овощи гриль',
            ingredients: ['Перец сладкий', 'Кабачки', 'Помидор черри', 'Оливковое масло'],
            steps: ['Маринуйте овощи в оливковом масле.', 'Запеките на гриле.', 'Посолите и подавайте горячим.']
        }, {
            title: 'Салат греческий',
            ingredients: ['Помидоры', 'Огурцы', 'Красный лук', 'Сыр фета'],
            steps: ['Нарежьте овощи.', 'Посыпьте сыром.', 'Заправьте оливковым маслом и лимонным соком.']
        }];

        // Выбор подходящего рецепта согласно выбранной категории
        let availableRecipes = [];
        switch (selectedCategory) {
            case 'holiday-table': availableRecipes = holidayTableRecipes; break;
            case 'everyday-table': availableRecipes = everydayTableRecipes; break;
            case 'fast-cooking': availableRecipes = fastCookingRecipes; break;
            case 'meaty-dishes': availableRecipes = meatyDishesRecipes; break;
            case 'vegetable-dishes': availableRecipes = vegetableDishesRecipes; break;
            default: console.error('Ошибка определения категории'); break;
        }

        // Случайно выбираем три рецепта
        const randomRecipes = availableRecipes.sort(() => Math.random() - 0.5).slice(0, 3);

        // Очищаем контейнер результатов
        recipesContainer.innerHTML = '';

        // Создаем каждый рецепт
        randomRecipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';

            const title = document.createElement('h3');
            title.textContent = recipe.title;
            recipeCard.appendChild(title);

            const ingredientsList = document.createElement('ul');
            recipe.ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = ingredient;
                ingredientsList.appendChild(li);
            });
            recipeCard.appendChild(ingredientsList);

            const stepsList = document.createElement('ol');
            recipe.steps.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                stepsList.appendChild(li);
            });
            recipeCard.appendChild(stepsList);

            recipesContainer.appendChild(recipeCard);
        });

        // Показываем результат
        resultSection.style.display = "block";
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#recipe-generator-form");
    const recipesContainer = document.querySelector("#recipes-container");
    const resultSection = document.querySelector("#result-section");

    form.addEventListener("submit", event => {
        event.preventDefault(); 
    
    });
});
