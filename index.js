import { parse } from 'csv-parse/sync'
import random from 'random'
import _ from 'lodash'
import fs from 'fs'
import gm from 'gm'

const tuftTsv = `Idol_Tuft	0.3
Sailor_Tuft	0.3
Believed_Tuft	0.4
Neko_Tuft	1
Emo_Tuft	5
Sprigs_Tuft	5
Curled_Tuft	5
Trio_Tuft	6
Bushy_Tuft	8
Relaxed_Tuft	8
Pretentious_Tuft	5
Swirly_Tuft	5
Horned_Tuft	1
Suave_Tuft	10
Agohe_Tuft	10
Comfy_Tuft	10
Lefty_Tuft	10
Sprig_Tuft	10`

const eyeTsv = `Bottom_Eyes	10
GiantMutant_Eyes	1
Pensive_Eyes	8
Sad_Eyes	8
Cheery_Eyes	7
Waifu_Eyes	1
Visor_Eyes	1
Blazed_Eyes	8
Shocked_Eyes	4
Content_Eyes	4
Focused_Eyes	8
Existential_Eyes	5
Devious_Eyes	5
Space_Eyes	4
Chibi_Eyes	12
Dastardly_Eyes	14`

const beakTsv = `Golden_Beak	1
Gray_Beak	10
Yellow_Beak	15
Purple_Beak	10
Green_Beak	10
Magenta_Beak	10
Blue_Beak	10
DarkOrange_Beak	17
Orange_Beak	17`

const shirtTsv = `MahWife_Shirt	1
Meow_Shirt	2
Haato_Shirt	3
Joy_Shirt	3
Prism_Shirt	3
Winged_Shirt	3
Devil_Shirt	3
Game_Shirt	0.09
Golden_Shirt	0.01
Smiley_Shirt	2
Comfy_Shirt	4
Cozy_Shirt	4
Orange_Shirt	4
Purple_Shirt	4
DarkBlue_Shirt	4
Swag_Shirt	0.9
Palestine_Shirt	2
FreeSyrian_Shirt	2
Pan_Shirt	2
Bisexual_Shirt	2
Transgender_Shirt	2
Asexual_Shirt	2
Gay_Shirt	2
Lesbian_Shirt	2
Taiwan_Shirt	2
FemboyHooters_Shirt	2
Button_Shirt	3
Blossom_Shirt	3
Cup_Shirt	3
GM_Shirt	3
Tank_Shirt	3
Wet_Shirt	3
Tattered_Shirt	3
Commie_Shirt	3
Graffiti_Shirt	3
Praise_Shirt	3
Skully_Shirt	3
Sailor_Alt_Shirt	0.75
Sailor_Shirt	0.25
Blue_Tie_Shirt	2
Red_Tie_Shirt	2
None_Shirt	1`

const tailTsv = `Left_Fluffy_Tail	16
Right_Fluffy_Tail	16
Left_Alt_Tail	17
Right_Alt_Tail	17
Left_Normal_Tail	17
Right_Normal_Tail	17`

const feetTsv = `HotPink_Feet	5
Golden_Feet	1
Yellow_Feet	15
Gray_Feet	5
Orangered_Feet	25
Lighter_Green_Feet	5
Purple_Feet	5
Red_Feet	5
Blue_Feet	5
Orange_Feet	29`

const backgroundTsv = `Gray_BG	10
Purple_BG	10
Pink_BG	10
Blue_BG	20
Green_BG	10
Indigo_BG	10
Orange_BG	10
Red_BG	10
Yellow_BG	10`

let tuftSupply = []
let records = parse(tuftTsv, {
    delimiter: '\t'
})
records.forEach(r => {
    const num = Number(r[1]) * 100

    for(let i = 0; i < num; i++) {
        tuftSupply.push(r[0])
    }
})


let eyeSupply = []
records = parse(eyeTsv, {
    delimiter: '\t'
})
records.forEach(r => {
    const num = Number(r[1]) * 100

    for(let i = 0; i < num; i++) {
        eyeSupply.push(r[0])
    }
})


let beakSupply = []
records = parse(beakTsv, {
    delimiter: '\t'
})
records.forEach(r => {
    const num = Number(r[1]) * 100

    for(let i = 0; i < num; i++) {
        beakSupply.push(r[0])
    }
})


let shirtSupply = []
records = parse(shirtTsv, {
    delimiter: '\t'
})
records.forEach(r => {
    const num = Number(r[1]) * 100

    for(let i = 0; i < num; i++) {
        shirtSupply.push(r[0])
    }
})


let tailSupply = []
records = parse(tailTsv, {
    delimiter: '\t'
})
records.forEach(r => {
    const num = Number(r[1]) * 100

    for(let i = 0; i < num; i++) {
        tailSupply.push(r[0])
    }
})


let feetSupply = []
records = parse(feetTsv, {
    delimiter: '\t'
})
records.forEach(r => {
    const num = Number(r[1]) * 100

    for(let i = 0; i < num; i++) {
        feetSupply.push(r[0])
    }
})

