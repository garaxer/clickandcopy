import os
import json
import argparse
import pytesseract
import cv2

# py tesseractReader.py SP193900.tif -out_file SP193900.json


def tesseractImageObject(image, output="", config="", lang='eng'):
    """takes in an image object and returns the text data from tesseract
    Args:
        image:location of image,
        preprocess:the type of preprocessing to be done to the image
        category:category of the image
        output:output folder location
    Returns
        TextData(Dict): Text output from the OCR
    """
    if isinstance(image, str):
        assert len(image) != 0
        assert os.path.exists(image)
        image = os.path.abspath(image)
        image = cv2.imread(image)
    # preprocess the image, add borders, blur and scale.

    textData = pytesseract.image_to_data(
        image, lang=lang, config=config, output_type=pytesseract.Output.DICT)

    return textData


def filterOutBlanks(d):
    """Remove any OCR data that has no text

    Args:
        d(dict): The raw OCR from tesseract.
    """
    n = {key: [] for key in d.keys()}
    for i, text in enumerate(d['text']):
        if text:
            for key in d.keys():
                n[key].append(d[key][i])
    return n


def addLines(d):
    """Tesseract OCR data is split by paragraphs then by line nums
    This aims to get seperate line numbers, regardless of paragraphs.

    Args:
        d(dict): The raw OCR from tesseract.
    """
    b = {key: [] for key in d.keys()}
    lineConfidences, b['par_line'] = {}, {}

    for i, line_num in enumerate(d['line_num']):
        # Go through the line numbers and create a new unique id for line number
        page_line = f"{d['par_num'][i]}_{line_num}"

        if page_line in b['par_line'].keys():
            b['par_line'][page_line] = [*b['par_line'][page_line], d['text'][i]]
            lineConfidences[page_line] = [
                *lineConfidences[page_line], d['conf'][i]]
        else:
            b['par_line'][page_line] = d['text'][i]
            lineConfidences[page_line] = [d['conf'][i]]
            for key in d.keys():
                b[key].append(d[key][i])
    # change text to the combination of the text in lines
    b['text'] = list(b['par_line'].values())
    b['lineConfidences'] = list(lineConfidences.values())
    # change par_line to to each line of text(make it the real par_line)
    b['par_line'] = [i for i in range(len(b['text']))]

    return(b)


def addblocks(d):
    """
    Args: 
        d(dict): Py Tesseract Dict Output
    Groups text by block_num"""
    b = {key: [] for key in d.keys()}
    b['words'] = []

    for i, block_num in enumerate(d['block_num']):

        if block_num in b['block_num']:
            j = b['block_num'].index(block_num)
            b['words'][j] = [*b['words'][j], d['text'][i]]
        else:
            for key in d.keys():  # ['block_num']:  #
                b[key].append(d[key][i])
            b['words'].append([d['text'][i]])
    return b


def transpose(d):
    """
    Args: 
        d(dict): Py Tesseract Dict Output
    Returns the py teserect output transposed
    """
    n = []
    for i, _ in enumerate(d['text']):
        b = {key: d[key][i] for key in d.keys()}
        n.append(b)
    return n


def formatLikeGoogleVision(d):
    """
    Args: 
        d(dict): Py Tesseract Dict Output
    """
    b = []
    for data in d:
        #n['text'].append((' '.join(text)))
        n = {}
        n['text'] = data['text']
        bounds = [
            {"x": data['left'], "y": data['top']},
            {"x": data['left']+data['width'], "y": data['top']+data['height']},
        ]
        n['bounds'] = bounds
        b.append(n)

    return b


# ,
def render_doc_text(filein, fileout):
    RAW = tesseractImageObject(filein, config=r'--psm 11')
    bounds = formatLikeGoogleVision(transpose(filterOutBlanks(RAW)))
    if fileout != 0:
        with open(fileout, "w") as write_file:
            json.dump(bounds, write_file)
    else:
        print(bounds)

    return bounds


if __name__ == '__main__':
    #
    parser = argparse.ArgumentParser()
    parser.add_argument('detect_file', help='The image for text detection.')
    parser.add_argument('-out_file', help='Optional output file', default=0)
    args = parser.parse_args()
    print(args)

    render_doc_text(args.detect_file, args.out_file)
