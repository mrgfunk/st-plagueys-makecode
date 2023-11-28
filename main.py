# Global Variables
player_character:Sprite = None
player_name = "Daisy"
level = 0
# Toolbar variables
all_foods: List[Inventory.Item] = []
toolbar: Inventory.Toolbar = None
toolbar_selected: bool = None
toolbar_visible: bool = None
# Level specific variables
level1_chest_opened = False

def FreezePlayer(ms=500):
    player_character.set_velocity(0, 0)
    controller.move_sprite(player_character, 0, 0)
    pause(ms)
    controller.move_sprite(player_character)
    return

def HideToolbar():
    global toolbar, toolbar_visible, toolbar_selected
    toolbar_selected = False
    toolbar_visible = False
    toolbar.set_flag(SpriteFlag.INVISIBLE, True)
    return

def ShowToolbar():
    global toolbar, toolbar_visible, toolbar_selected
    toolbar_selected = False
    toolbar_visible = True
    toolbar.set_flag(SpriteFlag.INVISIBLE, False)
    return

def CreateToolbar():
    global toolbar
    toolbar = Inventory.create_toolbar([], 7)
    toolbar.left = 4
    toolbar.bottom = scene.screen_height() - 4
    toolbar.z = 100
    toolbar.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    # Hide toolbar on creation
    toolbar.set_flag(SpriteFlag.INVISIBLE, True)
    # Update globale variables
    toolbar_selected = False
    toolbar_visible = False
    toolbar.set_color(ToolbarColorAttribute.BOX_OUTLINE, 1)
    return

def AddToolbarItem(item):
    global toolbar
    if len(toolbar.get_items()) < toolbar.get_number(ToolbarNumberAttribute.MAX_ITEMS):
        toolbar.get_items().append(item)
    toolbar.update()
    return

