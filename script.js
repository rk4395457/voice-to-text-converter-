const textArea = document.getElementById("data");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const languageSelect = document.getElementById("language");

let recognition;
let isListening = false;
let finalTranscript = "";

if ("webkitSpeechRecognition" in window) {

    recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {

        let interimTranscript = "";

        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            const transcript =
                event.results[i][0].transcript;

            if (event.results[i].isFinal) {
                finalTranscript += transcript + " ";
            } else {
                interimTranscript += transcript;
            }
        }

        textArea.value =
            finalTranscript + interimTranscript;
    };

    recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
    };

} else {
    alert(
        "Speech Recognition is not supported in your browser. Please use Google Chrome."
    );
}

startBtn.addEventListener("click", () => {

    if (!recognition || isListening) return;

    recognition.lang = languageSelect.value;
    recognition.start();

    isListening = true;

    startBtn.textContent = "🎙️ Listening...";
    startBtn.style.background = "#4caf50";
});

stopBtn.addEventListener("click", () => {

    if (!recognition || !isListening) return;

    recognition.stop();

    isListening = false;

    startBtn.textContent = "🎤 Start";
    startBtn.style.background = "#ffd700";
});