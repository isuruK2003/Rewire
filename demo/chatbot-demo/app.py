from flask import Flask, render_template
from flask_socketio import SocketIO, send
from chatbot import ChatBot

app = Flask(__name__)
app.config['SECRET_KEY'] = 'oop_is_the_best'

socketio = SocketIO(app, cors_allowed_origins="*")

# initialize chatbot
chatbot = ChatBot()

@app.route("/")
def route():
    return render_template("index.html")

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('message')
def handle_message(message):
    print(message)
    print(f'Received message: {message}')
    response = chatbot.reply(message)
    print(f"Reply generated: {response}")
    send(response)


if __name__ == "__main__":
    print("Starting Flask server with Socket.IO...")
    socketio.run(app, debug=True)
