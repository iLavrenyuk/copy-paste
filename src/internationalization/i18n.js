import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      Copy: 'Copy',
      Paste: 'Paste',
      'Not found any data': 'Not found any data',
      'copy result': 'Copy result',
      COPY: 'COPY',
      Copied: 'Copied',
      'Not found': 'Not found',
      Create: 'Create',
      SAVE: 'SAVE',
      delete: 'Delete',
      name: 'name',
      value: 'value',
      'Set my params': 'Set my params',
      'Generate short link': `Generate short link \n (for instagram example)`,
      Open: 'Open',
      Close: 'Close',
      'access token': 'access token',
      '1 link as a gift': '1 link as a gift',
      'Your link': 'Your link',
      'Does not exist': 'Does not generate',
      Error: 'Error',
      Generate: 'Generate',
      'Generate yourself': 'Generate yourself',
      'Volunteer project': `This is Volunteer project \nIf you have ideas, contact me`,
      'Contact me by': 'Contact me by',
      Result: 'Result',
      Visit: 'Visit',
      'Final result': 'Final result',
      Back: 'Go back',
    },
  },
  ua: {
    translation: {
      Copy: 'Копі',
      Paste: 'Паста',
      'Not found any data': 'Ніяких данних не знайдено',
      'copy result': 'Копіювати результат',
      COPY: 'Копіювати',
      Copied: 'Скопійовано',
      'Not found': 'Не знайдено',
      Create: 'Створити',
      SAVE: 'Зберегти',
      delete: 'Видалити',
      name: 'нейм',
      value: 'значення',
      'Set my params': 'Встановити мої параметри',
      'Generate short link': `Згенерувати коротку лінку \n (для інстаграму наприклад)`,
      Open: 'Відкрити',
      Close: 'Закрити',
      'access token': 'Токен доступу',
      '1 link as a gift': '1 посилання в подарунок',
      'Your link': 'Ваш лінк',
      'Does not exist': 'Не згенерована',
      Error: 'Помилка',
      Generate: 'Згенерувати',
      'Generate yourself': 'Згенерувати самому',
      'Volunteer project': `Це волонтерський проект \nЯкщо у вас є ідеї, зв'яжіться зі мною`,
      'Contact me by': 'Звязатись зі мною',
      Result: 'Результат',
      Visit: 'Перейти',
      'Final result': 'Фінальний результат',
      Back: 'Повернутись назад',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ua', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
