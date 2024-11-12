from flask import Flask, render_template, request
import os

app = Flask(__name__)


@app.route('/')
def root():
    return render_template('index.html')

@app.route('/heroes')
def heroes():
    return render_template('heroes.html')

@app.route('/brigade.html')
def brigade_page():
    brigade_number = request.args.get('brigade')
    if brigade_number:
             # Process the brigade number (e.g., fetch data from a database)
             # ... your logic here ...
        return render_template('brigade.html', brigade=brigade_number) # Render a template
    else:
        return "Brigade number not provided", 400  # Or redirect, render an error page



if __name__ == "__main__":
    app.run(debug=True)
