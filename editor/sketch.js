// MEMORY 1911
// S × K

export const receipt = {
  height: 620,
  seed: 67,
};

const portrait = new Image();

portrait.src = new URL(
  "./memory1911-source.png",
  import.meta.url
).href;

let thermalPortrait = null;


// Receipt

export function drawReceipt(p) {

  const { width: w, height: h } = p;
  const margin = 16;

  p.background(255);

  // Head

  p.noStroke();
  p.fill(0);

  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);

  p.textStyle(p.BOLD);
  p.textSize(28);

  p.text(
    "MEMORY 1911",
    w / 2,
    28
  );

  p.textStyle(p.NORMAL);
  p.textSize(9);

  p.text(
    "S × K",
    w / 2,
    66
  );

  dashedLine(
    p,
    margin,
    88,
    w - margin,
    88,
    6,
    5
  );


  // Thermal portrait

  if (
    portrait.complete &&
    portrait.naturalWidth > 0 &&
    !thermalPortrait
  ) {

    thermalPortrait = createThermalPortrait(
      portrait,
      352,
      216
    );
  }


  // Portrait

  if (thermalPortrait) {

    p.drawingContext.drawImage(
      thermalPortrait,
      16,
      115,
      352,
      216
    );

  } else {

    p.noStroke();
    p.fill(0);

    p.textStyle(p.NORMAL);
    p.textSize(10);

    p.text(
      "DEVELOPING MEMORY...",
      w / 2,
      210
    );
  }


  // Photo caption

  p.noStroke();
  p.fill(0);

  p.textStyle(p.NORMAL);
  p.textSize(8);
  p.textAlign(p.LEFT, p.TOP);

  p.text(
    "MEMORY / 1911",
    margin,
    345
  );

  p.textAlign(p.RIGHT, p.TOP);

  p.text(
    "S × K",
    w - margin,
    345
  );


  // Initials

  p.textAlign(p.CENTER, p.TOP);

  p.textStyle(p.BOLD);
  p.textSize(19);

  p.text(
    "S × K",
    w / 2,
    390
  );

  p.textStyle(p.NORMAL);
  p.textSize(10);

  p.text(
    "26 • 25",
    w / 2,
    424
  );


  // Generative heart

  drawMemoryHeart(
    p,
    w / 2,
    470,
    receipt.seed
  );


  // Footer divider

  dashedLine(
    p,
    margin,
    525,
    w - margin,
    525,
    6,
    5
  );


  // Footer

  p.noStroke();
  p.fill(0);

  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.NORMAL);
  p.textSize(9);

  p.text(
    "SOMEWHERE • SOMETIME • US",
    w / 2,
    550
  );
}


// heart

function drawMemoryHeart(
  p,
  centerX,
  centerY,
  seed
) {


  let randomSeed = seed * 99991 + 17;

  function random() {

    randomSeed =
      (randomSeed * 16807) % 2147483647;

    return (
      randomSeed / 2147483647
    );
  }


  const heartWidth =
    78 + random() * 42;

  const heartHeight =
    55 + random() * 20;

  const roughness =
    0.7 + random() * 1.8;

  const gapChance =
    0.04 + random() * 0.12;

  const points =
    65 + Math.floor(random() * 35);


  const heart = [];


  for (
    let i = 0;
    i <= points;
    i++
  ) {

    const t =
      (i / points) * p.TWO_PI;

    const heartX =
      16 *
      Math.pow(
        Math.sin(t),
        3
      );

    const heartY =
      13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t);


    // Seeded irregularity

    const wobbleX =
      (random() - 0.5) *
      roughness;

    const wobbleY =
      (random() - 0.5) *
      roughness;


    heart.push({
      x:
        centerX +
        heartX *
        (heartWidth / 32) +
        wobbleX,

      y:
        centerY -
        heartY *
        (heartHeight / 34) +
        wobbleY
    });
  }


  // Main heart line

  p.noFill();
  p.stroke(0);
  p.strokeWeight(1.5);


  for (
    let i = 1;
    i < heart.length;
    i++
  ) {

    const previous =
      heart[i - 1];

    const current =
      heart[i];


    if (
      random() > gapChance
    ) {

      p.line(
        previous.x,
        previous.y,
        current.x,
        current.y
      );
    }
  }


  p.noStroke();
  p.fill(0);


  const markCount =
    5 + Math.floor(
      random() * 9
    );


  for (
    let i = 0;
    i < markCount;
    i++
  ) {

    const index =
      Math.floor(
        random() *
        heart.length
      );

    const point =
      heart[index];


    const size =
      1 +
      random() * 1.8;


    p.circle(
      point.x,
      point.y,
      size
    );
  }



  p.stroke(0);
  p.strokeWeight(1);


  const signalStart =
    Math.floor(
      random() *
      (heart.length * 0.25)
    );

  const signalLength =
    Math.floor(
      heart.length * (
        0.35 +
        random() * 0.3
      )
    );


  for (
    let i = signalStart + 1;
    i <
    Math.min(
      signalStart + signalLength,
      heart.length
    );
    i++
  ) {

    const a =
      heart[i - 1];

    const b =
      heart[i];


    if (random() > 0.2) {

      p.line(
        a.x,
        a.y,
        b.x,
        b.y
      );
    }
  }
}


