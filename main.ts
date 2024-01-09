//  Classroom 1
function classroom1(): Sprite {
    
    
    sprites.destroy(cutscene_character)
    tiles.setCurrentTilemap(tilemap`
        level1
    `)
    player_character = sprites.create(assets.image`
            player_character
        `, SpriteKind.Player)
    controller.moveSprite(player_character)
    scene.cameraFollowSprite(player_character)
    tiles.placeOnTile(player_character, tiles.getTileLocation(0, 7))
    return player_character
}

function opening() {
    game.splash("St Plaguey's", "Made by Programming Club")
    // player_name = game.ask_for_string("Enter your name: ")
    return
}

//  Intro
function intro() {
    
    tiles.setCurrentTilemap(null)
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

let cutscene_character : Sprite = null
let player_character : Sprite = null
let player_name = ""
//  Auto Stuff
let classroom = 0
//  Game Start
intro()
let pc = classroom1()
// intro()
scene.onOverlapTile(SpriteKind.Player, img`
    . . . 6 6 6 6 6 6 6 6 6 6 . . .
    . 6 6 7 7 7 7 7 7 7 7 7 7 6 6 .
    . 6 7 7 7 7 7 7 7 7 7 7 7 7 6 .
    6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 6
    6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 6
    6 7 6 7 7 7 7 7 7 7 7 7 7 6 7 6
    8 6 7 7 7 7 7 7 7 7 7 7 7 7 6 8
    8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8
    6 7 6 7 7 7 6 7 7 7 7 6 7 7 7 6
    6 8 6 7 7 6 7 7 7 6 7 7 6 6 8 6
    8 6 6 7 6 6 7 7 6 6 6 7 6 6 6 8
    8 6 8 6 6 6 7 6 6 6 6 6 8 6 6 8
    8 8 6 6 8 6 6 6 8 6 6 6 8 8 8 8
    . f 6 e e 8 6 6 8 8 6 8 8 8 f .
    . . f e e e 6 e 8 8 f f 8 f . .
    . . . f f f 8 e e f f f f . . .
`, function on_overlap_tile(sprite: Sprite, location: tiles.Location) {
    // sprites.destroy(sprite)
    scene.setBackgroundImage(assets.image`
            start_cutscene
        `)
    let cutscene_character = sprites.create(assets.image`
                player_character
            `, SpriteKind.Player)
    cutscene_character.setPosition(10, 100)
    story.spriteSayText(cutscene_character, ":)")
    story.spriteMoveToLocation(cutscene_character, 200, 100, 50)
})
