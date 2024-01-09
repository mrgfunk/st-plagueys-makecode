# Classroom 1
def classroom1():
    global player_character
    global cutscene_character
    sprites.destroy(cutscene_character)
    tiles.set_current_tilemap(tilemap("""
        level1
    """))
    player_character = sprites.create(assets.image("""
            player_character
        """),
        SpriteKind.player)
    controller.move_sprite(player_character)
    scene.camera_follow_sprite(player_character)
    tiles.place_on_tile(player_character, tiles.get_tile_location(0, 7))
    return player_character
def opening():
    game.splash("St Plaguey's", "Made by Programming Club")
    #player_name = game.ask_for_string("Enter your name: ")
    return
# Intro
def intro():
    global cutscene_character   
    
    tiles.set_current_tilemap(None)
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
cutscene_character: Sprite = None
player_character: Sprite = None
player_name = ""
# Auto Stuff
classroom = 0
# Game Start
intro()
pc = classroom1()
def on_overlap_tile(sprite, location):
    #sprites.destroy(sprite)
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
    #intro()
scene.on_overlap_tile(SpriteKind.player, img("""
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
"""), on_overlap_tile)