import argparse
from enum import Enum
import io
import os
from google.cloud import vision
from google.cloud.vision import types
from PIL import Image, ImageDraw
from datetime import date

import json
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "PlanCapture.json"


def get_paragragh_text_bounds(image_file):
    """Returns document paragragh bounds given an image."""
    print('Querying google vision', image_file)

    client = vision.ImageAnnotatorClient()

    with io.open(image_file, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)

    response = client.document_text_detection(image=image)
    if response:
        print('got a response')
    document = response.full_text_annotation

    # Collect specified feature bounds by enumerating all document features
    breaks = vision.enums.TextAnnotation.DetectedBreak.BreakType
    paragrahs = []  # ["bounding_box":...,]
    print('page count', len(document.pages))
    for page in document.pages:
        for block in page.blocks:

            for paragraph in block.paragraphs:

                newParagrah = {}
                newParagrah['text'] = ""

                bound = paragraph.bounding_box

                newParagrah['bounds'] = [
                    {'x': bound.vertices[0].x, 'y':bound.vertices[0].y},
                    {'x': bound.vertices[1].x, 'y':bound.vertices[1].y},
                    {'x': bound.vertices[2].x, 'y':bound.vertices[2].y},
                    {'x': bound.vertices[3].x, 'y':bound.vertices[3].y}
                ]

                for word in paragraph.words:
                    for symbol in word.symbols:
                        # .replace('\u00b0','°')
                        newParagrah['text'] += symbol.text
                        # print(symbol.detected_break)
                        if symbol.property.detected_break.type:
                            if symbol.property.detected_break.type == breaks.SPACE or symbol.property.detected_break.type == breaks.LINE_BREAK:
                                newParagrah['text'] += " "
                            elif symbol.property.detected_break.type == breaks.EOL_SURE_SPACE:
                                newParagrah['text'] += '\n'
                            elif symbol.property.detected_break.type == breaks.HYPHEN:
                                newParagrah['text'] += "-"
                            else:
                                print(symbol.text, symbol.property.detected_break)
                                #word_text = ""

                newParagrah['text'] = newParagrah['text'].strip()
                paragrahs.append(newParagrah)

    # print(paragrahs)
    # The list `bounds` contains the coordinates of the bounding boxes.
    print('returning', paragrahs)
    return paragrahs


def render_doc_text(filein, fileout):
    bounds = get_paragragh_text_bounds(filein)
    if fileout != 0:
        with open(fileout, "w") as write_file:
            json.dump(bounds, write_file)
    else:
        print(bounds)

    return bounds


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('detect_file', help='The image for text detection.')
    parser.add_argument('-out_file', help='Optional output file', default=0)
    args = parser.parse_args()

    render_doc_text(args.detect_file, args.out_file)
