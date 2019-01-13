const mappings = new WordMappings();
mappings.load();

const recog = new SpeechRecog({
  continuous: true,
  interimResults: true,
  lang: "de-DE",
  normalizer: input => {
    let output = input;
    output = output.toLowerCase();
    return output;
  }
});

const colorizer = new Colorizer();

const viz = new Visualizer(recog, colorizer, mappings);

btn_start.onclick = recog.start.bind(recog);
btn_stop.onclick = recog.stop.bind(recog);
btn_restart.onclick = recog.restart.bind(recog);
