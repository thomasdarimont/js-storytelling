
const Harmonizer = require('../node_modules/color-harmony/lib/color-harmony').Harmonizer;

class Colorizer {

    constructor() {
        this.harmonizer = new Harmonizer();
    }

    complement(colorName) {
        return this.harmonizer.harmonize(colorName, 'complementary')[1];
    }
}

window.Colorizer = Colorizer;