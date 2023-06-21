Webcam.set({
    width: 350,
    height: 270,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function capture_image() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/P6i04FTXg/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded')
}

function identify() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("hand_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label
        speak();
        if(results[0].label == "Peace Sign") {
            document.getElementById("hand_gesture_icon").innerHTML = "&#9996;";
        }
        if(results[0].label == "Ok Sign") {
            document.getElementById("hand_gesture_icon").innerHTML = "&#128076;";
        }
        if(results[0].label == "Wave") {
            document.getElementById("hand_gesture_icon").innerHTML = "&#128400;";
        }
        if(results[0].label == "Good Sign") {
            document.getElementById("hand_gesture_icon").innerHTML = "&#128077;";
        }
        if(results[0].label == "Bad Sign") {
            document.getElementById("hand_gesture_icon").innerHTML = "&#128078;";
        }
        
    }
}

function speak() {
    if (prediction == "Peace Sign") {
        speak_data = "The V sign is a gesture often used to pose in photos and historically meant victory";
    }
    if (prediction == "Ok Sign") {
        speak_data = "The Ok sign is a way of gesturing the word okay"
    }
    if (prediction == "Wave") {
        speak_data = "Waving is a way to say Hi"
    }
    if (prediction == "Good Sign") {
        speak_data = "This sign usually represents the word good"
    }
    if (prediction == "Bad Sign") {
        speak_data = "This sign is usually used when something is considered bad"
    }
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
    
        
        
        
        