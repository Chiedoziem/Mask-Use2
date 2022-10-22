Webcam.set({
    width:350,
    height:350,
    image_format: 'png',
    png_quality:90
});
camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
document.getElementById('result_object_name').innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/njji-EyhP/model.json', modelLoaded);
function modelLoaded(){
    console.log('Model has loaded');

}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);

} 
function gotResult(error, results){
    if (error){
        console.error(error)
    }else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
   speak();
    }
    function speak(){
    var synth = window.speechSynthesis;
     speak_data = "Access Denied"
   speak_data_1 = "Access Granted"
    if (results[0].label === 'No Mask'){
       
        document.getElementById('denied').innerHTML = 'Access Denied ❌';
 var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    }else if(speak_data !== 'Mask'){
        
        document.getElementById('denied').innerHTML = 'Access Granted ✅ ';
        var utterThis = new SpeechSynthesisUtterance(speak_data_1);
        synth.speak(utterThis);
    }
    
}
}
