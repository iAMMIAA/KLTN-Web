import sys
import torch
from torchvision import transforms, models
from PIL import Image

#Load model
model = torch.load('ResNet18.pth', map_location=torch.device('cpu'))
model.eval()

#processing data
def preprocess_image(image_path):
    preprocess = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225],
        )
    ])

    image = Image.open(image_path)
    image = preprocess(image).unsqueeze(0)

    return image

#predict
def predict(image_path):
    image = preprocess_image(image_path)
    with torch.no_grad():
        output = model(image)
    _,predict_idx = torch.max(output, 1)
    return predict_idx.item()

if __name__ == "__main__":
    Image_path = sys.argv[1]
    predicted_idx = predict(Image_path)

    classes = ['3B-Medi', 'Agifamcin', 'Agifovir', 'Alpha-Choay',
               'Alprazolam-Mylam', 'Ambron', 'Ameflu-Daytime',
               'Amlodipin', 'Apha-Bevagyl', 'Arcalion']

    drug_name = classes[predicted_idx]

    print(drug_name)