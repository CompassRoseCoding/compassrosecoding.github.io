import time
import turtle
from functools import partial

from PIL import Image
import os

colors = [
    "yellow", "gold", "orange", "red", "maroon", "violet", "magenta", "purple",
    "navy", "blue", "skyblue", "cyan", "turquoise", "lightgreen", "green",
    "darkgreen", "chocolate", "brown", "black", "gray"
]

SCRNSZ = 600
PNSZ = .75
IMGPATH = "screenshots/"
FILENAME = "default"

screen = turtle.Screen()
screen.setup(SCRNSZ, SCRNSZ)

canvas = turtle.getcanvas()

# the cursor- your drawing tool
cursor = turtle.Turtle()
cursor.shape("circle")
cursor.turtlesize(PNSZ, PNSZ)
cursor.width(int(PNSZ * 20))
cursor.color(colors[0], "white")

# the mirror cursor- for mirror drawing
mrsor = turtle.Turtle()
mrsor.shape("circle")
mrsor.turtlesize(PNSZ, PNSZ)
mrsor.width(int(PNSZ * 20))
mrsor.color(colors[0], "white")
mrsor.pendown()


# put the pen up or down
def click(x, y):
    if cursor.isdown():
        cursor.penup()
    else:
        cursor.pendown()


#put the mirror pen up or down
def mclick(x, y):
    if mrsor.isdown():
        mrsor.penup()
    else:
        mrsor.pendown()


# drag the ordinary cursor - the mirror cursor mirrors
def drag(x, y):
    cursor.goto(x, y)
    mrsor.goto(-x, y)
    time.sleep(.2)


#drag the mirror cursor- regular one mirrors
def mdrag(x, y):
    cursor.goto(-x, y)
    mrsor.goto(x, y)
    time.sleep(.2)


def change(color, x, y):
    cursor.color(color, "white")


# erase sections of the drawing
def eraser(x, y):
    cursor.color("white", "black")
    mrsor.color("white", "black")


# make cursors bigger
def large():
    global PNSZ
    PNSZ = PNSZ + .25
    cursor.turtlesize(PNSZ, PNSZ)
    cursor.width(PNSZ * 20)
    mrsor.turtlesize(PNSZ, PNSZ)
    mrsor.width(PNSZ * 20)


#make cursors smaller
def small():
    global PNSZ
    if PNSZ > 0:
        PNSZ = PNSZ - .25
        cursor.turtlesize(PNSZ, PNSZ)
        cursor.width(PNSZ * 20)
        mrsor.turtlesize(PNSZ, PNSZ)
        mrsor.width(PNSZ * 20)


# make screen zoom in
def zoom():
    global SCRNSZ
    SCRNSZ = SCRNSZ - 200
    screen.setup(SCRNSZ, SCRNSZ)


# make screen zoom in
def zoomout():
    global SCRNSZ
    SCRNSZ = SCRNSZ + 200
    screen.setup(SCRNSZ, SCRNSZ)


# take a picture of the contents of the screen and save it to filename
def screenshot():
    global IMGPATH, FILENAME
    print(IMGPATH)
    if not os.path.exists(IMGPATH):
        os.mkdir(IMGPATH)
    print(1)
    # takes image as .ellipsis
    screen.getcanvas().postscript(file=IMGPATH + "temp.eps")
    print(IMGPATH + "temp.eps")
    # convert image
    eps_image = Image.open(IMGPATH + "temp.eps")
    eps_image.load()
    eps_image.save(IMGPATH + FILENAME + ".jpg")
    print(IMGPATH + FILENAME + ".jpg")


# set the filename for the screenshot
def name():
    global FILENAME
    print(FILENAME)
    FILENAME = turtle.textinput("Name Screenshot", "Name of image: ")
    print(FILENAME)
    turtle.listen()


# clear the entire screen
def clear():
    cursor.clear()
    mrsor.clear()


# turn mirroring off and on
def mirror():
    if mrsor.isvisible():
        mrsor.hideturtle()
        mrsor.penup()
    else:
        mrsor.showturtle()
        if cursor.isdown():
            mrsor.pendown()

for i in range(len(colors)):
    palette = turtle.Turtle()
    palette.shape("square")
    palette.penup()
    palette.color(colors[i])
    palette.speed(0)
    palette.goto(SCRNSZ / 2 - 20, SCRNSZ / 2 - (i + 1) * 20)
    palette.onclick(partial(change, colors[i]))


palette = turtle.Turtle()
palette.shape("square")
palette.penup()
palette.color("black", "white")
palette.goto(SCRNSZ / 2 - 20, SCRNSZ / 2 - (len(colors) + 1) * 20)
palette.onclick(eraser)

cursor.ondrag(drag)
cursor.onclick(click, 3)
cursor.onrelease(drag)

mrsor.ondrag(mdrag)
cursor.onclick(mclick)
mrsor.onrelease(mdrag)

turtle.onkeypress(large, "q")
turtle.onkeypress(small, "e")
turtle.onkeypress(zoom, "r")
turtle.onkeypress(screenshot, "p")
turtle.onkeypress(name, "n")
turtle.onkeypress(mirror, "m")
turtle.onkeypress(clear, "c")
turtle.listen()

turtle.penup()

def printr(x, y):
    print(y - (-canvas.winfo_pointery()))
    print(screen.screensize()[1])

screen.onclick(printr)

while True:
    try:
        x, y = canvas.winfo_pointerx() - 651, -canvas.winfo_pointery() + 394
        drag(x,y)
    except:
        print("closed.")
        break

