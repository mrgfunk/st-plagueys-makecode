//  Intro
function Intro() {
    
    game.splash("St Plaguey's", "Made by Programming Club")
    player_name = game.askForString("Enter your name...")
    return
}

function GameOver() {
    game.setGameOverMessage(true, "GAME OVER!")
    game.setGameOverEffect(true, effects.confetti)
    game.gameOver(true)
    return
}

let player_name = ""
//  Game Start
Intro()
GameOver()
