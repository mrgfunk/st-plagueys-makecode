// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`1000100001010101010101010101010101010101010101010101010101010101010101010101010102040404040404040801010101010101060303030303030307010101010101010603030505050303070101010101010106030701010106030701010104040404030307010101060307010101030303030303070101010603070101010505050505050a01010106030701010101010101010101010101060303040404010101010101010101010603030303030101010101010101010109050505050501010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 . . . . . . . . . 2 2 2 
2 2 2 2 . . . . . . . . . 2 2 2 
2 2 2 2 . . . . . . . . . 2 2 2 
2 2 2 2 . . . 2 2 2 . . . 2 2 2 
. . . . . . . 2 2 2 . . . 2 2 2 
. . . . . . . 2 2 2 . . . 2 2 2 
. . . . . . . 2 2 2 . . . 2 2 2 
2 2 2 2 2 2 2 2 2 2 . . . . . . 
2 2 2 2 2 2 2 2 2 2 . . . . . . 
2 2 2 2 2 2 2 2 2 2 . . . . . . 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,sprites.castle.tileGrass1,sprites.castle.tilePath1,sprites.castle.tilePath5,sprites.castle.tilePath2,sprites.castle.tilePath8,sprites.castle.tilePath4,sprites.castle.tilePath6,sprites.castle.tilePath3,sprites.castle.tilePath7,sprites.castle.tilePath9], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
