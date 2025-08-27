const width = 320; // We will scale the photo width to this
let height = 0; // This will be computed based on the input stream

let streaming = false;

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photo = document.getElementById("photo");
const startButton = document.getElementById("start-button");
const allowButton = document.getElementById("permissions-button");
const torchButton = document.getElementById("toggleLight");
let track;

function webcam(params){
	navigator.mediaDevices
	.getUserMedia({ 
		video: params, 
		audio: false
	})
	.then((stream) => {
		const track = stream.getVideoTracks()[0];
		video.srcObject = stream;
		video.play();
	})
	.catch((err) => {
		console.error(`An error occurred: ${err}`);
	});
};

webcam({ facingMode: "environment", aspectRatio: 9/16});

torchButton.addEventListener("click", () => {
	webcam({ facingMode: "environment", advanced: [{ torch: true }], aspectRatio: 9/16});
});

video.addEventListener(
  "canplay",
  (ev) => {
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width);
      video.setAttribute("width", width);
      video.setAttribute("height", height);
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
      streaming = true;
    }
  },
  false,
);

startButton.addEventListener(
  "click",
  (ev) => {
    takePicture();
    ev.preventDefault();
  },
  false,
);
function clearPhoto() {}

clearPhoto();

function takePicture() {
  const context = canvas.getContext("2d");
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
	//context.fillStyle = "black";
	//context.fillRect(0, 0, width, height/2)

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  } else {
    clearPhoto();
  }
}
