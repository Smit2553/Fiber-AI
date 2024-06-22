import openfoodfacts
from flask import Flask, request, jsonify

app = Flask(__name__)

api = openfoodfacts.API(user_agent='LiveLaughToasterBath/1.0')

@app.route('/' , methods=['GET'])
def get():
    return jsonify({'message': 'Hello, World!'})

@app.route('/search/<string:code>', methods=['GET'])
def search(code):
    product = api.product.get(code, fields=['status_id','product_name', 'brands', 'ingredients_text_en', 'allergens', 'nutriments', 'code', 'image_url'])
    return jsonify(product)



if __name__ == '__main__':
    app.run(debug=True)