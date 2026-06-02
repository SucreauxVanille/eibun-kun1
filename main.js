let subjects = [];
let actions = [];

let currentAnswer = [];

// JSON読込
async function loadData() {

    const subjectsResponse =
        await fetch("data/subjects.json");

    subjects =
        await subjectsResponse.json();

    const actionsResponse =
        await fetch("data/actions.json");

    actions =
        await actionsResponse.json();

    generateQuestion();
}

//シャッフル
function shuffle(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] =
        [copy[j], copy[i]];
    }

    return copy;
}

// ランダム選択
function randomItem(array) {
    return array[
        Math.floor(Math.random() * array.length)
    ];
}

// カード生成
function createCards() {

    const container =
        document.getElementById("cardContainer");

    container.innerHTML = "";

    const shuffled =
        shuffle(currentAnswer);

    shuffled.forEach(word => {

        const button =
            document.createElement("button");

        button.className = "word-card";

        button.textContent = word;

        container.appendChild(button);

    });

}

// 作問
function generateQuestion() {

    const subject = randomItem(subjects);
    const action = randomItem(actions);

    const japanese =
        subject.ja + action.ja;

    document.getElementById("question")
        .textContent = japanese;

    currentAnswer = [
        ...subject.en,
        action.base,
        action.object
    ];
createCards();
    
    console.log(currentAnswer);
}

// 起動
loadData();
