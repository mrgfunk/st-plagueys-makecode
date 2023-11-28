# Level 1
def Level1():
    tiles.set_current_tilemap(tilemap("""level1"""))
    player_character = sprites.create(assets.image("""player_character"""), SpriteKind.player)
    controller.move_sprite(player_character)
    scene.camera_follow_sprite(player_character)
    tiles.place_on_tile(player_character, tiles.get_tile_location(0, 7))
    return player_character
# Intro
def Intro():
    global cutscene_character
    game.splash("St Plaguey's", "Made by Programming Club")
    # player_name = game.ask_for_string("Enter your name: ")
    scene.set_background_image(assets.image("""
        start_cutscene
    """))
    cutscene_character = sprites.create(assets.image("""
            player_character
        """),
        SpriteKind.player)
    cutscene_character.set_position(10, 100)
    story.sprite_say_text(cutscene_character, ":)")
    story.sprite_move_to_location(cutscene_character, 200, 100, 50)
    return
# End of Game
def GameOver():
    game.set_game_over_message(True, "GAME OVER!")
    game.set_game_over_effect(True, effects.confetti)
    game.game_over(True)
    return
# Auto Stuff
cutscene_character: Sprite = None
player_name = ""
# Game Start
#Intro()
pc = Level1()

