from flask import Flask, jsonify, request
import time
# Initialisation de l'application Flask
app = Flask(__name__)

# Code secret pour le coffre-fort
SECRET_CODE = "0169797987152986"
# Contenu du coffre-fort
vault_content = {
    "items": [
        {
            "id": "doc1",
            "title": "Dossier confidentiel #1: Projets secrets",
            "description": "Plans détaillés du projet Alpha-X23, à ne pas divulguer."
        },
        {
            "id": "doc2",
            "title": "Dossier confidentiel #2: Codes d'accès",
            "description": "Codes d'accès aux serveurs principaux et aux bases de données."
        },
        {
            "id": "doc3",
            "title": "Dossier confidentiel #3: Documents personnels",
            "description": "Contrats, certificats et documents légaux importants."
        },
        {
            "id": "doc4",
            "title": "Dossier confidentiel #3: Flag",
            "description": "CTFAC{50m371m35_3v3n_m1ll153c0nd5_m4773r}"
        },
        {
            "id": "doc5",
            "title": "Dossier confidentiel #4: Contrats importants",
            "description": "Contrats avec les partenaires stratégiques et fournisseurs."
        }
    ]
}

# Route pour la page d'accueil
@app.route('/')
def home():
    return app.send_static_file('index.html')

# Endpoint pour vérifier le code
@app.route('/code')
def verify_code():
    code = request.args.get('c', '')
    
    if verify_code(code):
        return jsonify({
            "success": True,
            "message": "Code valide"
        })
    else:
        return jsonify({
            "success": False,
            "message": "Code invalide"
        })

# Endpoint pour récupérer le contenu du coffre
@app.route('/content')
def get_content():
    code = request.args.get('c', '')
    
    if code == SECRET_CODE:
        return jsonify(vault_content)
    else:
        return jsonify({
            "error": True,
            "message": "Code d'accès invalide"
        }), 403

def verify_code(code: str) -> bool:
    for i in range(0, len(code)):
        if code[i] == SECRET_CODE[i]:
            time.sleep(0.5)            
        else:
            return False
        
    if(len(code) != len(SECRET_CODE)):
        return False

    return True

