//  Global Variables
let player_character : Sprite = null
let player_name = "Daisy"
let level = 0
//  Toolbar variables
let all_foods : Inventory.Item[] = []
let toolbar : Inventory.Toolbar = null
let toolbar_selected : boolean = null
let toolbar_visible : boolean = null
//  Level specific variables
let level1_chest_opened = false
function FreezePlayer(ms: number = 500) {
    player_character.setVelocity(0, 0)
    controller.moveSprite(player_character, 0, 0)
    pause(ms)
    controller.moveSprite(player_character)
    return
}

function HideToolbar() {
    
    toolbar_selected = false
    toolbar_visible = false
    toolbar.setFlag(SpriteFlag.Invisible, true)
    return
}

function ShowToolbar() {
    
    toolbar_selected = false
    toolbar_visible = true
    toolbar.setFlag(SpriteFlag.Invisible, false)
    return
}

function CreateToolbar() {
    
    toolbar = Inventory.create_toolbar([], 7)
    toolbar.left = 4
    toolbar.bottom = scene.screenHeight() - 4
    toolbar.z = 100
    toolbar.setFlag(SpriteFlag.RelativeToCamera, true)
    //  Hide toolbar on creation
    toolbar.setFlag(SpriteFlag.Invisible, true)
    //  Update globale variables
    let toolbar_selected = false
    let toolbar_visible = false
    toolbar.set_color(ToolbarColorAttribute.BoxOutline, 1)
    return
}

function AddToolbarItem(item: any) {
    
    if (toolbar.get_items().length < toolbar.get_number(ToolbarNumberAttribute.MaxItems)) {
        toolbar.get_items().push(item)
    }
    
    toolbar.update()
    return
}

scene.onHitWall(SpriteKind.Player, function on_hit_wall(sprite: Sprite, location: tiles.Location) {
    let door_location: tiles.Location;
    let player_location = sprite.tilemapLocation()
    if (level == 1) {
        //  Check if we are at the north door
        if (sprite.tileKindAt(TileDirection.Bottom, img`
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
            `)) {
            //  Check which door
            door_location = tiles.getTileLocation(7, 3)
            if (player_location.x == door_location.x && player_location.y == door_location.y) {
                //  Change scene to inner_room
                scene.setTileMapLevel(null)
                sprites.destroy(sprite)
                Level2(3, 1)
            }
            
        } else if (sprite.tileKindAt(TileDirection.Right, img`
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
        `)) {
            //  Check west door
            door_location = tiles.getTileLocation(3, 7)
            if (player_location.x == door_location.x && player_location.y == door_location.y) {
                scene.setTileMapLevel(null)
                sprites.destroy(sprite)
                Level2(1, 3)
            }
            
        } else if (sprite.tileKindAt(TileDirection.Left, img`
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
        `)) {
            //  Check east door
            door_location = tiles.getTileLocation(11, 7)
            if (player_location.x == door_location.x && player_location.y == door_location.y) {
                scene.setTileMapLevel(null)
                sprites.destroy(sprite)
                Level2(5, 3)
            }
            
        } else if (sprite.tileKindAt(TileDirection.Top, img`
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
        `)) {
            //  Check south door
            door_location = tiles.getTileLocation(7, 11)
            if (player_location.x == door_location.x && player_location.y == door_location.y) {
                scene.setTileMapLevel(null)
                sprites.destroy(sprite)
                Level2(3, 5)
            }
            
        }
        
    } else if (level == 2) {
        //  Check if we are at the north door
        if (sprite.tileKindAt(TileDirection.Top, img`
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
            `)) {
            //  Check which door
            door_location = tiles.getTileLocation(3, 1)
            if (player_location.x == door_location.x && player_location.y == door_location.y) {
                //  Change scene to inner_room
                scene.setTileMapLevel(null)
                sprites.destroy(sprite)
                Level1(7, 3)
            }
            
        } else if (sprite.tileKindAt(TileDirection.Left, img`
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
        `)) {
            //  Check west door
            door_location = tiles.getTileLocation(1, 3)
            if (player_location.x == door_location.x && player_location.y == door_location.y) {
                scene.setTileMapLevel(null)
                sprites.destroy(sprite)
                Level1(3, 7)
            }
            
        } else if (sprite.tileKindAt(TileDirection.Right, img`
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
        `)) {
            //  Check east door
            door_location = tiles.getTileLocation(5, 3)
            if (player_location.x == door_location.x && player_location.y == door_location.y) {
                scene.setTileMapLevel(null)
                sprites.destroy(sprite)
                Level1(11, 7)
            }
            
        } else if (sprite.tileKindAt(TileDirection.Bottom, img`
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
        `)) {
            //  Check south door
            door_location = tiles.getTileLocation(3, 5)
            if (player_location.x == door_location.x && player_location.y == door_location.y) {
                scene.setTileMapLevel(null)
                sprites.destroy(sprite)
                Level1(7, 11)
            }
            
        }
        
    }
    
    return
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function OnButtonA() {
    let good_foods: string[];
    let bad_foods: string[];
    let item: Inventory.Item;
    let all_foods: Inventory.Item[];
    let food: Inventory.Item;
    
    if (toolbar_selected) {
        good_foods = ["Burger", "Drumstick", "Ham", "Pizza", "Donut"]
        bad_foods = ["Apple"]
        item = toolbar.get_items().removeAt(toolbar.get_number(ToolbarNumberAttribute.SelectedIndex))
        toolbar.update()
        if (good_foods.indexOf(item.name) >= 0) {
            info.changeLifeBy(1)
        } else if (bad_foods.indexOf(item.name) >= 0) {
            info.changeLifeBy(-1)
        }
        
        return
    }
    
    
    if (level == 1) {
        //  Chest closed
        if (player_character.tileKindAt(TileDirection.Top, img`
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
        `)) {
            player_character.sayText("It's locked...")
            FreezePlayer()
            player_character.sayText(null)
        } else if (player_character.tileKindAt(TileDirection.Top, img`
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
        `)) {
            //  Chest open
            all_foods = [Inventory.create_item("Burger", img`
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
                        `), Inventory.create_item("Apple", img`
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
                        `), Inventory.create_item("Drumstick", img`
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
                        `), Inventory.create_item("Ham", img`
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
                        `), Inventory.create_item("Pizza", img`
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
                        `), Inventory.create_item("Donut", img`
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
                        `)]
            food = all_foods._pickRandom()
            AddToolbarItem(food)
            player_character.sayText("Look! " + food.name + "!")
            FreezePlayer()
            player_character.sayText(null)
        }
        
    }
    
    if (level == 2) {
        if (player_character.tileKindAt(TileDirection.Top, img`
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
        `)) {
            //  Change tile to level down
            level1_chest_opened = true
            tiles.setTileAt(tiles.getTileLocation(5, 0), img`
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
            `)
            //  Pause before transition
            FreezePlayer()
            //  Load cutscene
            scene.setTileMapLevel(null)
            sprites.destroy(player_character)
            story.startCutscene(function CutsceneChestOpens() {
                let cutscene_character: Sprite;
                HideToolbar()
                scene.centerCameraAt(scene.screenWidth() / 2, scene.screenHeight() / 2)
                scene.setBackgroundColor(0)
                cutscene_character = sprites.create(assets.image`player_character`, SpriteKind.Player)
                cutscene_character.setPosition(scene.screenWidth() / 2, 100)
                story.printText(player_name + " pulls the lever and hears a creaking sound in the other room...", scene.screenWidth() / 2, scene.screenHeight() / 3)
                cutscene_character.sayText("I should investigate...")
                story.spriteMoveToLocation(cutscene_character, scene.screenWidth(), 100, 25)
                sprites.destroy(cutscene_character)
                scene.setBackgroundImage(null)
                Level2(5, 1)
                return
            })
        }
        
    }
    
    return
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function OnButtonB() {
    
    if (toolbar_visible == true) {
        toolbar_selected = !toolbar_selected
        if (toolbar_selected == true) {
            player_character.setVelocity(0, 0)
            controller.moveSprite(player_character, 0, 0)
        } else {
            controller.moveSprite(player_character)
        }
        
    }
    
    return
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function OnButtonLeft() {
    if (toolbar_selected) {
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, Math.max(toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) - 1, 0))
    }
    
    return
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function OnButtonRight() {
    if (toolbar_selected) {
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, Math.min(toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) + 1, toolbar.get_number(ToolbarNumberAttribute.MaxItems) - 1))
    }
    
    return
})
//  Intro
function Intro() {
    
    game.splash("St Plaguey's", "Made by Programming Club")
    Level1()
    return
}

