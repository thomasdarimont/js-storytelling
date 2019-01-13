class SpeechRecog {
  constructor(speechRecogConfig = {}) {
    this.recognizing = false;
    this.recognition = this.initSpeechRecognitation(speechRecogConfig);
  }

  getTextDimension(txt, fontname, fontsize) {
    if (this.getTextDimension.c === undefined) {
      this.getTextDimension.c = document.createElement("canvas");
      this.getTextDimension.ctx = this.getTextDimension.c.getContext("2d");
    }

    let ctx = this.getTextDimension.ctx;
    let fontString = fontsize + "px " + fontname;
    ctx.font = fontString;
    return {
      // height does look as it was never implemented...
      width: ctx.measureText(txt).width,
      height: ctx.measureText(txt).height
    };
  }

  getTargetFontSize(txt, targetWidth, targetheight, fontname) {
    // minimum
    let size = 1;
    let stepsize = 20;
    let actualWidth = this.getTextDimension(txt, fontname, size + stepsize)
      .width;
    //let actualHeight = this.getTextDimension(txt, fontname, size + stepsize).height;
    console.log(actualWidth, targetWidth);
    while (actualWidth < targetWidth) {
      //&& (actualHeight < targetheight)) {
      // console.log(actualWidth, targetWidth, size);
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
      console.log("recognition end...")
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

      let fontFamily = "DejaVu Sans Mono";
      let keyword = document.getElementById("keyword");
      let visu = document.getElementById("visualization");

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (!event.results[i].isFinal) {
          let text = event.results[i][0].transcript;

          let word = text.split(" ").pop();
          let fontSize = this.getTargetFontSize(
            word,
            0.8 * visu.offsetWidth,
            0.8 * visu.offsetHeight,
            fontFamily
          );
          // console.log(word, fontSize);

          let normalizedWord = this.normalize(word);

          keyword.innerText = normalizedWord;
          keyword.style.font = fontSize + "px " + fontFamily;
          //keyword.style.fontSize = fontSize + "vh";

          // Uncomment to for completary colors

          // let wordInfo = window.mappings.lookup(normalizedWord);
          // if (!wordInfo) {
          //   continue;
          // }

          // console.log(normalizedWord, wordInfo);

          // let fontColor =
          //   wordInfo.Colour === "None" || !wordInfo.Colour
          //     ? "black"
          //     : wordInfo.Colour;
          
          // keyword.style.color = fontColor;
          // let bgColor = this.computeBackgroundColor(fontColor);
          // visualization.style.backgroundColor = bgColor;
          
        }
      }
    };

    return recognition;
  }

  computeBackgroundColor(fontColor) {
    if (fontColor == "black") {
      return "white";
    }

    if (fontColor == "white") {
      return "black";
    }

    let bgColor = window.colorComplement(fontColor);
    let bgRgb = "rgb(" + bgColor.r + "," + bgColor.g + "," + bgColor.b + ")";
    return bgRgb;
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
  lang: "de-DE"
});

btn_start.onclick = recog.start.bind(recog);
btn_stop.onclick = recog.stop.bind(recog);
