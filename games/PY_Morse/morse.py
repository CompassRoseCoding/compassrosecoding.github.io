import time
import pygame
import random

# a dictionary to convert letter to morse
alph = {
    "A": ".-",
    "N": "-.",
    "B": "-...",
    "O": "---",
    "C": "-.-.",
    "P": ".--.",
    "D": "-..",
    "Q": "--.-",
    "E": ".",
    "R": ".-.",
    "F": "..-.",
    "S": "...",
    "G": "--.",
    "T": "-",
    "H": "....",
    "U": "..-",
    "I": "..",
    "V": "...-",
    "J": ".---",
    "W": ".--",
    "K": "-.-",
    "X": "-..-",
    "L": ".-..",
    "Y": "-.--",
    "M": "--",
    "Z": "--.."

    # extra stuff for more complex game
    # "1": ".----",
    # "6": "-....",
    # "2": "..---",
    # "7": "--...",
    # "3": "...--",
    # "8": "---..",
    # "4": "....-",
    # "9": "----.",
    # "5": ".....",
    # "0": "-----",
    # "&": ".-...",
    # '@': '.--.-.',
    # ')': '-.--.-',
    # '(': '-.--.',
    # ':': '---...',
    # ',': '--..--',
    # '=': '-...-',
    # '!': '-.-.--',
    # '.': '.-.-.-',
    # '-': '-....-',
    # '*': '-..-',
    # '$': '...-..-',
    # '+': '.-.-.',
    # '?': '..--..',
    # '\\': '-..-.',
    # '\n': '.-.-',
    # " ": "-...-.-",
    # "‌": "----"
}

response = input("encode, decode, or quiz?\n")


# play dash noise
def dash():
    pygame.mixer.init()
    my_sound = pygame.mixer.Sound('dash.wav')
    my_sound.play()
    pygame.time.wait(int(my_sound.get_length() * 1000))
    time.sleep(.1)


# play dot noise
def dot():
    pygame.mixer.init()
    my_sound = pygame.mixer.Sound('dot.wav')
    my_sound.play()
    pygame.time.wait(int(my_sound.get_length() * 1000))
    time.sleep(.1)


# pause for space
def space():
    time.sleep(.5)


# encodes a message in morse and plays out the sounds
# returns message in written morse
def encode(mparam):
    value = ""
    for letter in mparam:
        value = value + " " + alph[letter.upper()]
    for symbol in value:
        if symbol == ".":
            dot()
        elif symbol == "-":
            dash()
        else:
            space()
    return value


# decode written morse
def decode(myMess):
    myMess = myMess.split()
    value = ""
    for morse in myMess:
        value = value + list(alph.keys())[list(alph.values()).index(morse)]
    return value


# want to learn morse? this handy quiz will test you for each letter!
def quiz():
    print("Guess the letter! Enter 'quit' to exit.")
    alist = list(alph)
    while input != "quit":
        rand = random.randint(0, len(alist) - 1)
        letter = alist[rand][0]
        encode(letter)
        inpt = input("What was that letter?")
        while input == "repeat":
            encode(letter)
            inpt = input("What was that letter?")
        if inpt.upper() == letter:
            print('Good job :)')
        elif inpt == "quit":
            break
        else:
            print("The answer was " + letter + ". Better luck next time!")


# UI deck
if response.lower() == "encode":
    message = input(f"What do you want to {response}?\n")
    print(encode(message))
elif response.lower() == "decode":
    message = input(f"What do you want to {response}?\n")
    print(decode(message).replace("_", "-"))
elif response.lower() == "quiz":
    quiz()
else:
    message = input(f"What do you want to {response}?\n")
    print(encode(message))
    print(decode(encode(message)))
