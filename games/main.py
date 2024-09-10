import turtle
import random
from functools import partial

turtle.tracer(0, 0)
screen = turtle.Screen()
screen.setup(600, 400)
turtle.bgcolor("light grey")

offset = 75
board = []
boardsize = 2
turtleWidth = 60
turtleSz = (4, 3)
count = 0
points = 0
skips = 5

pen = turtle.Turtle()
pen.penup()
pen.shape('turtle')


def stats():
  global points, skips
  pen.clear()
  turtle.tracer(1, 0)
  pen.goto(-250, 150)
  pen.write(f"{points} points\n{skips} skips left")
  pen.goto(-250, 140)
  turtle.tracer(0, 0)


def onclick(trtl, x, y):
  global points, board
  if trtl.val == "x":
    points = points + 1
    print(f"Good job, you have {points} points :D !")
    change()
  else:
    if points > -1:
      points = points - 1
      print(f"Try Again :c {points} points")
    else:
      print("Game over!")
      for t in board:
        t.hideturtle()
      board.clear()
      turtle.update()


def newturtle(x, y, c, var):
  test = turtle.Turtle()
  board.append(test)
  test.shape("turtle")
  global turtleSz
  test.turtlesize(turtleSz[0], turtleSz[1])
  test.seth(90)
  test.penup()
  test.color(c)
  test.goto(x, y)
  test.val = var
  test.onclick(partial(onclick, test))


def change():
  global offset, boardsize, turtleWidth, turtleSz, count
  for t in board:
    t.hideturtle()

  board.clear()

  if offset > 25:
    stats()
    try:
      # 0xffffff = 16777215
      rand = random.randint(0, 16777215)
      randh = hex(rand)
      hs = str(randh).replace("0x", "#")

      rand = rand - offset
      offset = int(offset * .98)
      randh = hex(rand)
      hso = str(randh).replace("0x", "#")

      if count == 3:
        boardsize = boardsize + 1
        if turtleSz[1] > 1:
          turtleSz = (turtleSz[0] - 1, turtleSz[1] - 1)
          turtleWidth = turtleWidth - 20
        count = 0
      else:
        count = count + 1

      odd = random.randint(0, boardsize * boardsize - 1)

      for i in range(boardsize):
        for j in range(boardsize):
          x = (i * (turtleWidth + 10)) - ((boardsize - 1) * .5 *
                                          (turtleWidth + 10))
          y = (j * (turtleWidth + 10)) - ((boardsize - 1) * .5 *
                                          (turtleWidth + 10))

          if i * boardsize + j == odd:
            newturtle(x, y, hso, 'x')
          else:
            newturtle(x, y, hs, 'o')

      turtle.update()
    except:
      change()
  else:
    print("Good job! You won!")


def skip():
  global skips
  if skips > 0:
    change()
    skips = skips - 1


change()
turtle.onkey(skip, "space")
turtle.listen()
turtle.done()
