from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)

# Configuration: Path to where your converted HTML files and metadata live
DATA_DIR = 'data'
INDEX_FILE = os.path.join(DATA_DIR, 'index.json')

# Load the search index at startup
def load_index():
    if os.path.exists(INDEX_FILE):
        with open(INDEX_FILE, 'r') as f:
            return json.load(f)
    return []

search_index = load_index()

# 1. SEARCH API ENDPOINT
@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('q', '').lower()
    mode = request.args.get('mode', 'text')
    
    # Filter documents based on text content or tags
    results = [
        doc for doc in search_index 
        if query in doc.get('tags', []) or query in doc.get('full_text', '').lower()
    ]
    
    return jsonify(results)

# 2. DOCUMENT RETRIEVAL ENDPOINT
@app.route('/api/document/<doc_id>', methods=['GET'])
def get_document(doc_id):
    # Retrieve the full HTML file content based on ID
    # This assumes your index maps IDs to file paths
    doc = next((d for d in search_index if d['id'] == doc_id), None)
    if doc:
        with open(doc['file_path'], 'r') as f:
            return f.read()
    return jsonify({"error": "Document not found"}), 404

# 3. MOCK CONVERSION TRIGGER (Placeholder for your scanning script)
@app.route('/api/convert', methods=['POST'])
def trigger_conversion():
    # This is where your PDF processing script would be called
    # After processing, it would update the 'index.json'
    return jsonify({"status": "Conversion triggered successfully"})

if __name__ == '__main__':
    # Ensure data directory exists
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
    app.run(debug=True, port=5000)
