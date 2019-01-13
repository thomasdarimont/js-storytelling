class SpeechRecog {
  constructor(speechRecogConfig = {}) {
    this.recognizing = false;
    this.recognition = this.initSpeechRecognitation(speechRecogConfig);
    this.normalizer = speechRecogConfig.normalizer;
    this.interimTranscript = "";
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

  withWordListener(onNextWord) {
    this.onNextWord = onNextWord;
    return this;
  }

  withTranscriptListener(onNewTranscript) {
    this.onNewTranscript = onNewTranscript;
    return this;
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
      console.log("recognition end...");

      if (this.stopped) {
        return;
      }

      setTimeout(() => {
        console.log("restarting recognition");
        this.recognition.start();
      }, 500);
    };

    recognition.onresult = () => {
      if (typeof event.results == "undefined") {
        this.stop();
        console.log("upgrade required...");
        return;
      }

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        let intermediate = !event.results[i].isFinal;
        let text = event.results[i][0].transcript;
        let latestWord = text.split(" ").pop();
        let normalizedWord = this.normalize(latestWord);

        if (this.onNextWord) {
          this.onNextWord(latestWord, normalizedWord, intermediate);
        }

        if (this.onNewTranscript) {
          this.onNewTranscript(text, intermediate);
        }
      }
    };

    return recognition;
  }

  normalize(input) {
    return this.normalizer(input);
  }

  start() {
    if (this.recognizing) {
      return;
    }

    this.stopped = false;

    console.log("start");
    this.recognition.start();
  }

  stop() {
    if (!this.recognizing) {
      return;
    }
    this.stopped = true;
    console.log("stop");
    this.recognition.stop();
  }

  restart() {
    this.interimTranscript = "";
    this.stop();
    this.start();
  }

  getInterimTranscript() {
    return this.interimTranscript;
  }
}

window.SpeechRecog = SpeechRecog;
