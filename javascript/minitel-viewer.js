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
        emulator.send([stream.charCodeAt(i)])
    }

});

function sendToEmulator(char) {
    emulator.send([char])
}

let keyPressed = [];

function endOfKeyPressed() {
    if (keyPressed.length < 58) {

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

let majuscule = false;

document.onkeyup = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;

    if (charCode === 16) {
        majuscule = false;
    }
};

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;

    if (charCode === 32 || (65 <= charCode && charCode <= 90)) {
        // 32 is space, 65 to 90 is text

        let addition = 0;
        if (!majuscule && (65 <= charCode && charCode <= 90)) {
            addition = 32;
        }

        if (keyPressed.length < 58) {
            keyPressed.push(String.fromCharCode(charCode+addition));
            sendToEmulator(parseInt(charCode+addition));
            endOfKeyPressed()
        }
    }
    if (charCode === 16) {
        majuscule = true;
    }
    if (charCode === 13) {
        // Enter
        alert("Happy April Fools Day");
    }
    if (charCode === 8) {
        // Backspace
        if (keyPressed.length > 0) {
            if (keyPressed.length == 58) {
                sendToEmulator(8); // Move left
                sendToEmulator(46); // Dot
                sendToEmulator(8); // Move left
            } else {
                sendToEmulator(46); // Dot
                sendToEmulator(8); // Move left
                sendToEmulator(8); // Move left
            }
            keyPressed.pop();
            endOfKeyPressed();
        }
    }
};
