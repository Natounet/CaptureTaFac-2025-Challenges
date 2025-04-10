from flask import Flask, render_template, request, send_file
import os
from random import randint

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/data', methods=['POST'])
def data():
    user_input = request.form.get('data')
    file = request.files.get('pdf')

    if not file:
        return {"error": "Aucun fichier pdf n'a été uploadé"}, 400
    
    nonce = randint(100000,9999999)
    try:
        with open(f'upload/input_{nonce}.pdf','wb') as f:
            f.write(file.read())

        os.system(f'convert -density 300 upload/input_{nonce}.pdf -gravity center -pointsize 20 -fill "rgba(0,0,0,0.5)" -annotate 0 "{user_input}" download/output_{nonce}.pdf')
        waterwarked_pdf = open(f'download/output_{nonce}.pdf','rb')

        os.remove(f'download/output_{nonce}.pdf')
        os.remove(f'upload/input_{nonce}.pdf')
    except:
        return {"error": "Une erreur est survenu, veuillez réessayez"}, 400

    return send_file(waterwarked_pdf, mimetype='application/pdf', as_attachment=True, download_name='watermarked_pdf.pdf')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
