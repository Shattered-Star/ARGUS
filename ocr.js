document.getElementById("readId").addEventListener("click", () => {
	Tesseract.recognize(
		document.getElementById("photo").src,
		'eng',
		{ logger: m => console.log(m),}
	).then(({ data: { text } }) => {
		console.log("Recognized text:", text);
		alert(text);
	});
});