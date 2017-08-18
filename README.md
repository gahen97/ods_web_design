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


The ArrayStack works more as a SortedSet ..
The BinaryHeap exercise is not done.



TO ADD AN EXERCISE:
Add the exercise to the Views. See Template.pug for more details on how to do this.
Write the code for the exercise and link the Pug to your code.
Add the video to the H5P Server (see h5p_server > readme.MD for details) and link to it from the Pug.

Once this is complete, the exercise should be usable from:
  host:port / EXERCISE

Where host:port is the host & port defined inside of config.json as the main host and port.