let bgSupply = []
records = parse(backgroundTsv, {
    delimiter: '\t'
})
records.forEach(r => {
    const num = Number(r[1]) * 100

    for(let i = 0; i < num; i++) {
        bgSupply.push(r[0])
    }
})

function getPrettyName(attribute) {
    const split = attribute.split("_")

    return split.length == 3 ? camelPad(split[0]) + " " + camelPad(split[1]) : camelPad(split[0])
}

function camelPad(str){ return str
    // Look for long acronyms and filter out the last letter
    .replace(/([A-Z]+)([A-Z][a-z])/g, ' $1 $2')
    // Look for lower-case letters followed by upper-case letters
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    // Look for lower-case letters followed by numbers
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/^./, function(str){ return str.toUpperCase(); })
    // Remove any white space left around the word
    .trim()
}

let generated = 0
let stacks = []

function getRandomIndices() {
    const tuftIndex = random.int(0, tuftSupply.length-1)
    const eyeIndex = random.int(0, eyeSupply.length-1)
    const beakIndex = random.int(0, beakSupply.length-1)
    const shirtIndex = random.int(0, shirtSupply.length-1)
    const tailIndex = random.int(0, tailSupply.length-1)
    const feetIndex = random.int(0, feetSupply.length-1)
    const bgIndex = random.int(0, bgSupply.length-1)

    return { tuftIndex, eyeIndex, beakIndex, shirtIndex, tailIndex, feetIndex, bgIndex }
}

function getForcedCombo(combo) {
    let indices = {}

    if(combo.tuft) {
        indices.tuftIndex = tuftSupply.indexOf(combo.tuft)
    } else indices.tuftIndex = random.int(0, tuftSupply.length-1)

    if(combo.eye) {
        indices.eyeIndex = eyeSupply.indexOf(combo.eye)
    } else indices.eyeIndex = random.int(0, eyeSupply.length-1)

    if(combo.beak) {
        indices.beakIndex = beakSupply.indexOf(combo.beak)
    } else indices.beakIndex = random.int(0, beakSupply.length-1)

    if(combo.shirt) {
        indices.shirtIndex = shirtSupply.indexOf(combo.shirt)
    } else indices.shirtIndex = random.int(0, shirtSupply.length-1)

    if(combo.tail) {
        indices.tailIndex = tailSupply.indexOf(combo.tail)
    } else indices.tailIndex = random.int(0, tailSupply.length-1)

    if(combo.feet) {
        indices.feetIndex = feetSupply.indexOf(combo.feet)
    } else indices.feetIndex = random.int(0, feetSupply.length-1)

    if(combo.bg) {
        indices.bgIndex = bgSupply.indexOf(combo.bg)
    } else indices.bgIndex = random.int(0, bgSupply.length-1)

    return indices
}

let forcedCombos = {}
forcedCombos[0] = { beak: "Gray_Beak", shirt: "Blossom_Shirt", feet: "HotPink_Feet", bg: "Purple_BG", tuft: "Neko_Tuft", eye: "Cheery_Eyes", tail: "Right_Alt_Tail" }
forcedCombos[3] = { beak: "Blue_Beak", shirt: "Transgender_Shirt", feet: "Blue_Feet", eye: "Chibi_Eyes", bg: "Purple_BG", tuft: "Lefty_Tuft"}
forcedCombos[5] = { beak: "Yellow_Beak", shirt:"Sailor_Shirt", feet: "Yellow_Feet", eye: "Waifu_Eyes", tuft: "Sailor_Tuft"}
forcedCombos[7] = { beak: "Golden_Beak", shirt: "Golden_Shirt", feet: "Golden_Feet", bg: "Red_BG" }
forcedCombos[8] = { beak: "Magenta_Beak", shirt: "Lesbian_Shirt", feet: "Orange_Feet", eye: "Chibi_Eyes", bg: "Blue_BG", tuft: "Sailor_Tuft"}
forcedCombos[9] = { beak: "Yellow_Beak", shirt: "FreeSyrian_Shirt", feet: "Yellow_Feet", eye: "Pensive_Eyes", bg: "Red_BG"}
forcedCombos[12] = { beak: "Yellow_Beak", shirt: "FreeSyrian_Shirt", feet: "Yellow_Feet", eye: "Dastardly_Eyes", bg: "Red_BG"}
forcedCombos[14] = { beak: "Green_Beak", shirt: "Palestine_Shirt", feet: "Lighter_Green_Feet", eye: "Pensive_Eyes", bg: "Green_BG"}
forcedCombos[15] = { beak: "Magenta_Beak", shirt: "Palestine_Shirt", feet: "Red_Feet", eye: "Pensive_Eyes", bg: "Red_BG"}
forcedCombos[16] = { beak: "Orange_Beak", shirt: "Taiwan_Shirt", feet: "Red_Feet", eye: "Pensive_Eyes", bg: "Blue_BG", tuft: "Swirly_Tuft"}
forcedCombos[17] = { beak: "Green_Beak", shirt: "Praise_Shirt", feet: "Lighter_Green_Feet", eye: "Blazed_Eyes", bg: "Green_BG"}
forcedCombos[18] = { beak: "Magenta_Beak", shirt: "Transgender_Shirt", feet: "Red_Feet", eye: "Cheery_Eyes", bg: "Pink_BG", tuft: "Relaxed_Tuft"}
forcedCombos[19] = { beak: "Orange_Beak", shirt: "FemboyHooters_Shirt", feet: "HotPink_Feet", eye: "Cheery_Eyes", bg: "Pink_BG", tuft: "Idol_Tuft"}
forcedCombos[20] = { beak: "Orange_Beak", shirt: "MahWife_Shirt", feet: "Orange_Feet", eye: "Cheery_Eyes", bg: "Green_BG", tuft: "Trio_Tuft"}
forcedCombos[22] = { beak: "Yellow_Beak", shirt: "FemboyHooters_Shirt", feet: "Orange_Feet", eye: "Space_Eyes", bg: "Blue_BG", tuft: "Trio_Tuft"}
forcedCombos[27] = { shirt: "Transgender_Shirt"}
forcedCombos[30] = { beak: "Green_Beak", shirt: "Haato_Shirt", feet: "Lighter_Green_Feet", eye: "Bottom_Eyes", bg: "Blue_BG", tuft: "Emo_Tuft"}
forcedCombos[50] = { shirt: "FemboyHooters_Shirt"}
forcedCombos[61] = { shirt: "Transgender_Shirt"}
forcedCombos[69] = { beak: "Magenta_Beak", shirt: "FemboyHooters_Shirt", feet: "Red_Feet", eye: "Cheery_Eyes", bg: "Orange_BG", tuft: "Swirly_Tuft"}
forcedCombos[80] = { beak: "Orange_Beak", shirt: "Tank_Shirt", feet: "Orange_Feet", eye: "Pensive_Eyes", bg: "Blue_BG", tuft: "Idol_Tuft"}

