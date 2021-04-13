noise.seed(7);

class Noise {
    
    static GenerateNoiseMap( mapWidth, mapHeight, scale ) {
        // underlying bytes
        let buffer = new ArrayBuffer( mapWidth * mapHeight * 4 ); // *2 for 32bit float
        let noiseMap = new Float32Array(buffer);

        if (scale <=0) {
            scale = 1e-4; 
        }
        for (let y=0; y<mapHeight; y++) {
            for (let x=0; x<mapWidth; x++) {
                let sampleX = x/scale;
                let sampleY = y/scale;
                let value = noise.perlin2(sampleX, sampleY);
                // convert [-1,1] to [0.1]
                value = (value+1)/2;
                noiseMap[x+y*mapWidth] = value ;
            }
        }
        return noiseMap;
    }
}



class MapGenerator {
    constructor( width, height, scale ) {
        console.log( "new MapGenerator:", width, height, scale )
        this.mapWidth = width;
        this.mapHeight = height;
        this.scale = scale;
        this.pixel_bytes = 3 ;
        this.data = new Uint8Array( this.pixel_bytes * width * height );
        this.texture = new THREE.DataTexture( this.data, width, height, THREE.RGBFormat );

        let inst = this ;
        inspector.input( inst, "scale", 0.3, 16, function(){ inst.GenerateMap(); }  );
    }

    GenerateMap() {
        let noiseMap = Noise.GenerateNoiseMap( this.mapWidth, this.mapHeight, this.scale );
        let width = this.mapWidth ; 
        let height = this.mapHeight ;

        // generate texture
        let pixel_bytes = this.pixel_bytes; 
        let data = this.data;

        var size = width * height; //Pixel size
        // console.log( noiseMap.length, width * height, width, height);
        for ( let i = 0; i < size; i++ ) {
            let stride = i*pixel_bytes ;
            let v = noiseMap[i];
            data[ stride ]     = Math.floor( v * 255 );
            data[ stride + 1 ] = Math.floor( v * 255 );
            data[ stride + 2 ] = Math.floor( v * 255 );
        }
        this.texture.needsUpdate = true; //!!
    }


}


