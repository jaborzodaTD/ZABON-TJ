/* ==========================================================================
   ZABON LANGUAGE ACADEMY — LOCALIZED DATA STORE
   Author: JABORZODA FAYZALI
   ========================================================================== */

window.ZABON_DATA = {
    // Interface Localization Dictionary
    i18n: {
        ru: {
            nav_home: "Главная",
            nav_courses: "Курсы",
            nav_dictionary: "Словарь",
            nav_flashcards: "Карточки",
            nav_translator: "Переводчик",
            nav_speaking: "Speaking",
            nav_quiz: "Тесты",
            nav_grammar: "Грамматика",
            nav_progress: "Прогресс",
            nav_profile: "Профиль",
            nav_about: "О проекте",
            hero_title: "Учи языки. Говори свободно.",
            hero_subtitle: "Изучайте таджикский, русский и английский через интерактивные уроки, практику, словарь и реальные диалоги.",
            btn_start: "Начать обучение",
            btn_dict: "Открыть словарь",
            daily_title: "Задание на сегодня",
            daily_desc: "Завершите 1 урок, пройдите 1 тест и изучите 5 новых слов в словаре.",
            select_lang: "Выберите язык для изучения"
        },
        tg: {
            nav_home: "Асосӣ",
            nav_courses: "Курсҳо",
            nav_dictionary: "Луғат",
            nav_flashcards: "Кортҳо",
            nav_translator: "Тарҷумон",
            nav_speaking: "Муҳовира",
            nav_quiz: "Тестҳо",
            nav_grammar: "Грамматика",
            nav_progress: "Пешрафт",
            nav_profile: "Профил",
            nav_about: "Дар бораи лоиҳа",
            hero_title: "Забон омӯз. Озодона гап зан.",
            hero_subtitle: "Забонҳои тоҷикӣ, русӣ ва англисиро тавассути дарсҳои интерактивӣ, амалия ва луғат омӯзед.",
            btn_start: "Оғози омӯзиш",
            btn_dict: "Кушодани луғат",
            daily_title: "Супориши имрӯза",
            daily_desc: "1 дарсро тамом кунед, 1 тест супоред ва 5 калимаи навро омӯзед.",
            select_lang: "Забонро барои омӯзиш интихоб кунед"
        },
        en: {
            nav_home: "Home",
            nav_courses: "Courses",
            nav_dictionary: "Dictionary",
            nav_flashcards: "Flashcards",
            nav_translator: "Translator",
            nav_speaking: "Speaking",
            nav_quiz: "Quizzes",
            nav_grammar: "Grammar",
            nav_progress: "Progress",
            nav_profile: "Profile",
            nav_about: "About",
            hero_title: "Master Languages. Speak Freely.",
            hero_subtitle: "Learn Tajik, Russian, and English through interactive lessons, practice, dictionary, and speech training.",
            btn_start: "Start Learning",
            btn_dict: "Open Dictionary",
            daily_title: "Today's Challenge",
            daily_desc: "Complete 1 lesson, finish 1 quiz, and learn 5 new vocabulary words.",
            select_lang: "Select Target Language"
        }
    },

    // Course Library
    courses: [
        {
            id: "tg-a1",
            lang: "tg",
            level: "A1 Beginner",
            title: "Таджикский язык: Основы",
            description: "Первые шаги: приветствие, знакомство, числительные и базовый разговорный этикет.",
            lessonsCount: 5
        },
        {
            id: "ru-a1",
            lang: "ru",
            level: "A1 Beginner",
            title: "Русский язык: Стартовый курс",
            description: "Алфавит, базовые предложения, разговорные конструкции для повседневной жизни.",
            lessonsCount: 6
        },
        {
            id: "en-a1",
            lang: "en",
            level: "A1 Beginner",
            title: "English Essentials A1",
            description: "Basic vocabulary, present simple, greetings, and key survival expressions.",
            lessonsCount: 8
        }
    ],

    // Interactive Lessons
    lessons: {
        "tg-a1": {
            title: "Урок 01: Знакомство (Салом ва шиносоӣ)",
            steps: [
                {
                    word: "HELLO",
                    ru: "Привет / Здравствуйте",
                    tg: "Салом",
                    phonetic: "[Salom]",
                    example: "Салом! Чӣ хел шумо?",
                    audioLang: "tg"
                },
                {
                    word: "THANK YOU",
                    ru: "Спасибо",
                    tg: "Раҳмат / Ташаккур",
                    phonetic: "[Rahmat]",
                    example: "Калон раҳмат барои ёрӣ!",
                    audioLang: "tg"
                },
                {
                    word: "MY NAME IS...",
                    ru: "Меня зовут...",
                    tg: "Номи ман...",
                    phonetic: "[Nomi man...]",
                    example: "Номи ман Файзалӣ аст.",
                    audioLang: "tg"
                }
            ]
        }
    },

    // Interactive Dictionary Data
    dictionary: [
        { id: 1, en: "BEAUTIFUL", ru: "Красивый", tg: "Зебо", phonetic: "[ˈbjuːtɪfʊl]", example: "It is a beautiful day.", category: "general" },
        { id: 2, en: "KNOWLEDGE", ru: "Знание", tg: "Дониш", phonetic: "[ˈnɒlɪdʒ]", example: "Knowledge is power.", category: "education" },
        { id: 3, en: "FRIEND", ru: "Друг", tg: "Дӯст", phonetic: "[frend]", example: "He is my best friend.", category: "social" },
        { id: 4, en: "WORLD", ru: "Мир / Свет", tg: "Ҷаҳон / Дунё", phonetic: "[wɜːld]", example: "Travel around the world.", category: "general" },
        { id: 5, en: "SUCCESS", ru: "Успех", tg: "Муваффақият", phonetic: "[səkˈses]", example: "Hard work brings success.", category: "education" }
    ],

    // Quiz Questions Data
    quizzes: [
        {
            id: 1,
            question: "Как переводится фраза 'Салом' с таджикского?",
            options: ["Пока", "Привет", "Спасибо", "Пожалуйста"],
            correct: 1
        },
        {
            id: 2,
            question: "Translate into Tajik: 'Thank you'",
            options: ["Худоҳофиз", "Оре", "Раҳмат", "Балӣ"],
            correct: 2
        },
        {
            id: 3,
            question: "Choose the correct English word for 'Дониш':",
            options: ["Book", "Knowledge", "School", "Teacher"],
            correct: 1
        }
    ],

    // Grammar Topics Data
    grammar: [
        {
            id: "g1",
            title: "Таджикский алфавит и фонетика",
            lang: "🇹🇯 Тоҷикӣ",
            content: "В таджикском алфавите 35 букв. Он основан на кириллице с добавлением 6 специфических букв: Ғ, Ӣ, Қ, Ӯ, Ҳ, Ҷ."
        },
        {
            id: "g2",
            title: "Английские времена: Present Simple",
            lang: "🇬🇧 English",
            content: "Present Simple используется для выражения регулярных, повторяющихся действий и фактов. Формула: Subject + Verb(s)."
        }
    ],

    // Achievements Badges
    achievements: [
        { id: "a1", icon: "🚀", title: "Первый шаг", desc: "Завершите свой самый первый урок." },
        { id: "a2", icon: "🔥", title: "Марафон 7 дней", desc: "Занимайтесь каждый день в течение недели." },
        { id: "a3", icon: "🧠", title: "Полиглот", desc: "Изучите более 50 слов в словаре." }
    ]
};
