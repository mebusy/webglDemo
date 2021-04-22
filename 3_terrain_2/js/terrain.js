noise.seed(7);

function InverseLerp( min, max, value) {
   if(Math.abs(max -min) < 1e-5 ) 
       return min;
   return (value - min) / (max - min);
}

class Noise {

    // persistence [0,1)
    // lacunarity should > 1 
    static GenerateNoiseMap( mapWidth, mapHeight, scale, octaves, persistence, lacunarity ) {
        // underlying bytes
        let buffer = new ArrayBuffer( mapWidth * mapHeight * 4 ); // *4 for 32bit float
        let noiseMap = new Float32Array(buffer);

        let buffer2 = new ArrayBuffer( octaves * 2 * 4 ); // *4 for 32bit float
        let octaveOffsets = new Uint32Array(buffer2);
        for (let i=0; i< octaves; i++) {
            octaveOffsets[i*2]  = Math.floor(Math.random() * 200000) - 100000;
            octaveOffsets[i*2+1]  = Math.floor(Math.random() * 200000) - 100000;
        }

        // we want each octave to be sampled from a different location 

        if (scale <=0) {
            scale = 1e-4; 
        }

        var maxNoiseHeight = -Number.MAX_VALUE;
        var minNoiseHeight = Number.MAX_VALUE;

        let halfWidth = mapWidth / 2.0;
        let halfHeight = mapHeight / 2.0;

        for (let y=0; y<mapHeight; y++) {
            for (let x=0; x<mapWidth; x++) {
                let amplitude = 1;
                let frequency = 1;
                let noiseHeight = 0;

                for (let i=0; i< octaves; i++) {
                    let sampleX = (x-halfWidth)/scale * frequency + octaveOffsets[i*2];
                    let sampleY = (y-halfHeight)/scale * frequency + octaveOffsets[i*2+1] ;
                    let value = noise.perlin2(sampleX, sampleY); // [-1,1] to make interesting effect

                    // instead of just setting the noise map directly to the perlin value
                    // we want to increase the noise height by the perlins value of each octave
                    noiseHeight += value * amplitude;
                    amplitude *= persistence; // amplitude decrease
                    frequency *= lacunarity;  // frequency increase
                } // octaves

                /*
                // convert [-1,1] to [0.1]
                value = (value+1)/2;
                noiseMap[x+y*mapWidth] = value ;
                /*/
                if (noiseHeight > maxNoiseHeight ) {
                    maxNoiseHeight = noiseHeight ;
                } else if (noiseHeight < minNoiseHeight) {
                    minNoiseHeight = noiseHeight ;
                }
                noiseMap[x+y*mapWidth] = noiseHeight ; 
                //*/
            } // x
        } // y

        for (let y=0; y<mapHeight; y++) {
            for (let x=0; x<mapWidth; x++) {
                noiseMap[x,y] = InverseLerp( minNoiseHeight, maxNoiseHeight , noiseMap[x+y*mapWidth] )
            }
        }
        return noiseMap;
    }
}



class MapGenerator {
    constructor( width, height, scale, octaves, persistence, lacunarity ) {
        console.log( "new MapGenerator:", width, height, scale, octaves, persistence, lacunarity )
        this.mapWidth = width;
        this.mapHeight = height;
        this.scale = scale;
        this.octaves = octaves; // >= 0
        this.persistence= persistence;  
        this.lacunarity = lacunarity; // >=1


        this.pixel_bytes = 3 ;
        this.data = new Uint8Array( this.pixel_bytes * width * height );
        this.texture = new THREE.DataTexture( this.data, width, height, THREE.RGBFormat );

        let inst = this ;
        inspector.input( inst, "scale", 0.3, 16, function(){ inst.GenerateMap(); }  );
    }

    GenerateMap() {
        let noiseMap = Noise.GenerateNoiseMap( this.mapWidth, this.mapHeight, this.scale, this.octaves, this.persistence, this.lacunarity );
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


