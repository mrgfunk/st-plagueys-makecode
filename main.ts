//  Intro
function Intro() {
    
    game.splash("St Plaguey's", "Made by Programming Club")
    //  player_name = game.ask_for_string("Enter your name: ")
    scene.setBackgroundImage(assets.image`
        start_cutscene
    `)
    cutscene_character = sprites.create(assets.image`
            player_character
        `, SpriteKind.Player)
    cutscene_character.setPosition(10, 100)
    story.spriteSayText(cutscene_character, ":)")
    story.spriteMoveToLocation(cutscene_character, 200, 100, 50)
    return
}

function GameOver() {
    game.setGameOverMessage(true, "GAME OVER!")
    game.setGameOverEffect(true, effects.confetti)
    game.gameOver(true)
    return
}

let cutscene_character : Sprite = null
let player_name = ""
//  Game Start
Intro()
GameOver()