def on_hit_wall(sprite, location):
    player_location = sprite.tilemap_location()
    if level == 1:
        # Check if we are at the north door
        if sprite.tile_kind_at(TileDirection.BOTTOM,
            img("""
                a c c a c c c c c c c c a c c a
                c d d b c c c f f c c c b d d c
                c d d b f f f f c c c f b d d c
                c d d b f c c f f f f f b d d c
                c d d b f f f f f f f f b d d c
                c b b c f f f f f f f f c b b c
                c d d b f f f f f f f f b d d c
                c d d b f f f f f f f f b d d c
                c d d b f f f f f f f f b d d c
                c d d b f f f f f f f f b d d c
                c b b b f f f f f f f f b b b c
                c c c c c c c c c c c c c c c c
                c d d d d d d d d d d d d d d c
                c d d d d d d d d d d d d d d c
                c b b b b b b b b b b b b b b c
                c b b b b b b b b b b b b b b c
            """)):
            # Check which door
            door_location = tiles.get_tile_location(7, 3)
            if player_location.x == door_location.x and player_location.y == door_location.y:
                # Change scene to inner_room
                scene.set_tile_map_level(None)
                sprites.destroy(sprite)
                Level2(3, 1)
        # Check west door
        elif sprite.tile_kind_at(TileDirection.RIGHT, img("""
            a c c c c c c c c c c c c c c c
            c d d d d b d d d d b c d d b b
            c d d d d b d d d d b c d d b b
            a b b b b c b b b b b c d d b b
            c c f f f f f f f f f c d d b b
            c c c f f f f f f f f c d d b b
            c c c f f f f f f f f c d d b b
            c f c f f f f f f f f c d d b b
            c f f f f f f f f f f c d d b b
            c c f c f f f f f f f c d d b b
            c c f c f f f f f f f c d d b b
            c c f f f f f f f f f c d d b b
            a b b b b c b b b b b c d d b b
            c d d d d b d d d d b c d d b b
            c d d d d b d d d d b c d d b b
            a c c c c c c c c c c c c c c c
        """)):
            door_location = tiles.get_tile_location(3, 7)
            if player_location.x == door_location.x and player_location.y == door_location.y:
                scene.set_tile_map_level(None)
                sprites.destroy(sprite)
                Level2(1, 3)
        # Check east door
        elif sprite.tile_kind_at(TileDirection.LEFT, img("""
            c c c c c c c c c c c c c c c a
            b b d d c b d d d d b d d d d c
            b b d d c b d d d d b d d d d c
            b b d d c b b b b b c b b b b a
            b b d d c f f f f f f f f f c c
            b b d d c f f f f f f f c f c c
            b b d d c f f f f f f f c f c c
            b b d d c f f f f f f f f f f c
            b b d d c f f f f f f f f c f c
            b b d d c f f f f f f f f c c c
            b b d d c f f f f f f f f c c c
            b b d d c f f f f f f f f f c c
            b b d d c b b b b b c b b b b a
            b b d d c b d d d d b d d d d c
            b b d d c b d d d d b d d d d c
            c c c c c c c c c c c c c c c a
        """)):
            door_location = tiles.get_tile_location(11, 7)
            if player_location.x == door_location.x and player_location.y == door_location.y:
                scene.set_tile_map_level(None)
                sprites.destroy(sprite)
                Level2(5, 3)
        # Check south door
        elif sprite.tile_kind_at(TileDirection.TOP, img("""
            c b b b b b b b b b b b b b b c
            c b b b b b b b b b b b b b b c
            c d d d d d d d d d d d d d d c
            c d d d d d d d d d d d d d d c
            c c c c c c c c c c c c c c c c
            c b b b f f f f f f f f b b b c
            c d d b f f f f f f f f b d d c
            c d d b f f f f f f f f b d d c
            c d d b f f f f f f f f b d d c
            c d d b f f f f f f f f b d d c
            c b b c f f f f f f f f c b b c
            c d d b f f f f f f f f b d d c
            c d d b f f f f f c c f b d d c
            c d d b f c c c f f f f b d d c
            c d d b c c c f f c c c b d d c
            a c c a c c c c c c c c a c c a
        """)):
            door_location = tiles.get_tile_location(7, 11)
            if player_location.x == door_location.x and player_location.y == door_location.y:
                scene.set_tile_map_level(None)
                sprites.destroy(sprite)
                Level2(3, 5)
    elif level == 2:
        # Check if we are at the north door
        if sprite.tile_kind_at(TileDirection.TOP,
            img("""
                c b b b b b b b b b b b b b b c
                c b b b b b b b b b b b b b b c
                c d d d d d d d d d d d d d d c
                c d d d d d d d d d d d d d d c
                c c c c c c c c c c c c c c c c
                c b b b f f f f f f f f b b b c
                c d d b f f f f f f f f b d d c
                c d d b f f f f f f f f b d d c
                c d d b f f f f f f f f b d d c
                c d d b f f f f f f f f b d d c
                c b b c f f f f f f f f c b b c
                c d d b f f f f f f f f b d d c
                c d d b f f f f f c c f b d d c
                c d d b f c c c f f f f b d d c
                c d d b c c c f f c c c b d d c
                a c c a c c c c c c c c a c c a
            """)):
            # Check which door
            door_location = tiles.get_tile_location(3, 1)
            if player_location.x == door_location.x and player_location.y == door_location.y:
                # Change scene to inner_room
                scene.set_tile_map_level(None)
                sprites.destroy(sprite)
                Level1(7, 3)
        # Check west door
        elif sprite.tile_kind_at(TileDirection.LEFT, img("""
            c c c c c c c c c c c c c c c a
            b b d d c b d d d d b d d d d c
            b b d d c b d d d d b d d d d c
            b b d d c b b b b b c b b b b a
            b b d d c f f f f f f f f f c c
            b b d d c f f f f f f f c f c c
            b b d d c f f f f f f f c f c c
            b b d d c f f f f f f f f f f c
            b b d d c f f f f f f f f c f c
            b b d d c f f f f f f f f c c c
            b b d d c f f f f f f f f c c c
            b b d d c f f f f f f f f f c c
            b b d d c b b b b b c b b b b a
            b b d d c b d d d d b d d d d c
            b b d d c b d d d d b d d d d c
            c c c c c c c c c c c c c c c a
        """)):
            door_location = tiles.get_tile_location(1, 3)
            if player_location.x == door_location.x and player_location.y == door_location.y:
                scene.set_tile_map_level(None)
                sprites.destroy(sprite)
                Level1(3, 7)
        # Check east door
        elif sprite.tile_kind_at(TileDirection.RIGHT, img("""
            a c c c c c c c c c c c c c c c
            c d d d d b d d d d b c d d b b
            c d d d d b d d d d b c d d b b
            a b b b b c b b b b b c d d b b
            c c f f f f f f f f f c d d b b
            c c c f f f f f f f f c d d b b
            c c c f f f f f f f f c d d b b
            c f c f f f f f f f f c d d b b
            c f f f f f f f f f f c d d b b
            c c f c f f f f f f f c d d b b
            c c f c f f f f f f f c d d b b
            c c f f f f f f f f f c d d b b
            a b b b b c b b b b b c d d b b
            c d d d d b d d d d b c d d b b
            c d d d d b d d d d b c d d b b
            a c c c c c c c c c c c c c c c
        """)):
            door_location = tiles.get_tile_location(5, 3)
            if player_location.x == door_location.x and player_location.y == door_location.y:
                scene.set_tile_map_level(None)
                sprites.destroy(sprite)
                Level1(11, 7)
        # Check south door
        elif sprite.tile_kind_at(TileDirection.BOTTOM, img("""
            a c c a c c c c c c c c a c c a
            c d d b c c c f f c c c b d d c
            c d d b f f f f c c c f b d d c
            c d d b f c c f f f f f b d d c
            c d d b f f f f f f f f b d d c
            c b b c f f f f f f f f c b b c
            c d d b f f f f f f f f b d d c
            c d d b f f f f f f f f b d d c
            c d d b f f f f f f f f b d d c
            c d d b f f f f f f f f b d d c
            c b b b f f f f f f f f b b b c
            c c c c c c c c c c c c c c c c
            c d d d d d d d d d d d d d d c
            c d d d d d d d d d d d d d d c
            c b b b b b b b b b b b b b b c
            c b b b b b b b b b b b b b b c
        """)):
            door_location = tiles.get_tile_location(3, 5)
            if player_location.x == door_location.x and player_location.y == door_location.y:
                scene.set_tile_map_level(None)
                sprites.destroy(sprite)
                Level1(7, 11)     
    return
