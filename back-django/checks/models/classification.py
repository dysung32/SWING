import os
import numpy as np
from PIL import Image, ImageChops
from tensorflow.keras.models import load_model
# from tensorflow.keras import layers
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

NOW_DIR = os.path.dirname(os.path.realpath(__file__)) + '/'

def crop(im):
    im_np = np.array(im)
    area = im_np.shape[0] * im_np.shape[1]
    background = Image.new(im.mode, im.size, im.getpixel((0, 0)))
    diff = ImageChops.difference(im, background)
    diff = ImageChops.add(diff, diff, 2.0, -35)
    bbox = diff.getbbox()
    if bbox and (area//2 > (bbox[2] * bbox[3])):
        print('cropped!')
        return im.crop(bbox)
    else:
        return im
    
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
    f.close()

def get_class(image_path):
    image = Image.open(image_path)
    image = crop(image)
    image = image.resize((128, 128), Image.LANCZOS)
    image_np = np.array(image)[:, :, 0]
    image_np = 255 - image_np
    image_np = np.expand_dims(image_np, axis=-1)

    pred = model.predict(np.expand_dims(image_np, axis=0))[0]
    pred = (-pred).argsort()
    return class_names[pred[0]]


# 서버가 켜질 때 model을 한 번 구동하여 api 요청 시 바로 값을 return하도록 만듦
temp = get_class(NOW_DIR + 'weights/cnn/umbrella.png')
del temp

# if __name__ == '__main__':
#     print(get_class('umbrella.png'))