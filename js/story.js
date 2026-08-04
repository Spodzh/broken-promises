// ============================================================
//  СЦЕНАРИЙ С ДИАЛОГАМИ (v2.4.1)
// ============================================================
var storyData = {
    startScene: "birth",
    scenes: [
        // === АКТ 1: РОЖДЕНИЕ И ДЕТСТВО ===
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
        // ========== ДИАЛОГ С ДИМОНОМ ==========
        {
            id: "yard",
            speaker: "Повествователь",
            text: "Во дворе ты встречаешь Димку — такого же худого пацана. Он показывает тайник с журналами и рогаткой.",
            image: "images/yard.png",
            background: "images/yard_bg.png",
            choices: [
                { text: "Довериться Димону", nextId: "dialog_dim_1" },
                { text: "Дружить с осторожностью", nextId: "school_1" }
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
            choices: [{ text: "Ладно, договорились", nextId: "school_1" }]
        },
        // =========================================
        // === АКТ 2: ШКОЛА ===
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
        // ---- Диалог с Кирой (первая встреча) ----
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
        // -----------------------------------------
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
        // ---- Диалог с Кирой после ириски ----
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
        // -----------------------------------------
        {
            id: "school_4",
            speaker: "Повествователь",
            text: "Заканчивается 9-й класс. Мама говорит: «Денег нет, иди в ПТУ». Димон уходит в армию, Кира уезжает учиться на повара.",
            image: "images/farewell.png",
            background: "images/autumn_bg.png",
            choices: [
                { text: "Поцеловать Киру", nextId: "ptu_1" },
                { text: "Обнять", nextId: "ptu_1" }
            ]
        },
        // === АКТ 3: ПТУ И СМЕРТЬ ОТЦА ===
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
        // ---- Диалог с Серёгой ----
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
        // ---------------------------------
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
                { text: "Держаться за Киру", nextId: "work_choice" }
            ]
        },
        // ---- Диалог с мамой ----
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
            choices: [{ text: "Продолжить", nextId: "work_choice" }]
        },
        // ---------------------------------
        // === АКТ 4: РАБОТА ===
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
        // ---- Диалог с дядькой Геной ----
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
        // -----------------------------------------
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
        // ---- Финальный диалог с Кирой ----
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
                { text: "Уехать с ней", nextId: "ending_good_1" },
                { text: "Построить дом", nextId: "ending_good_2" }
            ]
        },
        // -----------------------------------------
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
                { text: "Идти до конца", nextId: "final_choice_bad" },
                { text: "Завязать и уйти в легальную жизнь", nextId: "final_choice_bad" }
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
                { text: "Уйти", nextId: "final_choice_bad" }
            ]
        },
        {
            id: "work_security_1",
            speaker: "Кира",
            text: "— Ты изменился, Марк. Рада, что ты нашёл себя.",
            image: "images/club.png",
            background: "images/club_bg.png",
            choices: [{ text: "Поговорить", nextId: "final_choice_mid" }]
        },
        // === ФИНАЛЬНЫЕ РАЗВИЛКИ ===
        {
            id: "final_choice_good",
            speaker: "Повествователь",
            text: "Кира приходит в строймаркет. Вы решаете начать сначала.",
            image: "images/store.png",
            background: "images/store_bg.png",
            choices: [
                { text: "Уехать с ней", nextId: "ending_good_1" },
                { text: "Построить дом", nextId: "ending_good_2" }
            ]
        },
        {
            id: "final_choice_mid",
            speaker: "Повествователь",
            text: "Вы говорите до утра, но она уезжает одна.",
            image: "images/bar.png",
            background: "images/bar_bg.png",
            choices: [
                { text: "Догнать", nextId: "ending_mid_1" },
                { text: "Сдаться", nextId: "ending_mid_2" }
            ]
        },
        {
            id: "final_choice_bad",
            speaker: "Повествователь",
            text: "Ты погибаешь в подворотне от ножа.",
            image: "images/death_street.png",
            background: "images/night_bg.png",
            choices: []
        },
        // === КОНЦОВКИ ===
        {
            id: "ending_good_1",
            speaker: "Повествователь",
            text: "Авария на трассе. Ты умираешь счастливым, держа Киру за руку.",
            image: "images/car_crash.png",
            background: "images/road_bg.png",
            choices: []
        },
        {
            id: "ending_good_2",
            speaker: "Повествователь",
            text: "Ты строил дом для Киры. Умер от инфаркта, но дом остался.",
            image: "images/house.png",
            background: "images/home_bg.png",
            choices: []
        },
        {
            id: "ending_mid_1",
            speaker: "Повествователь",
            text: "Ты догнал её, но через год спился. Кира ушла.",
            image: "images/station.png",
            background: "images/station_bg.png",
            choices: []
        },
        {
            id: "ending_mid_2",
            speaker: "Повествователь",
            text: "Ты остался в Заветченске, спился и умер в 30.",
            image: "images/apartment_death.png",
            background: "images/apt_bg.png",
            choices: []
        }
    ]
};
