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

// ランダム選択
function randomItem(array) {
    return array[
        Math.floor(Math.random() * array.length)
    ];
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

    console.log(currentAnswer);
}

// 起動
loadData();
