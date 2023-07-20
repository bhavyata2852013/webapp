function setup() {
    canvas = createCanvas(480,380);
    canvas.center();
}

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function draw() {
    image(video,0,0,480,380);
    if (status == true) {
        ObjectDetector.detect(video,gotResult);

        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: objects Detected";
            document.getElementById("no_of _objects").innerHTML = "No of objects:" + objects.length;

            fill("#6600cc");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#6600cc");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start() {
    ObjectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

objects = [];
status = "";
video = "";

function modelLoaded() {
    console.log("Model loaded");
    status = true;
    video.loop();
    video.speed(1.5);
    video.volume(0);
}

function gotResult(error,results) {
    if (error) {
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}