scene.on_hit_wall(SpriteKind.player, on_hit_wall)

def OnButtonA():
    global toolbar
    if toolbar_selected:
        good_foods = ["Burger", "Drumstick", "Ham", "Pizza", "Donut"]
        bad_foods = ["Apple"]
        item = toolbar.get_items().remove_at(toolbar.get_number(ToolbarNumberAttribute.SELECTED_INDEX))
        toolbar.update()
        if item.name in good_foods:
            info.change_life_by(1)
        elif item.name in bad_foods:
            info.change_life_by(-1)
        return

    global level1_chest_opened
    if level == 1:
        # Chest closed
        if player_character.tile_kind_at(TileDirection.TOP, img("""
            . . b b b b b b b b b b b b . .
            . b e 4 4 4 4 4 4 4 4 4 4 e b .
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b
            b e e 4 4 4 4 4 4 4 4 4 4 e e b
            b e e e e e e e e e e e e e e b
            b e e e e e e e e e e e e e e b
            b b b b b b b d d b b b b b b b
            c b b b b b b c c b b b b b b c
            c c c c c c b c c b c c c c c c
            b e e e e e c b b c e e e e e b
            b e e e e e e e e e e e e e e b
            b c e e e e e e e e e e e e c b
            b b b b b b b b b b b b b b b b
            . b b . . . . . . . . . . b b .
        """)):
            player_character.say_text("It's locked...")
            FreezePlayer()
            player_character.say_text(None)
        # Chest open
        elif player_character.tile_kind_at(TileDirection.TOP, img("""
            . b b b b b b b b b b b b b b .
            b e 4 4 4 4 4 4 4 4 4 4 4 4 4 b
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b
            b e e 4 4 4 4 4 4 4 4 4 4 e e b
            b b b b b b b d d b b b b b b b
            . b b b b b b c c b b b b b b .
            b c c c c c b c c b c c c c c b
            b c c c c c c b b c c c c c c b
            b c c c c c c c c c c c c c c b
            b c c c c c c c c c c c c c c b
            b b b b b b b b b b b b b b b b
            b e e e e e e e e e e e e e e b
            b e e e e e e e e e e e e e e b
            b c e e e e e e e e e e e e c b
            b b b b b b b b b b b b b b b b
            . b b . . . . . . . . . . b b .
        """)):
            all_foods = [Inventory.create_item("Burger",
                        img("""
                            . . . . c c c b b b b b . . . .
                                    . . c c b 4 4 4 4 4 4 b b b . .
                                    . c c 4 4 4 4 4 5 4 4 4 4 b c .
                                    . e 4 4 4 4 4 4 4 4 4 5 4 4 e .
                                    e b 4 5 4 4 5 4 4 4 4 4 4 4 b c
                                    e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e
                                    e b b 4 4 4 4 4 4 4 4 4 4 4 b e
                                    . e b 4 4 4 4 4 5 4 4 4 4 b e .
                                    8 7 e e b 4 4 4 4 4 4 b e e 6 8
                                    8 7 2 e e e e e e e e e e 2 7 8
                                    e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e
                                    e c 6 7 6 6 7 7 7 6 6 7 6 c c e
                                    e b e 8 8 c c 8 8 c c c 8 e b e
                                    e e b e c c e e e e e c e b e e
                                    . e e b b 4 4 4 4 4 4 4 4 e e .
                                    . . . c c c c c e e e e e . . .
                        """)),
                    Inventory.create_item("Apple",
                        img("""
                            . . . . . . . e c 7 . . . . . .
                                    . . . . e e e c 7 7 e e . . . .
                                    . . c e e e e c 7 e 2 2 e e . .
                                    . c e e e e e c 6 e e 2 2 2 e .
                                    . c e e e 2 e c c 2 4 5 4 2 e .
                                    c e e e 2 2 2 2 2 2 4 5 5 2 2 e
                                    c e e 2 2 2 2 2 2 2 2 4 4 2 2 e
                                    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
                                    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
                                    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
                                    c e e 2 2 2 2 2 2 2 2 2 2 4 2 e
                                    . e e e 2 2 2 2 2 2 2 2 2 4 e .
                                    . 2 e e 2 2 2 2 2 2 2 2 4 2 e .
                                    . . 2 e e 2 2 2 2 2 4 4 2 e . .
                                    . . . 2 2 e e 4 4 4 2 e e . . .
                                    . . . . . 2 2 e e e e . . . . .
                        """)),
                    Inventory.create_item("Drumstick",
                        img("""
                            . . 2 2 b b b b b . . . . . . .
                                    . 2 b 4 4 4 4 4 4 b . . . . . .
                                    2 2 4 4 4 4 d d 4 4 b . . . . .
                                    2 b 4 4 4 4 4 4 d 4 b . . . . .
                                    2 b 4 4 4 4 4 4 4 d 4 b . . . .
                                    2 b 4 4 4 4 4 4 4 4 4 b . . . .
                                    2 b 4 4 4 4 4 4 4 4 4 e . . . .
                                    2 2 b 4 4 4 4 4 4 4 b e . . . .
                                    . 2 b b b 4 4 4 b b b e . . . .
                                    . . e b b b b b b b e e . . . .
                                    . . . e e b 4 4 b e e e b . . .
                                    . . . . . e e e e e e b d b b .
                                    . . . . . . . . . . . b 1 1 1 b
                                    . . . . . . . . . . . c 1 d d b
                                    . . . . . . . . . . . c 1 b c .
                                    . . . . . . . . . . . . c c . .
                        """)),
                    Inventory.create_item("Ham",
                        img("""
                            . . . . . . 2 2 2 2 . . . . . .
                                    . . . . 2 2 3 3 3 3 2 e . . . .
                                    . . . 2 3 d 1 1 d d 3 2 e . . .
                                    . . 2 3 1 d 3 3 3 d d 3 e . . .
                                    . 2 3 1 3 3 3 3 3 d 1 3 b e . .
                                    . 2 1 d 3 3 3 3 d 3 3 1 3 b b .
                                    2 3 1 d 3 3 1 1 3 3 3 1 3 4 b b
                                    2 d 3 3 d 1 3 1 3 3 3 1 3 4 4 b
                                    2 d 3 3 3 1 3 1 3 3 3 1 b 4 4 e
                                    2 d 3 3 3 1 1 3 3 3 3 1 b 4 4 e
                                    e d 3 3 3 3 d 3 3 3 d d b 4 4 e
                                    e d d 3 3 3 d 3 3 3 1 3 b 4 b e
                                    e 3 d 3 3 1 d d 3 d 1 b b e e .
                                    . e 3 1 1 d d 1 1 1 b b e e e .
                                    . . e 3 3 3 3 3 3 b e e e e . .
                                    . . . e e e e e e e e e e . . .
                        """)),
                    Inventory.create_item("Pizza",
                        img("""
                            . . . . . . b b b b . . . . . .
                                    . . . . . . b 4 4 4 b . . . . .
                                    . . . . . . b b 4 4 4 b . . . .
                                    . . . . . b 4 b b b 4 4 b . . .
                                    . . . . b d 5 5 5 4 b 4 4 b . .
                                    . . . . b 3 2 3 5 5 4 e 4 4 b .
                                    . . . b d 2 2 2 5 7 5 4 e 4 4 e
                                    . . . b 5 3 2 3 5 5 5 5 e e e e
                                    . . b d 7 5 5 5 3 2 3 5 5 e e e
                                    . . b 5 5 5 5 5 2 2 2 5 5 d e e
                                    . b 3 2 3 5 7 5 3 2 3 5 d d e 4
                                    . b 2 2 2 5 5 5 5 5 5 d d e 4 .
                                    b d 3 2 d 5 5 5 d d d 4 4 . . .
                                    b 5 5 5 5 d d 4 4 4 4 . . . . .
                                    4 d d d 4 4 4 . . . . . . . . .
                                    4 4 4 4 . . . . . . . . . . . .
                        """)),
                    Inventory.create_item("Donut",
                        img("""
                            . . . . . . b b b b a a . . . .
                                    . . . . b b d d d 3 3 3 a a . .
                                    . . . b d d d 3 3 3 3 3 3 a a .
                                    . . b d d 3 3 3 3 3 3 3 3 3 a .
                                    . b 3 d 3 3 3 3 3 b 3 3 3 3 a b
                                    . b 3 3 3 3 3 a a 3 3 3 3 3 a b
                                    b 3 3 3 3 3 a a 3 3 3 3 d a 4 b
                                    b 3 3 3 3 b a 3 3 3 3 3 d a 4 b
                                    b 3 3 3 3 3 3 3 3 3 3 d a 4 4 e
                                    a 3 3 3 3 3 3 3 3 3 d a 4 4 4 e
                                    a 3 3 3 3 3 3 3 d d a 4 4 4 e .
                                    a a 3 3 3 d d d a a 4 4 4 e e .
                                    . e a a a a a a 4 4 4 4 e e . .
                                    . . e e b b 4 4 4 4 b e e . . .
                                    . . . e e e e e e e e . . . . .
                                    . . . . . . . . . . . . . . . .
                        """))]
            food = all_foods._pick_random()
            AddToolbarItem(food)
            player_character.say_text("Look! " + food.name + "!")
            FreezePlayer()
            player_character.say_text(None)
    if level == 2:
        if player_character.tile_kind_at(TileDirection.TOP, img("""
            a a a c c a a a a a a c c a a a
            3 3 3 3 c 3 3 3 3 3 3 3 c 3 3 3
            3 3 3 a c 3 3 3 3 3 3 3 c 3 3 3
            a a a a c a a a a a a a c c a a
            c c c c c d d d d d d c c c c c
            c a 3 3 c d c 4 4 d d c 3 3 3 a
            c c a a c d c 4 4 d d c a a a a
            c c c c c b b c d b b c c c c c
            a a a c c b b c d b b c c a a a
            a a a c c b b c c b b c c a a a
            c c c c c b b c c b b c c c c c
            c a a a c b b c c b b c a a a c
            c c c c c b b b b b b c c c c c
            a a c c a c c c c c c c a a a a
            c c c c c c c c c c c c c c c c
            c c c c c c c c c c c c c c c c
        """)):
            # Change tile to level down
            level1_chest_opened = True
            tiles.set_tile_at(tiles.get_tile_location(5, 0), img("""
                a a a c c a a a a a a c c a a a
                3 3 3 3 c 3 3 3 3 3 3 3 c 3 3 3
                3 3 3 a c 3 3 3 3 3 3 3 c 3 3 3
                a a a a c a a a a a a a c c a a
                c c c c c d d d d d d c c c c c
                c a 3 3 c d d d d d d c 3 3 3 a
                c c a a c d d d d d d c a a a a
                c c c c c b b b b b b c c c c c
                a a a c c b b c c b b c c a a a
                a a a c c b b c c b b c c a a a
                c c c c c b b d c b b c c c c c
                c a a a c b b d c b b c a a a c
                c c c c c b c 4 4 b b c c c c c
                a a c c a c c 4 4 c c c a a a a
                c c c c c c c c c c c c c c c c
                c c c c c c c c c c c c c c c c
            """))
            # Pause before transition
            FreezePlayer()
            # Load cutscene
            scene.set_tile_map_level(None)
            sprites.destroy(player_character)
            story.start_cutscene(CutsceneChestOpens)
    return