function Level1(start_x: number = 1, start_y: number = 1) {
    
    //  Update global level variable
    level = 1
    //  Load tilemap
    tiles.setCurrentTilemap(tilemap`outer_room`)
    //  Set variable tiles
    if (level1_chest_opened == true) {
        tiles.setTileAt(tiles.getTileLocation(7, 1), img`
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
        `)
    }
    
    //  Create sprite and set global player character variable
    player_character = sprites.create(assets.image`player_character`, SpriteKind.Player)
    //  Place player on starting tile
    tiles.placeOnTile(player_character, tiles.getTileLocation(start_x, start_y))
    //  Update camera settings
    scene.cameraFollowSprite(player_character)
    //  Enable controller
    controller.moveSprite(player_character)
    //  Show toolbar
    ShowToolbar()
    return
}

function Level2(start_x: number = 1, start_y: number = 1) {
    
    //  Update global level variable
    level = 2
    //  Load tilemap
    tiles.setCurrentTilemap(tilemap`inner_room`)
    //  Set variable tiles
    // Set lever to correct position
    if (level1_chest_opened == true) {
        tiles.setTileAt(tiles.getTileLocation(5, 0), img`
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
        `)
    }
    
    //  Create sprite and set global player character variable
    player_character = sprites.create(assets.image`
            player_character
        `, SpriteKind.Player)
    //  Place player on starting tile
    tiles.placeOnTile(player_character, tiles.getTileLocation(start_x, start_y))
    //  Update camera settings
    scene.cameraFollowSprite(null)
    scene.centerCameraAt(0, 0)
    //  Enable controller
    controller.moveSprite(player_character)
    //  Show toolbar
    ShowToolbar()
    return
}

//  Start Game
CreateToolbar()
info.setLife(3)
Intro()