while(generated < 10000) {
    const indices = forcedCombos[generated] ? getForcedCombo(forcedCombos[generated]) : getRandomIndices()

    const { tuftIndex, eyeIndex, beakIndex, shirtIndex, tailIndex, feetIndex, bgIndex } = indices

    const stack = [bgSupply[bgIndex], "Shadow_Base", feetSupply[feetIndex], tailSupply[tailIndex], 
                    "Body_Base", shirtSupply[shirtIndex], "Head_Base", eyeSupply[eyeIndex], tuftSupply[tuftIndex], beakSupply[beakIndex]]

    stacks.push(stack)

    let token = {
        name: `Dastardly Duck #${generated.toString().padStart(4, '0')}`,
        description: "A duck that lives on the blockchain!",
        attributes: [
            {
                trait_type: "Tuft",
                value: getPrettyName(tuftSupply[tuftIndex])
            },
            {
                trait_type: "Eyes",
                value: getPrettyName(eyeSupply[eyeIndex])
            },
            {
                trait_type: "Beak",
                value: getPrettyName(beakSupply[beakIndex])
            },
            {
                trait_type: "Shirt",
                value: getPrettyName(shirtSupply[shirtIndex])
            },
            {
                trait_type: "Tail",
                value: getPrettyName(tailSupply[tailIndex])
            },
            {
                trait_type: "Feet",
                value: getPrettyName(feetSupply[feetIndex])
            },
            {
                trait_type: "Background",
                value: getPrettyName(bgSupply[bgIndex])
            }
        ],
        image: `{IPFS_PATH}/${generated}.png`
    }

    fs.writeFileSync("./tokens/" + generated, JSON.stringify(token))

    console.log(`Data for #${generated} generated.`)

    tuftSupply = tuftSupply.slice(0, tuftIndex).concat(tuftSupply.slice(tuftIndex+1))
    eyeSupply = eyeSupply.slice(0, eyeIndex).concat(eyeSupply.slice(eyeIndex+1))
    beakSupply = beakSupply.slice(0, beakIndex).concat(beakSupply.slice(beakIndex+1))
    shirtSupply = shirtSupply.slice(0, shirtIndex).concat(shirtSupply.slice(shirtIndex+1))
    tailSupply = tailSupply.slice(0, tailIndex).concat(tailSupply.slice(tailIndex+1))
    feetSupply = feetSupply.slice(0, feetIndex).concat(feetSupply.slice(feetIndex+1))
    bgSupply = bgSupply.slice(0, bgIndex).concat(bgSupply.slice(bgIndex+1))

    generated++
}

const writeStack = (id, stack) => {
    if(stack[0].indexOf("BG") !== -1) {
        gm("./layers/" + stack[0] + ".png").composite("./layers/Shadow_Base.png").write("./images/" + id + ".png", () => {
            writeStack(id, stack.slice(2))
        })
    } else {
        gm("./images/" + id + ".png").composite("./layers/" + stack[0] + ".png").write("./images/" + id + ".png", () => {
            if(stack.length > 1)
                writeStack(id, stack.slice(1))
            else {
                console.log(`${id} finished generating image.`)
            }
                
        })
    }
}

let index = 0

setInterval(() => {
    if(index < 10000) {
        writeStack(index, stacks[index])
    }
    index++
}, 150)