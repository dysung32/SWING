import os
import numpy as np
from PIL import Image, ImageChops
from tensorflow.keras.models import load_model

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
        # print('cropped!')
        return im.crop(bbox)
    else:
        return im

model1_name = 'weights/cnn/doodle_final_96.h5'
class1_name = 'weights/cnn/doodle_final_classes_96.txt'

model2_name = 'weights/cnn/doodle_final_200.h5'
class2_name = 'weights/cnn/doodle_final_classes_200.txt'

model1 = load_model(NOW_DIR + model1_name)
model2 = load_model(NOW_DIR + model2_name)

models = [model1, model2]

class_names = []
for c in [class1_name, class2_name]:
    temp = []
    with open(NOW_DIR + c, 'r') as f:
        while True:
            text = f.readline()
            if not text:
                break
            else:
                text = text[:-1]
                temp.append(text)
        f.close()
    class_names.append(temp)

def get_class(image_path):
    image = Image.open(image_path)
    image = crop(image)
    image = image.resize((128, 128), Image.LANCZOS)
    try:
        image_np = np.array(image)[:, :, 0]
    except:
        image_np = np.array(image)[:, :]
    image_np = 255 - image_np
    image_np = np.expand_dims(image_np, axis=-1)

    results = []
    for i in range(len(models)):
        pred = models[i].predict(np.expand_dims(image_np, axis=0))[0]
        target_value = pred.max()
        target_idx = (-pred).argsort()[0]
        results.append([target_value, class_names[i][target_idx]])
    return sorted(results, reverse=True)[0][1]


# 서버가 켜질 때 model을 한 번 구동하여 api 요청 시 바로 값을 return하도록 만듦
temp = get_class(NOW_DIR + 'weights/cnn/umbrella.png')
del temp

# if __name__ == '__main__':
#     print(get_class('umbrella.png'))