controller.A.on_event(ControllerButtonEvent.PRESSED, OnButtonA)


def OnButtonB():
    global toolbar_selected
    if toolbar_visible == True:
        toolbar_selected = not toolbar_selected
        if toolbar_selected == True:
            player_character.set_velocity(0, 0)
            controller.move_sprite(player_character, 0, 0)
        else:
            controller.move_sprite(player_character)
    return
controller.B.on_event(ControllerButtonEvent.PRESSED, OnButtonB)

def OnButtonLeft():
    if toolbar_selected:
        toolbar.set_number(ToolbarNumberAttribute.SELECTED_INDEX,
        max(toolbar.get_number(ToolbarNumberAttribute.SELECTED_INDEX) - 1, 0))
    return
controller.left.on_event(ControllerButtonEvent.PRESSED, OnButtonLeft)

def OnButtonRight():
    if toolbar_selected:
        toolbar.set_number(ToolbarNumberAttribute.SELECTED_INDEX,
        min(toolbar.get_number(ToolbarNumberAttribute.SELECTED_INDEX) + 1, 
            toolbar.get_number(ToolbarNumberAttribute.MAX_ITEMS) - 1))
    return
controller.right.on_event(ControllerButtonEvent.PRESSED, OnButtonRight)

def CutsceneChestOpens():
    HideToolbar()
    scene.center_camera_at(scene.screen_width()/2, scene.screen_height()/2)
    scene.set_background_color(0)
    cutscene_character = sprites.create(assets.image("""player_character"""),
        SpriteKind.player)
    cutscene_character.set_position(scene.screen_width()/2, 100)
    story.print_text(player_name + " pulls the lever and hears a creaking sound in the other room...",
        scene.screen_width()/2,
        scene.screen_height()/3)
    cutscene_character.say_text("I should investigate...")
    story.sprite_move_to_location(cutscene_character, scene.screen_width(), 100, 25)
    sprites.destroy(cutscene_character)
    scene.set_background_image(None)
    Level2(5, 1)
    return

