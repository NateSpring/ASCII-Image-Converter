import sys
from PIL import Image, ImageDraw
import numpy as np


def convert(file):
    image_path = file
    img = Image.open(image_path)

    width, height = img.size
    aspect_ratio = height / width / 1.4
    new_width = int(width / 2)
    new_height = aspect_ratio * new_width * 0.55
    new_height = int(new_height)
    img = img.resize((new_width, new_height))
    print("new w/h: ", new_width, new_height)

    img = img.convert("L")

    pixels = img.getdata()
    # chars = ["#", "?", "%", ".", "S", "+", ".", "*", ":", ",", "@"]
    chars = [
        " ",
        "@",
        "B",
        "%",
        "8",
        "&",
        "W",
        "M",
        "#",
        "*",
        "o",
        "a",
        "h",
        "k",
        "b",
        "d",
        "p",
        "q",
        "w",
        "m",
        "Z",
        "O",
        "0",
        "Q",
        "L",
        "C",
        "J",
        "U",
        "Y",
        "X",
        "z",
        "c",
        "v",
        "u",
        "n",
        "x",
        "r",
        "j",
        "f",
        "t",
        "/",
        "\\",
        "|",
        "(",
        ")",
        "1",
        "{",
        "}",
        "[",
        "]",
        "?",
        "-",
        "_",
        "+",
        "~",
        "<",
        ">",
        "i",
        "!",
        "l",
        "I",
        ";",
        ":",
        ",",
        "^",
        "`",
        "'",
        ".",
    ]
    # chars = chars[::-1]
    new_pixels = [chars[pixel // 25] for pixel in pixels]
    new_pixels = "".join(new_pixels)
    new_pixels_count = len(new_pixels)
    asc_image = [
        new_pixels[index : index + new_width]
        for index in range(0, new_pixels_count, new_width)
    ]
    asc_image = "\n".join(asc_image)
    print(f"Characters in Image: {len(asc_image)}")

    im = Image.new("RGB", (int(new_width * 6), int(new_height * 14)))
    draw = ImageDraw.Draw(im)
    randColor = tuple(np.random.choice(range(150, 256), size=3))
    draw.text((1, 1), asc_image, fill=(randColor))
    print("Adding text")
    # newImage = image_path.split(".")[0] + "-" + "%02x%02x%02x" % randColor
    im.save(f"static/new.png")
    print(f"Done Saving ")
