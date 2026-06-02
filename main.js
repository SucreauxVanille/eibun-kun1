let subjects = [];
let actions = [];

let currentAnswer = [];
let selectedWords = [];
let currentCards = [];

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
// 機能語
const functionWords = [
    "a",
    "an",
    "the",
    "this",
    "that",
    "my",
    "your",
    "his",
    "her",
    "our",
    "their"
];
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

const dummyWords =
    getDummyWords(2);

currentCards =
    shuffle([
        ...currentAnswer,
        ...dummyWords
    ]);

    currentCards.forEach(word => {

        const button =
            document.createElement("button");

        button.className = "word-card";

        button.textContent = word;
        
    button.addEventListener("click", () => {
        selectWord(word, button);
    });
        container.appendChild(button);

    });

}

// ダミーカード
function getDummyWords(count = 2) {

    let allWords = [];

    subjects.forEach(subject => {
        allWords.push(...subject.en);
    });

    actions.forEach(action => {

        allWords.push(action.base);
        allWords.push(action.s);
        allWords.push(action.past);
        allWords.push(...action.object);
    });

    const uniqueWords =
        [...new Set(allWords)];

const dummyCandidates =
    uniqueWords.filter(
        word =>
            !currentAnswer.includes(word)
            &&
            !functionWords.includes(word)
    );

    return shuffle(dummyCandidates)
        .slice(0, count);
}

// 作問
function generateQuestion() {
const tense =
    Math.random() < 0.5
        ? "present"
        : "past";
    const subject = randomItem(subjects);
    const action = randomItem(actions);

let actionJa = action.ja;

if (tense === "past") {
    actionJa =
        actionJa.replace("ます", "ました");
}

const japanese =
    subject.ja + actionJa;
    document.getElementById("question")
        .textContent = japanese;

let verb;

if (tense === "past") {

    verb = action.past;

} else {

    verb =
        subject.third
            ? action.s
            : action.base;
}

currentAnswer = [
    ...subject.en,
    verb,
    ...action.object
];
createCards();
    
    console.log(currentAnswer);
}

// カード選択
function selectWord(word, button) {

    selectedWords.push(word);

    updateAnswerBox();

    button.disabled = true;
}
//解答欄
function updateAnswerBox() {

    const answerBox =
        document.getElementById("answerBox");

    answerBox.innerHTML = "";

    if (selectedWords.length === 0) {

        answerBox.innerHTML =
            '<span class="placeholder">単語カードをタップしてください</span>';

        return;
    }

    let displayWords =
        [...selectedWords];

    displayWords[0] =
        displayWords[0].charAt(0).toUpperCase()
        + displayWords[0].slice(1);

    const sentence =
        displayWords.join(" ") + ".";

    answerBox.textContent =
        sentence;
}


//判定
function checkAnswer() {

    const correct =
        selectedWords.length === currentAnswer.length
        &&
        selectedWords.every(
            (word, index) =>
                word === currentAnswer[index]
        );

    const result =
        document.getElementById("result");

    if (correct) {

        result.textContent =
            "⭕ 正解！";

    } else {

        result.textContent =
            "❌ もう一度挑戦！";

    }

}
// リセット
function resetAnswer() {

    selectedWords = [];

    document.getElementById("result")
        .textContent = "";

    updateAnswerBox();

    createCards();
}

// 次の問題
function nextQuestion() {

    selectedWords = [];

    document.getElementById("result")
        .textContent = "";

    updateAnswerBox();

    generateQuestion();
}

// 起動
loadData();

document
    .getElementById("checkBtn")
    .addEventListener("click", checkAnswer);
document
    .getElementById("resetBtn")
    .addEventListener("click", resetAnswer);
document
    .getElementById("nextBtn")
    .addEventListener("click", nextQuestion);
