import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip: move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "adminPanel": "Admin Panel",
      "enterEmail": "Enter the correct email to access the admin panel.",
      "adminEmail": "Admin Email",
      "placeholderEmail": "admin@example.com",
      "invalidEmail": "Invalid email. Please try again.",
      "login": "Login",
      "loginTitle": "Login to Admin Panel",
      "loginDescription": "Enter the correct email to access the admin panel.",
      "email": "Email",
      "loginTitle": "Login to Admin Panel",
      "loginDescription": "Enter the correct email to access the admin panel.",
      "email": "Email",
      "name": "Name",
      "teacher": "Teacher/Responsible",
      "type": "Type",
      "actions": "Actions",
      "edit": "Edit",
      "delete": "Delete",
      "confirmDelete": "Delete this item?",
      "welcome": "Welcome! 👋",
      "description": "This is a simple and convenient application for managing the list of users. Add, edit and search for the necessary people in a couple of clicks.",
      "goToList": "Go to list",
      "addNew": "Add new",
      "usersList": "Users List",
      "addUser": "Add User",
      "editUser": "Edit User",
      "userDetails": "User Details",
      "save": "Save",
      "cancel": "Cancel",
      "notFound": "Page Not Found",
      "backToHome": "Back to Home",
      "sidebar": "Sidebar"
    }
  },
  ru: {
    translation: {
      "adminPanel": "Панель администратора",
      "enterEmail": "Введите корректный email, чтобы получить доступ к админ-панели.",
      "adminEmail": "Email администратора",
      "placeholderEmail": "admin@example.com",
      "invalidEmail": "Неверный email. Попробуйте снова.",
      "login": "Войти",
      "loginTitle": "Вход в админ-панель",
      "loginDescription": "Введите правильный email, чтобы получить доступ к панели администратора.",
      "email": "Email",
      "name": "Название",
      "teacher": "Учитель/Ответственный",
      "type": "Тип",
      "actions": "Действия",
      "edit": "Редактировать",
      "delete": "Удалить",
      "confirmDelete": "Удалить этот предмет?",
      "welcome": "Добро пожаловать! 👋",
      "description": "Это простое и удобное приложение для управления списком пользователей. Добавляйте, редактируйте и ищите нужных людей в пару кликов.",
      "goToList": "Перейти к списку",
      "addNew": "Добавить нового",
      "usersList": "Список пользователей",
      "addUser": "Добавить пользователя",
      "editUser": "Редактировать пользователя",
      "userDetails": "Детали пользователя",
      "save": "Сохранить",
      "cancel": "Отмена",
      "notFound": "Страница не найдена",
      "backToHome": "Вернуться на главную",
      "sidebar": "Боковая панель"
    }
  },
  uz: {
    translation: {
      "adminPanel": "Admin Paneli",
      "enterEmail": "Admin paneliga kirish uchun to'g'ri emailni kiriting.",
      "adminEmail": "Admin Email",
      "placeholderEmail": "admin@example.com",
      "invalidEmail": "Noto'g'ri email. Qayta urinib ko'ring.",
      "login": "Kirish",
      "loginTitle": "Admin Paneliga Kirish",
      "loginDescription": "Admin paneliga kirish uchun to'g'ri emailni kiriting.",
      "email": "Email",
      "name": "Nomi",
      "teacher": "O'qituvchi/Mas'ul",
      "type": "Turi",
      "actions": "Harakarlar",
      "edit": "Tahrirlash",
      "delete": "O'chirish",
      "confirmDelete": "Bu elementni o'chirmoqchimisiz?",
      "welcome": "Xush kelibsiz! 👋",
      "description": "Bu foydalanuvchilar ro'yxatini boshqarish uchun oddiy va qulay dastur. Kerakli odamlarni qo'shing, tahrirlang va bir necha bosishda qidiring.",
      "goToList": "Ro'yxatga o'tish",
      "addNew": "Yangi qo'shish",
      "usersList": "Foydalanuvchilar Ro'yxati",
      "addUser": "Foydalanuvchi Qo'shish",
      "editUser": "Foydalanuvchi Tahrirlash",
      "userDetails": "Foydalanuvchi Tafsilotlari",
      "save": "Saqlash",
      "cancel": "Bekor qilish",
      "notFound": "Sahifa Topilmadi",
      "backToHome": "Uyga qaytish",
      "sidebar": "Yon panel"
    }
  }
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: 'ru', // language to use, more info here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already does escaping
    }
  });

export default i18n;