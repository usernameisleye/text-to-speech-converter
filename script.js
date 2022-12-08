const textArea = document.querySelector('textarea');
const toSpeechBtn = document.querySelector('button');
const selectVoice = document.querySelector('select');

isSpeaking = true;

toSpeechBtn.addEventListener('click', convertToSpeech);
speechSynthesis.addEventListener('voiceschanged', selectedVoice)

function convertToSpeech(){
    const txtAreaValue = textArea.value
    if(txtAreaValue !== ''){
        //if .speak method is not currently speaking
        if(!speechSynthesis.speaking){
            let speech = new SpeechSynthesisUtterance(txtAreaValue)
            for(let voice of speechSynthesis.getVoices()){
                //set selected voice to speech voice, if available device voice name is same as selected voice name
                if(voice.name === selectVoice.value){
                    speech.voice = voice;
                }
            }
            speechSynthesis.speak(speech);
        }

        if(textArea.value.length > 100){
            if(isSpeaking){
                speechSynthesis.resume();
                isSpeaking = false;
                toSpeechBtn.innerText = 'Pause';
            }else{
                speechSynthesis.pause();
                isSpeaking = true;
                toSpeechBtn.innerText = 'Resume';
            }

            setInterval(() =>{
                if(!speechSynthesis.speaking && !isSpeaking){
                    isSpeaking = true;
                    toSpeechBtn.innerText = 'Convert To Speech';
                }
            })
        }
    }
}

function selectedVoice(){
    for(let voice of speechSynthesis.getVoices()){
        //select US English as default
        let selected = voice.name === 'Google US English' ? 'selected' : '';

        //adding voice function to the end to replace the contents of the select tag(yeah, I know)
        const voiceOption = `<option value="${voice.name}" ${selected}>${voice.name} ${voice.lang}</option>`;
        selectVoice.insertAdjacentHTML('beforeend', voiceOption);
    }
}