# Intro
def Intro():
    global player_name
    game.splash("St Plaguey's", "Made by Programming Club")
    Level1()
    return

def Level1(start_x: number = 1, start_y: number = 1):
    global level, player_character
    # Update global level variable
    level = 1
    # Load tilemap
    tiles.set_current_tilemap(tilemap("""outer_room"""))
    # Set variable tiles
    if level1_chest_opened == True:
        tiles.set_tile_at(tiles.get_tile_location(7, 1), img("""
            . b b b b b b b b b b b b b b .
            b e 4 4 4 4 4 4 4 4 4 4 4 4 4 b
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b
            b e e 4 4 4 4 4 4 4 4 4 4 e e b
            b b b b b b b d d b b b b b b b
            . b b b b b b c c b b b b b b .
            b c c c c c b c c b c c c c c b
            b c c c c c c b b c c c c c c b
            b c c c c c c c c c c c c c c b
            b c c c c c c c c c c c c c c b
            b b b b b b b b b b b b b b b b
            b e e e e e e e e e e e e e e b
            b e e e e e e e e e e e e e e b
            b c e e e e e e e e e e e e c b
            b b b b b b b b b b b b b b b b
            . b b . . . . . . . . . . b b .
        """))
    # Create sprite and set global player character variable
    player_character = sprites.create(assets.image("""player_character"""),
        SpriteKind.player)
    # Place player on starting tile
    tiles.place_on_tile(player_character, tiles.get_tile_location(start_x, start_y))
    # Update camera settings
    scene.camera_follow_sprite(player_character)
    # Enable controller
    controller.move_sprite(player_character)
    # Show toolbar
    ShowToolbar()
    return