// Thermal portrait generateing

function createThermalPortrait(
  source,
  targetWidth,
  targetHeight
) {

  const canvas =
    document.createElement("canvas");

  canvas.width =
    targetWidth;

  canvas.height =
    targetHeight;

  const ctx =
    canvas.getContext("2d");

  ctx.drawImage(
    source,
    0,
    0,
    targetWidth,
    targetHeight
  );

  const image =
    ctx.getImageData(
      0,
      0,
      targetWidth,
      targetHeight
    );

  const data =
    image.data;


  // Grayscale

  for (
    let i = 0;
    i < data.length;
    i += 4
  ) {

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const gray =
      0.299 * r +
      0.587 * g +
      0.114 * b;

    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }


  // Sharpening :]

  const original =
    new Uint8ClampedArray(data);

  for (
    let y = 1;
    y < targetHeight - 1;
    y++
  ) {

    for (
      let x = 1;
      x < targetWidth - 1;
      x++
    ) {

      const index =
        (y * targetWidth + x) * 4;

      const left =
        original[index - 4];

      const right =
        original[index + 4];

      const top =
        original[
          ((y - 1) * targetWidth + x) * 4
        ];

      const bottom =
        original[
          ((y + 1) * targetWidth + x) * 4
        ];

      const center =
        original[index];

      let sharpened =
        center * 1.65
        - left * 0.16
        - right * 0.16
        - top * 0.16
        - bottom * 0.16;

      sharpened =
        Math.max(
          0,
          Math.min(
            255,
            sharpened
          )
        );

      data[index] =
        sharpened;

      data[index + 1] =
        sharpened;

      data[index + 2] =
        sharpened;
    }
  }


  // Contrast

  const contrast = 1.18;
  const brightness = 8;

  for (
    let i = 0;
    i < data.length;
    i += 4
  ) {

    let value =
      data[i];

    value += brightness;

    value =
      ((value - 128) *
        contrast) +
      128;

    value =
      Math.max(
        0,
        Math.min(
          255,
          value
        )
      );

    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
  }


  // Thermal black n white

  const threshold = 132;

  for (
    let y = 0;
    y < targetHeight;
    y++
  ) {

    for (
      let x = 0;
      x < targetWidth;
      x++
    ) {

      const index =
        (y * targetWidth + x) * 4;

      const oldValue =
        data[index];

      const newValue =
        oldValue < threshold
          ? 0
          : 255;

      data[index] =
        newValue;

      data[index + 1] =
        newValue;

      data[index + 2] =
        newValue;

      const error =
        oldValue -
        newValue;


      distributeError(
        data,
        x + 1,
        y,
        targetWidth,
        targetHeight,
        error * 7 / 16
      );

      distributeError(
        data,
        x - 1,
        y + 1,
        targetWidth,
        targetHeight,
        error * 3 / 16
      );

      distributeError(
        data,
        x,
        y + 1,
        targetWidth,
        targetHeight,
        error * 5 / 16
      );

      distributeError(
        data,
        x + 1,
        y + 1,
        targetWidth,
        targetHeight,
        error * 1 / 16
      );
    }
  }

  ctx.putImageData(
    image,
    0,
    0
  );

  return canvas;
}


// Errors distribution

function distributeError(
  data,
  x,
  y,
  width,
  height,
  amount
) {

  if (
    x < 0 ||
    x >= width ||
    y < 0 ||
    y >= height
  ) {
    return;
  }

  const index =
    (y * width + x) * 4;

  const value =
    data[index] +
    amount;

  data[index] = value;
  data[index + 1] = value;
  data[index + 2] = value;
}


// Dashed line

function dashedLine(
  p,
  x1,
  y1,
  x2,
  y2,
  dash,
  gap
) {

  p.stroke(0);
  p.strokeWeight(2);

  for (
    let x = x1;
    x < x2;
    x += dash + gap
  ) {

    p.line(
      x,
      y1,
      Math.min(
        x + dash,
        x2
      ),
      y2
    );
  }
}