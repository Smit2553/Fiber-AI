import openfoodfacts
from flask import Flask, request, jsonify
from flask_cors import CORS 


app = Flask(__name__)
CORS(app)

api = openfoodfacts.API(user_agent='LiveLaughToasterBath/1.0')

@app.route('/' , methods=['GET'])
def get():
    return jsonify({'message': 'Hello, World!'})

@app.route('/search/<string:code>', methods=['GET'])
def search(code):
    product = api.product.get(code, fields=['status_id','product_name', 'brands', 'ingredients_text_en', 'allergens', 'nutriments', 'code', 'image_url'])
    return jsonify(product)



if __name__ == '__main__':
    # Update host to your local IP address
    app.run(debug=True, host='10.56.224.52', port=5050)