def Level2(start_x: number = 1, start_y: number = 1):
    global level, player_character
    # Update global level variable
    level = 2
    # Load tilemap
    tiles.set_current_tilemap(tilemap("""inner_room"""))
    # Set variable tiles
    #Set lever to correct position
    if level1_chest_opened == True:
        tiles.set_tile_at(tiles.get_tile_location(5, 0), img("""
            a a a c c a a a a a a c c a a a
            3 3 3 3 c 3 3 3 3 3 3 3 c 3 3 3
            3 3 3 a c 3 3 3 3 3 3 3 c 3 3 3
            a a a a c a a a a a a a c c a a
            c c c c c d d d d d d c c c c c
            c a 3 3 c d d d d d d c 3 3 3 a
            c c a a c d d d d d d c a a a a
            c c c c c b b b b b b c c c c c
            a a a c c b b c c b b c c a a a
            a a a c c b b c c b b c c a a a
            c c c c c b b d c b b c c c c c
            c a a a c b b d c b b c a a a c
            c c c c c b c 4 4 b b c c c c c
            a a c c a c c 4 4 c c c a a a a
            c c c c c c c c c c c c c c c c
            c c c c c c c c c c c c c c c c
        """))
    # Create sprite and set global player character variable
    player_character = sprites.create(assets.image("""
            player_character
        """),
        SpriteKind.player)
    # Place player on starting tile
    tiles.place_on_tile(player_character, tiles.get_tile_location(start_x, start_y))
    # Update camera settings
    scene.camera_follow_sprite(None)
    scene.center_camera_at(0, 0)
    # Enable controller
    controller.move_sprite(player_character)
    # Show toolbar
    ShowToolbar()
    return


# Start Game
CreateToolbar()
info.set_life(3)
Intro()

