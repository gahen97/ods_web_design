h5p_server/ controls the interactive video

public/exercise/ contains all the exercise code

views/[NAME]/Exercise.pug  contains the pug code to run an exercise

views/ods_video.pug  contains the main code for webpage design


To install:

npm install

To run the server:

Open a terminal to h5p_server/lib

Run sudo node ../bin/h5p-cli server

Open a terminal to the root

Run node Server

To load an exercise:

Go to http://localhost:2402/EXERCISE_NAME

Where EXERCISE_NAME is the name of the exercise (matching the directory under Views/)


TO CHANGE SERVER HOSTS:

Under config.json, there are three servers (ports & host).  
H5P controls the videos;  
Exercises_Old controls the older exercise server;  
main controls the main server to host the videos, exercises, index, and Table of Contents pages.

ArrayStack exercise is over-simplified and works more as a SortedSet ;
  should not use.
BinaryHeap is not done.
