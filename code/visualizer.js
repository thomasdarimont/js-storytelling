class Visualizer {
  constructor(recog, colorizer, mappings) {
    this.recog = recog.withWordListener(this.onNextWord.bind(this)); //
    this.recog = recog.withTranscriptListener(this.onNewTranscript.bind(this)); //

    this.colorizer = colorizer;
    this.mappings = mappings;

    this.keyword = document.getElementById("keyword");
    this.transcript = document.getElementById("transcript");
    this.visu = document.getElementById("visualization");
    this.fontFamily = this.unquote(
      this.getCssPropertyValue(this.keyword, "font-family")
    );
  }

  unquote(s) {
    return s.replace(/"/g, "");
  }

  getCssPropertyValue(element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
  }

  onNewTranscript(transcript, intermediate) {
    if (intermediate) {
      return;
    }

    this.transcript.innerText += transcript;
  }

  onNextWord(word, normalizedWord, intermediate) {
    // if (!normalizedWord) {
    //   return;
    // }

    // if (this.mappings.isStopWord(normalizedWord)) {
    //   return;
    // }

    let cleansedWord = word.replace(/\?\.\,\;\&/g, "");

    let fontSize = this.getTargetFontSize(
      cleansedWord,
      0.4 * this.visu.offsetWidth,
      this.fontFamily
    );

    this.keyword.innerText = cleansedWord;
    this.keyword.style.font = fontSize + "px " + this.fontFamily;
    //this.keyword.style.fontSize = fontSize + "vh";

    // let fontColor =
    //   wordInfo.Colour === undefined || wordInfo.Colour == "None"
    //     ? "#00ffff"
    //     : wordInfo.Colour;
    // if (fontColor === "black") {
    //   fontColor = "#a9a9a9";
    // }

    // if (fontColor === "white") {
    //   fontColor = "#d3d3d3";
    // }
    // let bgColor = this.colorizer.complement(fontColor);

    // console.log(word, wordInfo, fontColor, bgColor);

    // this.keyword.style.color = fontColor;
    // this.visu.style.backgroundColor = bgColor;
  }

  getTextDimension(txt, fontname, fontsize) {
    let ctx = this.getTextDimension.ctx;
    if (!ctx) {
      let cvs = document.createElement("canvas");
      ctx = this.getTextDimension.ctx = cvs.getContext("2d");
    }

    ctx.font = fontsize + "px " + fontname;

    const metrics = ctx.measureText(txt);
    return {
      width: metrics.width,
      height: metrics.height
    };
  }

  getTargetFontSize(txt, targetWidth, fontname) {
    let size = 1;
    let stepsize = 10;

    do {
      size += stepsize;
    } while (
      this.getTextDimension(txt, fontname, size).width < targetWidth
    );

    return size;
  }
}

window.Visualizer = Visualizer;
