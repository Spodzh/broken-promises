// ============================================================
//  ГЛАВА 1: ДЕТСТВО (с новым персонажем – тётя Зина)
// ============================================================
window.storyScenes.push(
    {
        id: "chapter_1",
        speaker: null,
        text: "Глава 1\nДетство",
        image: "images/chapter_bg.png",
        background: "images/chapter_bg.png",
        choices: [{ text: "Начать", nextId: "birth" }]
    },
    {
        id: "birth",
        speaker: "Повествователь",
        text: "Декабрь 2000. Заветченск. Ты родился в хрущёвке. Отец — грузчик, мать — уборщица. Денег в обрез. Тебя назвали Марком. Твоя жизнь — история сломанных обещаний.",
        image: "images/birth.png",
        background: "images/winter_bg.png",
        choices: [{ text: "Посмотреть на мир →", nextId: "childhood_1" }]
    },
    {
        id: "childhood_1",
        speaker: "Повествователь",
        text: "Тебе 3 года. Мама пересчитывает мелочь. Отец поднимается по лестнице — шаги тяжёлые, недобрые.",
        image: "images/room.png",
        background: "images/apt_bg.png",
        choices: [
            { text: "Выйти к отцу", nextId: "childhood_2A" },
            { text: "Спрятаться под стол", nextId: "childhood_2B" }
        ]
    },
    {
        id: "childhood_2A",
        speaker: "Повествователь",
        text: "Отец злой, отталкивает тебя. Мама плачет. Ты запоминаешь стыд и боль.",
        image: "images/angry_dad.png",
        background: "images/apt_bg.png",
        choices: [{ text: "Запомнить", nextId: "childhood_3" }]
    },
    {
        id: "childhood_2B",
        speaker: "Повествователь",
        text: "Ты сжимаешься под столом, боишься громких звуков. С этого дня ты боишься конфликтов.",
        image: "images/under_table.png",
        background: "images/apt_bg.png",
        choices: [{ text: "Запомнить страх", nextId: "childhood_3" }]
    },
    {
        id: "childhood_3",
        speaker: "Повествователь",
        text: "В 5 лет ты пошёл в детский сад. Там ты впервые столкнулся с жестокостью: старшие мальчики отобрали твою игрушку. Ты не плакал, но запомнил это чувство несправедливости.",
        image: "images/kindergarten.png",
        background: "images/apt_bg.png",
        choices: [
            { text: "Попытаться забрать игрушку", nextId: "childhood_4A" },
            { text: "Пожаловаться воспитательнице", nextId: "childhood_4B" }
        ]
    },
    {
        id: "childhood_4A",
        speaker: "Повествователь",
        text: "Ты попытался забрать игрушку силой, но получил по голове. Воспитательница наказала тебя за драку. Ты понял, что мир несправедлив.",
        image: "images/kindergarten.png",
        background: "images/apt_bg.png",
        choices: [{ text: "Продолжить", nextId: "yard" }]
    },
    {
        id: "childhood_4B",
        speaker: "Повествователь",
        text: "Ты пожаловался воспитательнице, но она не обратила внимания. Ты понял, что надеяться на защиту бесполезно, и научился полагаться только на себя.",
        image: "images/kindergarten.png",
        background: "images/apt_bg.png",
        choices: [{ text: "Продолжить", nextId: "yard" }]
    },
    {
        id: "yard",
        speaker: "Повествователь",
        text: "Во дворе ты встречаешь Димку — такого же худого пацана. Он показывает тайник с журналами и рогаткой.",
        image: "images/yard.png",
        background: "images/yard_bg.png",
        choices: [
            { text: "Довериться Димону", nextId: "dialog_dim_1" },
            { text: "Подойти к тёте Зине", nextId: "zina_meet" },
            { text: "Пойти в школу", nextId: "chapter_2" }
        ]
    },
    {
        id: "dialog_dim_1",
        speaker: "Димон",
        text: "— Смотри, что я нашёл! Тайник. Тут журналы и рогатка. Хочешь, покажу, как стрелять?",
        image: "images/yard.png",
        background: "images/yard_bg.png",
        choices: [{ text: "Да, покажи!", nextId: "dialog_dim_2" }]
    },
    {
        id: "dialog_dim_2",
        speaker: "Марк",
        text: "— Круто! А где ты это взял?",
        image: "images/yard.png",
        background: "images/yard_bg.png",
        choices: [{ text: "→", nextId: "dialog_dim_3" }]
    },
    {
        id: "dialog_dim_3",
        speaker: "Димон",
        text: "— Нашёл на свалке. Теперь это наше место. Никому не говори, ладно?",
        image: "images/yard.png",
        background: "images/yard_bg.png",
        choices: [{ text: "Ладно, договорились", nextId: "chapter_2" }]
    },
    {
        id: "zina_meet",
        speaker: "Тётя Зина",
        text: "— Ой, Марк! Ты ли это? Вырос-то как! Держи пирожок, а то худой как щепка.",
        image: null,
        background: "images/yard_bg.png",
        choices: [
            { text: "Спасибо, тёть Зин!", nextId: "chapter_2" },
            { text: "Я не голоден", nextId: "chapter_2" }
        ]
    }
);
