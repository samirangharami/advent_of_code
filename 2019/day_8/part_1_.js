const imageLayerSize = 25 * 6;

const getZeroCount = (layer) =>
  layer.split("").filter((p) => p === "0").length.toString();

const getLayerWithFewestZeros = (image) => {
  const keyWithFewestZeros = Object
    .keys(image)
    .map((p) => parseInt(p))
    .toSorted((a, b) => a - b)[0];

  return image[keyWithFewestZeros.toString()];
};

const getProduct = (layer) => {    
  const counts = layer.split("").reduce((acc, p) => {
    if (p === "1") return { ...acc, "1": acc["1"] + 1 };

    if (p === "2") return { ...acc, "2": acc["2"] + 1 };

    return acc;
  }, { "1": 0, "2": 0 });

  console.log(counts);
  

  return counts["1"] * counts["2"];
};

const main = (rawImage) => {
  const image = {};

  for (
    let pixelNumber = 0;
    pixelNumber < rawImage.length;
    pixelNumber += imageLayerSize
  ) {
    const layer = rawImage.slice(pixelNumber, pixelNumber + imageLayerSize);
    image[getZeroCount(layer)] = layer;
  }

  const layerWithFewestZero = getLayerWithFewestZeros(image);
  console.log(getProduct(layerWithFewestZero));
};

main(Deno.readTextFileSync("input.txt"));

