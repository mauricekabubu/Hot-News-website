from flask import Flask,render_template,request,send_from_directory
from config import NEWS_API_KEY
import requests
#Flask boilerplate
app = Flask(__name__)
@app.route("/")
def index():
    query = request.args.get("query","latest")
    url = f"https://newsapi.org/v2/everything?q={query}&apiKey={NEWS_API_KEY}"
    response = requests.get(url)
    news_data = response.json()
    #print(news_data)
    articles = news_data.get("articles",[])
    
    return render_template("index.html",articles=articles,query=query)

@app.route("/robots.txt")
def robots_txt():
    return send_from_directory(app.static_folder, "robots.txt")

@app.route("/sitemap.xml")
def sitemap_xml():
    return send_from_directory(app.static_folder, "sitemap.xml", mimetype="application/xml")

if __name__ == "__main__":
    app.run(debug=True)
