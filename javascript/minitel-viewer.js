"use strict"
let emulator = null;

window.addEventListener("load", function() {
    emulator = Minitel.startEmulators()[0];

    let stream = ""
    // let cstream = queryParameters("cstream");
    let cstream = "DAeA.AghBwDYAqACASAATAIRglqSwHkBNAggBQEkBRAZUjLiWQA1MGcWwAZbJgczABZXigEA5EcgEFJAsrLABFBQCUFNBfAUBVBRgBGsALqwA4qbXxtFeEIwBGAHSmAhgCcAJgFNEHgOReAHYAZi6BAC4AzmBiGABMjjQA9gCu4QCWQYiRAMZJADYu6W5eYAQYAMyOggCYGEEufKVkGAAszu7evn5h6QC2LikAHkoYAKyOEOldg0OIAA5uSTkAFl7RKhgedV7zQR5hUUIAagBsjoiCSYGIeX3z4aVixwDsF4LriCWRXm4Abi4MtdogRjgAOd6fPrrSKNdZgMjHACcFxoPm29TygUCXhyjzcYAAYtgTPBYKhIlIAFBUyl8ADQjPwAB0zMd0vl8j5Urckl15klIuEXPkAFyIRzIACeAFgqWBTAB1OAACQA.gAIfAUIA---";


    if(cstream) {
        stream = LZString.decompressFromBase64(
            cstream.replace(new RegExp('\\.', 'g'), '+')
                   .replace(new RegExp('_', 'g'), '/')
                   .replace(new RegExp('-', 'g'), '=')
        )
    } else {
        stream = queryParameters("stream")
    }

    for(let i = 0; i < stream.length; i++) {
        console.log(stream.charCodeAt(i));
        emulator.send([stream.charCodeAt(i)])
    }

});

function sendToEmulator(char) {
    emulator.send([char])
}

let keyPressed = [];

function endOfKeyPressed() {
    if (keyPressed.length < 57) {

        sendToEmulator(14);
        sendToEmulator(27);
        sendToEmulator(72);
        sendToEmulator(95);
        sendToEmulator(15);
        sendToEmulator(27);
        sendToEmulator(73);
        sendToEmulator(8);
    }
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    // console.log(charCode);
    if (65 <= charCode && charCode <= 90) {
        if (keyPressed.length < 58) {
            keyPressed.push(String.fromCharCode(charCode));
            sendToEmulator(parseInt(charCode));
            endOfKeyPressed()
        }
    }
    if (charCode === 13) {
        // Enter
        alert("Happy April Fools Day");
    }
    if (charCode === 32) {
        // Spance
        keyPressed.push(String.fromCharCode(32));
        sendToEmulator(32); // Space
        endOfKeyPressed();
    }
    if (charCode === 8) {
        // Backspace
        if (keyPressed.length > 0) {

            sendToEmulator(46); // Dot
            sendToEmulator(8); // Move left
            sendToEmulator(8); // Move left
            endOfKeyPressed();
            keyPressed.pop();
        }
    }

};
