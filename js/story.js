var storyData = {
    startScene: "birth",
    scenes: [
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
            choices: [{ text: "Запомнить", nextId: "yard" }]
        },
        {
            id: "childhood_2B",
            speaker: "Повествователь",
            text: "Ты сжимаешься под столом, боишься громких звуков. С этого дня ты боишься конфликтов.",
            image: "images/under_table.png",
            background: "images/apt_bg.png",
            choices: [{ text: "Запомнить страх", nextId: "yard" }]
        },
        {
            id: "yard",
            speaker: "Повествователь",
            text: "Во дворе ты встречаешь Димку — такого же худого пацана. Он показывает тайник с журналами и рогаткой. Вы становитесь друзьями.",
            image: "images/yard.png",
            background: "images/yard_bg.png",
            choices: [
                { text: "Довериться Димону", nextId: "school_1" },
                { text: "Дружить с осторожностью", nextId: "school_1" }
            ]
        }
        // ... ОСТАЛЬНЫЕ 22 СЦЕНЫ (скопируйте из предыдущего сообщения)
    ]
};
