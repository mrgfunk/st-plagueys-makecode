//  Level 1
function Level1(): Sprite {
    tiles.setCurrentTilemap(tilemap`level1`)
    let player_character = sprites.create(assets.image`player_character`, SpriteKind.Player)
    controller.moveSprite(player_character)
    scene.cameraFollowSprite(player_character)
    tiles.placeOnTile(player_character, tiles.getTileLocation(0, 7))
    return player_character
}

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

//  End of Game
function GameOver() {
    game.setGameOverMessage(true, "GAME OVER!")
    game.setGameOverEffect(true, effects.confetti)
    game.gameOver(true)
    return
}

//  Auto Stuff
let cutscene_character : Sprite = null
let player_name = ""
//  Game Start
// Intro()
let pc = Level1()
