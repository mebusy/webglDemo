noise.seed(7);

class Noise {
    
    static GenerateNoiseMap( mapWidth, mapHeight, scale ) {
        // underlying bytes
        let buffer = new ArrayBuffer( mapWidth * mapHeight * 2 ); // *2 for 32bit float
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
    }
}


class MapGenerator {
    constructor() {
        this.mapWidth = 256;
        this.mapHeight = 256;
        this.noiseScale = 1.0;
    }

    GenerateMap() {
        let noiseMap = Noise.GenerateNoiseMap( this.mapWidth, this.mapHeight, this.noiseScale );
    }

}

class MapDisplay {

}
