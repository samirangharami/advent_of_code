const imageLayerSize = 25 * 6;

const getLayers = (rawImage) => {
  const layers = [];

  for (
    let pixelNumber = 0;
    pixelNumber < rawImage.length;
    pixelNumber += imageLayerSize
  ) {
    const layer = rawImage.slice(pixelNumber, pixelNumber + imageLayerSize);
    layers.push(layer);
  }

  return layers;
};

const getFinalImage = (image) => {
  const finalImage = [];

  for (let index = 0; index < image.length; index += 25) {
    const layer = image
      .slice(index, index + 25)
      .split("")
      .map((x) => x === "0" ? "⬛️" : "⬜️")
      .join("");

    finalImage.push(layer);
  }

  return finalImage;
};

const main = (rawImage) => {
  const image = [];
  const layers = getLayers(rawImage);

  layers.forEach((layer) => {
    layer.split("").forEach((pixel, i) => {
      if (pixel !== "2" && image[i] === undefined) image[i] = pixel;
    });
  });

  console.log(getFinalImage(image.join("")));
};

main(Deno.readTextFileSync("input.txt"));
