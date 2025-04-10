from flask import Flask, render_template, request, send_file
from jinja2 import Template
import os
from random import randint
import subprocess

app = Flask(__name__)

BLACKLIST = ['$','`','&','|',' ','flag']

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/data', methods=['POST'])
def data():
    user_input = request.form.get('data')
    file = request.files.get('pdf')

    if check_input(user_input):
        return {"error": "Erreur caractère interdit"}, 400

    if not file:
        return {"error": "Aucun fichier pdf n'a été uploadé"}, 400
    
    nonce = randint(100000,999999)
    
    try:
        with open(f'upload/input_{nonce}.pdf','wb') as f:
                f.write(file.read())

        template = Template(f'{ user_input }')
        rendered_input = template.render(user_input=user_input)

        subprocess.run(['convert','-density','300',f'upload/input_{nonce}.pdf','-gravity','center','-pointsize','20','-fill','rgba(0,0,0,0.5)','-annotate','0',rendered_input,f'download/output_{nonce}.pdf'])
        waterwarked_pdf = open(f'download/output_{nonce}.pdf','rb')

        os.remove(f'download/output_{nonce}.pdf')
        os.remove(f'upload/input_{nonce}.pdf')
    except:
        return {"error": "Une erreur est survenu, veuillez réessayez"}, 400

    return send_file(waterwarked_pdf, mimetype='application/pdf', as_attachment=True, download_name='watermarked_pdf.pdf')

def check_input(user_input):
    return any([element in user_input for element in BLACKLIST])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
