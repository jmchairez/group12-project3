function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(input);
    });
});


    // SHOW UPLOADED IMAGE NAME

var input = document.getElementById( 'upload' );
var infoArea = document.getElementById( 'upload-label' );

input.addEventListener( 'change', showFileName );
function showFileName( event ) {
  var input = event.srcElement;
  var fileName = input.files[0].name;
  infoArea.textContent = 'File name: ' + fileName;
}
var Result = {
	0: "Damage",
	1: "No damage"
};


$("#predict").click(function () {
	// let image = new FormData($('#inputForm')[0].files[0]);
	console.log($('#imageResult').attr('src'))
	$.ajax({
		url: '/predict',
		data:document.getElementById('upload').files[0],
		contentType:false,
		cache:false,
		processData:false,
		method:'POST',
	}).done(
		function (d){
		console.log(d['damaged'])
			$('#prediction').text(Math.round((1- d['damaged']) * 100,2) + '% Damaged')
		}
	)

	// let pre_image = tf.browser.fromPixels(image, 3)
	// 	.resizeNearestNeighbor([128, 128])
	// 	.expandDims()
	// 	.toFloat()
	// 	.reverse(-1); 
	// let predict_result = await model.predict(pre_image).data();
	// console.log(predictions);
	// let order = Array.from(predict_result)
	// 	.map(function (p, i) { 
	// 		return {
	// 			probability: p,
	// 			className: Result[i] 
	// 		};
	// 	}).sort(function (a, b) {
	// 		return b.probability - a.probability;
	// 	}).slice(0, 2);

	// $("#list").empty();
	// order.forEach(function (p) {
	// 	$("#list").append(`<li>${p.className}: ${parseInt(Math.trunc(p.probability * 100))} %</li>`);
	// });
});