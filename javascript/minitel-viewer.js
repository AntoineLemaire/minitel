"use strict"
window.addEventListener("load", function() {
    const emulator = Minitel.startEmulators()[0]

    let stream = ""
    const cstream = "DAeA.AghBwDYAqACASAATAIRglqSwHkBNAggBQEkBRAZUjLiWQA1MGcWwAZbJgczABZXigEA5EcgEFJAsrLABFBQCUFNBfAUBVBRgBGsALqwA4qbXxtFeEIwBGAHSmAhgCcAJgFNEHgOReAHYAZi6BAC4AzmBiGABMjjQA9gCu4QCWQYiRAMZJADYu6W5eYAQYAMyOggCYGEEufKVkGAAszu7evn5h6QC2LikAHkoYAKyOEOldg0OIAA5uSTkAFl7RKhgedV7zQR5hUUIAagBsjoiCSYGIeX3z4aVixwDsF4LriCWRXm4Abi4MtdogRjgAOd6fPrrSKNdZgMjHACcFxoPm29TygUCXhyjzcYAAYhg4CZ4LBUJFkF4ALAAKAZAEgqbS6QBoNmMtn4AA6ZmO6Xy.R8qVuSS68ySkXCLnyAC5EI5kAR6YylV4gA";

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
})
