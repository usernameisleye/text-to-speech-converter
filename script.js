const textArea = document.querySelector('textarea');
const toSpeechBtn = document.querySelector('button');
const selectVoice = document.querySelector('select');

toSpeechBtn.addEventListener('click', convertToSpeech);
speechSynthesis.addEventListener('voiceschanged', selectedVoice)

function convertToSpeech(){
    const txtAreaValue = textArea.value
    if(txtAreaValue !== ''){
        let speech = new SpeechSynthesisUtterance(txtAreaValue)
        speechSynthesis.speak(speech);
    }
}

function selectedVoice(){
    for(let voice of speechSynthesis.getVoices()){
        let selected = voice.name === 'Google US English' ? 'selected' : '';
        console.log(voice)
        const voiceOption = `<option value="${voice.name}" ${selected}>${voice.name} ${voice.lang}</option>`;
        selectVoice.insertAdjacentHTML('beforeend', voiceOption);
    }
}