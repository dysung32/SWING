import os
import numpy as np
from PIL import Image, ImageChops
from tensorflow.keras.models import load_model
# from tensorflow.keras import layers
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

NOW_DIR = os.path.dirname(os.path.realpath(__file__)) + '/'

def crop(im):
    background = Image.new(im.mode, im.size, im.getpixel((0, 0)))
    diff = ImageChops.difference(im, background)
    diff = ImageChops.add(diff, diff, 2.0, -35)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)
    else:
        # print('Failure!')
        return
    
model_name = 'weights/cnn/doodle_final.h5'
class_name = 'weights/cnn/classes_final.txt'

model = load_model(NOW_DIR + model_name)

class_names = []
with open(NOW_DIR + class_name, 'r') as f:
    while True:
        text = f.readline()
        if not text:
            break
        else:
            text = text[:-1]
            class_names.append(text)


def get_class(image_path):
    image = Image.open(image_path)
    # image = crop(image)
    image = image.resize((128, 128), Image.LANCZOS)
    image_np = np.array(image)[:, :, 0]
    image_np = 255 - image_np
    image_np = np.expand_dims(image_np, axis=-1)

    pred = model.predict(np.expand_dims(image_np, axis=0))[0]
    pred = (-pred).argsort()
    return class_names[pred[0]]

if __name__ == '__main__':
    print(get_class('umbrella.png'))