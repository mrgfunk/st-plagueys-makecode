# Intro
def Intro():
    global player_name
    game.splash("St Plaguey's", "Made by Programming Club")
    player_name = game.ask_for_string("Enter your name...")
    return
def GameOver():
    game.set_game_over_message(True, "GAME OVER!")
    game.set_game_over_effect(True, effects.confetti)
    game.game_over(True)
    return
player_name = ""
# Game Start
Intro()
GameOver()