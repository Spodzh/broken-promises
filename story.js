// ============================================================
//  ГЛАВА 4: РАБОТА И ВЫБОР
// ============================================================
window.storyScenes.push(
    {
        id: "chapter_4",
        speaker: null,
        text: "Глава 4\nРабота и выбор",
        image: "images/chapter_bg.png",
        background: "images/chapter_bg.png",
        choices: [{ text: "Начать", nextId: "work_choice" }]
    },
    {
        id: "work_choice",
        speaker: "Повествователь",
        text: "После ПТУ ты идёшь на стройку. Дядька Гена, бригадир, смотрит на тебя оценивающе.",
        image: "images/construction.png",
        background: "images/site_bg.png",
        choices: [
            { text: "Поговорить с дядькой Геной", nextId: "dialog_gena_1" },
            { text: "Просто начать работать", nextId: "work_honest" }
        ]
    },
    {
        id: "dialog_gena_1",
        speaker: "Дядька Гена",
        text: "— Новенький? Молодой ещё. Чего умеешь? Штукатурить? Красить? Или только болгарку воровать?",
        image: "images/construction.png",
        background: "images/site_bg.png",
        choices: [{ text: "Я могу всё, что скажете", nextId: "dialog_gena_2" }]
    },
    {
        id: "dialog_gena_2",
        speaker: "Марк",
        text: "— Я хочу работать честно. Научусь всему, что нужно.",
        image: "images/construction.png",
        background: "images/site_bg.png",
        choices: [
            { text: "Честно работать", nextId: "work_honest" },
            { text: "Левые подработки", nextId: "work_criminal" },
            { text: "Уйти к Димону в охрану", nextId: "work_security" }
        ]
    },
    {
        id: "work_honest",
        speaker: "Повествователь",
        text: "Ты работаешь честно, становишься прорабом. Кира пишет тебе.",
        image: "images/foreman.png",
        background: "images/site_bg.png",
        choices: [
            { text: "Продолжать строительство", nextId: "work_honest_2" },
            { text: "Попросить Киру приехать", nextId: "work_honest_2" }
        ]
    },
    {
        id: "work_honest_2",
        speaker: "Повествователь",
        text: "Ты становишься мастером. Однажды видишь, как на стройке обижают новенького пацана. Это напоминает тебе твоё детство.",
        image: "images/construction.png",
        background: "images/site_bg.png",
        choices: [
            { text: "Заступиться за него", nextId: "work_honest_3" },
            { text: "Пройти мимо", nextId: "work_honest_3" }
        ]
    },
    {
        id: "work_honest_3",
        speaker: "Повествователь",
        text: "Ты заступился за парня. Бригадир заметил твою смелость и предложил тебе повышение. Теперь ты бригадир. Жизнь налаживается, но ты часто вспоминаешь Киру.",
        image: "images/foreman.png",
        background: "images/site_bg.png",
        choices: [
            { text: "Написать Кире", nextId: "dialog_kira_final_1" },
            { text: "Остаться в Заветченске", nextId: "final_choice_mid" }
        ]
    },
    {
        id: "dialog_kira_final_1",
        speaker: "Кира",
        text: "— Марк, я слышала, ты стал бригадиром. Я горжусь тобой.",
        image: "images/store.png",
        background: "images/store_bg.png",
        choices: [{ text: "Спасибо, Кира. Я скучаю по тебе", nextId: "dialog_kira_final_2" }]
    },
    {
        id: "dialog_kira_final_2",
        speaker: "Марк",
        text: "— Может, нам стоит начать сначала?",
        image: "images/store.png",
        background: "images/store_bg.png",
        choices: [
            { text: "Уехать с ней", nextId: "chapter_5" },
            { text: "Построить дом", nextId: "chapter_5" }
        ]
    },
    {
        id: "work_criminal",
        speaker: "Повествователь",
        text: "Ты втягиваешься в криминал. Однажды тебя подставляют.",
        image: "images/dark_alley.png",
        background: "images/night_bg.png",
        choices: [
            { text: "Закопаться глубже", nextId: "work_criminal_2" },
            { text: "Попытаться выйти из игры", nextId: "work_criminal_2" }
        ]
    },
    {
        id: "work_criminal_2",
        speaker: "Повествователь",
        text: "Ты в криминале. Тебя вызывают на разборку. Ты понимаешь, что это твой последний шанс.",
        image: "images/dark_alley.png",
        background: "images/night_bg.png",
        choices: [
            { text: "Идти до конца", nextId: "chapter_5" },
            { text: "Завязать и уйти в легальную жизнь", nextId: "chapter_5" }
        ]
    },
    {
        id: "work_security",
        speaker: "Повествователь",
        text: "Ты работаешь в клубе. Видишь Киру, она разведена.",
        image: "images/club.png",
        background: "images/club_bg.png",
        choices: [
            { text: "Подойти", nextId: "work_security_1" },
            { text: "Уйти", nextId: "chapter_5" }
        ]
    },
    {
        id: "work_security_1",
        speaker: "Кира",
        text: "— Ты изменился, Марк. Рада, что ты нашёл себя.",
        image: "images/club.png",
        background: "images/club_bg.png",
        choices: [{ text: "Поговорить", nextId: "chapter_5" }]
    }
);
