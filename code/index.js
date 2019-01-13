import { createKeywordTypeNode, isLineBreak } from "typescript";

class SpeechRecog {
  constructor(speechRecogConfig = {}) {
    this.recognizing = false;
    this.recognition = this.initSpeechRecognitation(speechRecogConfig);
  }

  getTextDimension(txt, fontname, fontsize) {
    if (this.getTextDimension.c === undefined) {
      this.getTextDimension.c = document.createElement('canvas');
      this.getTextDimension.ctx = this.getTextDimension.c.getContext('2d');
    }
    let fontString = fontsize + 'px ' + fontname;
    this.getTextDimension.ctx.font = fontString;
    return {
      // height does look as it was never implemented...
      width: this.getTextDimension.ctx.measureText(txt).width, height: this.getTextDimension.ctx.measureText(txt).height
    };
  }

  getTargetFontSize(txt, targetWidth, targetheight, fontname) {
    // minimum
    let size = 1;
    let stepsize = 20;
    let actualWidth = this.getTextDimension(txt, fontname, size + stepsize).width;
    //let actualHeight = this.getTextDimension(txt, fontname, size + stepsize).height;
    console.log(actualWidth, targetWidth);
    while ((actualWidth < targetWidth)) { //&& (actualHeight < targetheight)) {
      console.log(actualWidth, targetWidth, size);
      size += stepsize;
      actualWidth = this.getTextDimension(txt, fontname, size + stepsize).width;
      //actualHeight = this.getTextDimension(txt, fontname, size + stepsize).height;
    }
    return size;
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

        if (!event.results[i].isFinal) {
          let text = event.results[i][0].transcript;
          //console.log(text);
          let fontFamily = "DejaVu Sans Mono";
          let keyword = document.getElementById("keyword");
          let visu = document.getElementById("visualization");
          let word = text.split(" ").pop();
          let fontSize = this.getTargetFontSize(word, 0.8 * visu.offsetWidth, 0.8 * visu.offsetHeight, fontFamily);
          console.log(word, fontSize);
          keyword.innerText = word;
          keyword.style.font = fontSize + 'px ' + fontFamily;
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
