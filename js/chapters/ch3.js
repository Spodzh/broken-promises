// ============================================================
//  ГЛАВА 3: ПТУ И ПОТЕРЯ
// ============================================================
window.storyScenes.push(
    {
        id: "chapter_3",
        speaker: null,
        text: "Глава 3\nПТУ и потеря",
        image: "images/chapter_bg.png",
        background: "images/chapter_bg.png",
        choices: [{ text: "Начать", nextId: "ptu_1" }]
    },
    {
        id: "ptu_1",
        speaker: "Повествователь",
        text: "ПТУ №34. Компания Коляна, Костяна и Серёги предлагает украсть инструмент.",
        image: "images/ptu_workshop.png",
        background: "images/ptu_bg.png",
        choices: [
            { text: "Согласиться", nextId: "dialog_sergey_1" },
            { text: "Отказаться", nextId: "ptu_2B" }
        ]
    },
    {
        id: "dialog_sergey_1",
        speaker: "Серёга",
        text: "— Ты че, новенький? Хочешь быть с нами? Тогда докажи — укради болгарку с первого этажа. Легко.",
        image: "images/ptu_workshop.png",
        background: "images/ptu_bg.png",
        choices: [{ text: "Я согласен", nextId: "dialog_sergey_2" }]
    },
    {
        id: "dialog_sergey_2",
        speaker: "Марк",
        text: "— Хорошо. Я сделаю это.",
        image: "images/ptu_workshop.png",
        background: "images/ptu_bg.png",
        choices: [{ text: "Пойти на дело", nextId: "ptu_2A" }]
    },
    {
        id: "ptu_2A",
        speaker: "Повествователь",
        text: "Ты украл болгарку. Тебя не поймали. Ты теперь «свой».",
        image: "images/theft.png",
        background: "images/ptu_bg.png",
        choices: [
            { text: "Продолжить воровать", nextId: "ptu_3A" },
            { text: "Завязать, пока не поздно", nextId: "ptu_3B" }
        ]
    },
    {
        id: "ptu_2B",
        speaker: "Повествователь",
        text: "Ты отказался. Тебя изолировали, перевели в другую группу. Ты работаешь один, но честно.",
        image: "images/lonely_ptu.png",
        background: "images/ptu_bg.png",
        choices: [
            { text: "Продолжить честно работать", nextId: "father_death" },
            { text: "Попытаться подружиться с другими", nextId: "ptu_3B" }
        ]
    },
    {
        id: "ptu_3A",
        speaker: "Повествователь",
        text: "Вы начинаете мелкие кражи регулярно. Деньги появляются, но ты чувствуешь, что идёшь по наклонной.",
        image: "images/theft.png",
        background: "images/ptu_bg.png",
        choices: [
            { text: "Закопаться глубже", nextId: "father_death" },
            { text: "Остановиться и вернуться на путь честности", nextId: "father_death" }
        ]
    },
    {
        id: "ptu_3B",
        speaker: "Повествователь",
        text: "Ты решаешь не связываться с криминалом. Ты работаешь штукатуром, учишься, но чувствуешь себя одиноким.",
        image: "images/lonely_ptu.png",
        background: "images/ptu_bg.png",
        choices: [{ text: "Продолжить", nextId: "father_death" }]
    },
    {
        id: "father_death",
        speaker: "Повествователь",
        text: "Тебе 17. Звонок: отец умер на работе. Ты стоишь в коридоре ПТУ.",
        image: "images/phone_call.png",
        background: "images/ptu_bg.png",
        choices: [
            { text: "Заплакать", nextId: "funeral" },
            { text: "Взять ответственность", nextId: "funeral" },
            { text: "Озлобиться", nextId: "funeral" }
        ]
    },
    {
        id: "funeral",
        speaker: "Повествователь",
        text: "Похороны. Пришли Димон и Кира. Мама плачет. Ты стоишь рядом.",
        image: "images/funeral.png",
        background: "images/cemetery_bg.png",
        choices: [
            { text: "Обнять маму", nextId: "dialog_mom_1" },
            { text: "Держаться за Киру", nextId: "chapter_4" }
        ]
    },
    {
        id: "dialog_mom_1",
        speaker: "Мама",
        text: "— Сынок... мы остались одни. Но ты у меня сильный. Мы справимся.",
        image: "images/funeral.png",
        background: "images/cemetery_bg.png",
        choices: [{ text: "Я всегда буду рядом, мам", nextId: "dialog_mom_2" }]
    },
    {
        id: "dialog_mom_2",
        speaker: "Марк",
        text: "— Не плачь. Я найду работу, мы выберемся из этой нищеты.",
        image: "images/funeral.png",
        background: "images/cemetery_bg.png",
        choices: [{ text: "Продолжить", nextId: "chapter_4" }]
    }
);
