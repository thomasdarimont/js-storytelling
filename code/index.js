import { createKeywordTypeNode, isLineBreak } from "typescript";

class SpeechRecog {
  constructor(speechRecogConfig = {}) {
    this.recognizing = false;
    this.recognition = this.initSpeechRecognitation(speechRecogConfig);
  }

  createRecognition() {
    if ("SpeechRecognition" in window) {
      return SpeechRecognition;
    }

    if ("webkitSpeechRecognition" in window) {
      return webkitSpeechRecognition;
    }

    console.error("No SpeechRecognition");
    return null;
  }

  initSpeechRecognitation(speechRecogConfig) {
    const recognition = new (this.createRecognition())();
    Object.assign(recognition, speechRecogConfig);

    recognition.onstart = () => {
      this.recognizing = true;
    };

    recognition.onerror = event => {
      console.error(event);
    };

    recognition.onend = () => {
      this.recognizing = false;
    };

    recognition.onresult = () => {
      
      if (typeof event.results == "undefined") {
        this.stop();
        console.log("upgrade required...");
        return;
      }

      for (var i = event.resultIndex; i < event.results.length; ++i) {
                
        // let tmp = event.results[i][0].transcript;
        // if (event.results[i].isFinal) {
        //   final_transcript += tmp;
        // } else {
        //   interimTranscript += tmp;
        // }

        // let bubu = tmp.split(" ");
        // visualize(bubu[bubu.length - 1]);

        
        if(!event.results[i].isFinal){
          let text = event.results[i][0].transcript;
          let keyword = document.getElementById("keyword");
          let word = text.split(" ").pop();
          let fontSize = 48 / Math.exp(word.length/8);
          console.log(word, fontSize);

          let normalizedWord = this.normalize(word);

          let wordInfo = window.mappings.lookup(normalizedWord);
          if (!wordInfo) {
            continue;
          }

          console.log(normalizedWord, wordInfo);

          let fontColor = wordInfo.Colour === "None" ? "black" : wordInfo.Colour;

          keyword.innerText = normalizedWord;
          keyword.style.fontSize = fontSize + "vh";
          keyword.style.color = fontColor;
        }
      }

      // final_transcript = capitalize(final_transcript);
      // final_span.innerHTML = linebreak(final_transcript);
      // interim_span.innerHTML = linebreak(interimTranscript);
      // if (final_transcript || interimTranscript) {
      //   // showButtons('inline-block');
      // }
    };

    return recognition;
  }

  normalize(input) {

    let output = input;
    output = output.toLowerCase();

    return output;
  }

  start() {
    if (this.recognizing) {
      return;
    }

    console.log("start");
    this.recognition.start();
  }

  stop() {
    if (!this.recognizing) {
      return;
    }

    this.recognizing = false;
    console.log("stop");
    this.recognition.stop();
  }
}

const recog = new SpeechRecog({
  continuous: true,
  interimResults: true,
  lang: 'de-DE'
});

btn_start.onclick = recog.start.bind(recog);
btn_stop.onclick = recog.stop.bind(recog);
