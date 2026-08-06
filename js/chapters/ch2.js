// ============================================================
//  ГЛАВА 2: ШКОЛА + КОМИССИОНКА
// ============================================================
window.storyScenes.push(
    {
        id: "chapter_2",
        speaker: null,
        text: "Глава 2\nШкола",
        image: "images/chapter_bg.png",
        background: "images/chapter_bg.png",
        choices: [{ text: "Начать", nextId: "school_1" }]
    },
    {
        id: "school_1",
        speaker: "Повествователь",
        text: "5-й класс. Ты сидишь с девочкой Кирой. Она рисует и просит точилку.",
        image: "images/classroom.png",
        background: "images/school_bg.png",
        choices: [
            { text: "Дать точилку молча", nextId: "school_1_1" },
            { text: "Пошутить", nextId: "school_1_1" }
        ]
    },
    {
        id: "school_1_1",
        speaker: "Кира",
        text: "— Спасибо. А ты всегда такой молчаливый? — улыбается она. Ты краснеешь.",
        image: "images/classroom.png",
        background: "images/school_bg.png",
        choices: [
            { text: "Поговорить о рисунке", nextId: "dialog_kira_1" },
            { text: "Отвернуться", nextId: "school_2" }
        ]
    },
    {
        id: "dialog_kira_1",
        speaker: "Кира",
        text: "— Ты знаешь, я часто рисую наш двор. А ты любишь рисовать?",
        image: "images/classroom.png",
        background: "images/school_bg.png",
        choices: [{ text: "Продолжить разговор →", nextId: "dialog_kira_2" }]
    },
    {
        id: "dialog_kira_2",
        speaker: "Марк",
        text: "— Не очень. Я больше люблю смотреть, как ты рисуешь. У тебя здорово получается.",
        image: "images/classroom.png",
        background: "images/school_bg.png",
        choices: [{ text: "→", nextId: "dialog_kira_3" }]
    },
    {
        id: "dialog_kira_3",
        speaker: "Кира",
        text: "— Спасибо! Может, как-нибудь нарисуем вместе?",
        image: "images/classroom.png",
        background: "images/school_bg.png",
        choices: [{ text: "Хорошо", nextId: "school_2" }]
    },
    {
        id: "school_2",
        speaker: "Повествователь",
        text: "Старшеклассники во главе с Геной «Мясом» зажимают тебя в тупике. Рвут дневник, смеются.",
        image: "images/bullying.png",
        background: "images/school_bg.png",
        choices: [
            { text: "Стерпеть", nextId: "school_2_1" },
            { text: "Ответить резко", nextId: "school_2_1" },
            { text: "Позвать Димку", nextId: "school_2_1" }
        ]
    },
    {
        id: "school_2_1",
        speaker: "Повествователь",
        text: "Ты делаешь выбор. Этот случай меняет твоё отношение к силе и справедливости.",
        image: "images/bullying.png",
        background: "images/school_bg.png",
        choices: [{ text: "Запомнить", nextId: "school_3" }]
    },
    {
        id: "school_3",
        speaker: "Кира",
        text: "Кира даёт тебе ириску: «Не обращай внимания, они идиоты».",
        image: "images/ira_iris.png",
        background: "images/school_bg.png",
        choices: [
            { text: "Улыбнуться", nextId: "dialog_kira_2_1" },
            { text: "Промолчать", nextId: "school_4" }
        ]
    },
    {
        id: "dialog_kira_2_1",
        speaker: "Марк",
        text: "— Спасибо, Кира. Ты всегда такая добрая ко мне.",
        image: "images/ira_iris.png",
        background: "images/school_bg.png",
        choices: [{ text: "→", nextId: "dialog_kira_2_2" }]
    },
    {
        id: "dialog_kira_2_2",
        speaker: "Кира",
        text: "— Это просто ириска. Но если хочешь, могу угощать тебя каждый день.",
        image: "images/ira_iris.png",
        background: "images/school_bg.png",
        choices: [{ text: "Спасибо, я бы хотел", nextId: "school_4" }]
    },
    {
        id: "school_4",
        speaker: "Повествователь",
        text: "Заканчивается 9-й класс. Мама говорит: «Денег нет, иди в ПТУ». Димон уходит в армию, Кира уезжает учиться на повара.",
        image: "images/farewell.png",
        background: "images/autumn_bg.png",
        choices: [
            { text: "Поцеловать Киру", nextId: "street_comission" },
            { text: "Обнять", nextId: "street_comission" }
        ]
    },
    // ----- Ветка комиссионки -----
    {
        id: "street_comission",
        speaker: "Повествователь",
        text: "Ты идёшь по улице и замечаешь старую комиссионку. На витрине тускло горит лампа. Внутри, кажется, есть что-то интересное.",
        image: "images/comission_shop.png",
        background: "images/comission_shop.png",
        choices: [
            { text: "Зайти в комиссионку", nextId: "comission_enter" },
            { text: "Пойти домой", nextId: "chapter_3" }
        ]
    },
    {
        id: "comission_enter",
        speaker: "Продавщица",
        text: "— О, Марк! Ты ведь сын Валентины? Как вырос! Что ищешь? — улыбается женщина за прилавком.",
        image: "images/comission_shop.png",
        background: "images/comission_shop.png",
        choices: [{ text: "Осмотреть полки", nextId: "comission_shelf" }]
    },
    {
        id: "comission_shelf",
        speaker: "Повествователь",
        text: "На полке ты видишь несколько вещей: игровая приставка GameStation 3, старый фотоаппарат Danon, стопка журналов MAXON и кассеты с хитами HANDRA. Что бы ты хотел рассмотреть поближе?",
        image: "images/comission_shelf.png",
        background: "images/comission_shop.png",
        choices: [
            { text: "GameStation 3", nextId: "comission_choose_gamestation" },
            { text: "Фотоаппарат Danon", nextId: "comission_choose_danon" },
            { text: "Журналы MAXON", nextId: "comission_choose_maxon" },
            { text: "Кассеты HANDRA", nextId: "comission_choose_handra" }
        ]
    },
    {
        id: "comission_choose_gamestation",
        speaker: "Повествователь",
        text: "Ты берёшь в руки приставку. Она кажется старой, но рабочей. Ты представляешь, как будешь играть в неё с друзьями.",
        image: "images/items/gamestation3.png",
        background: "images/comission_shop.png",
        choices: [{ text: "Пойти к кассе", nextId: "comission_cash" }]
    },
    {
        id: "comission_choose_danon",
        speaker: "Повествователь",
        text: "Ты берёшь фотоаппарат. Он тяжёлый, с большим объективом. Ты мечтаешь научиться фотографировать.",
        image: "images/items/danon.png",
        background: "images/comission_shop.png",
        choices: [{ text: "Пойти к кассе", nextId: "comission_cash" }]
    },
    {
        id: "comission_choose_maxon",
        speaker: "Повествователь",
        text: "Ты перелистываешь журналы. На обложках — компьютеры и игры. Ты бы хотел купить их все, но денег мало.",
        image: "images/items/maxon.png",
        background: "images/comission_shop.png",
        choices: [{ text: "Пойти к кассе", nextId: "comission_cash" }]
    },
    {
        id: "comission_choose_handra",
        speaker: "Повествователь",
        text: "Ты рассматриваешь кассеты. Это любимые группы твоего отца. Ты бы хотел послушать их, но...",
        image: "images/items/handra.png",
        background: "images/comission_shop.png",
        choices: [{ text: "Пойти к кассе", nextId: "comission_cash" }]
    },
    {
        id: "comission_cash",
        speaker: "Продавщица",
        text: "— Это стоит 3000 рублей, — говорит она. Ты лезешь в карман и находишь всего 500. Тебе становится стыдно. Ты ставишь вещь обратно и выходишь на улицу.",
        image: "images/comission_shop.png",
        background: "images/comission_shop.png",
        choices: [{ text: "Уйти грустным", nextId: "comission_exit" }]
    },
    {
        id: "comission_exit",
        speaker: "Повествователь",
        text: "Ты выходишь из комиссионки. На душе тяжело. Ты понимаешь, что без денег здесь делать нечего. Ты идёшь домой, думая о том, что когда-нибудь купишь что-то из этих вещей.",
        image: "images/comission_shop.png",
        background: "images/comission_shop.png",
        choices: [{ text: "Продолжить", nextId: "chapter_3" }]
    }
);
