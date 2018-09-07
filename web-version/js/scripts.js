$(document).ready (function() {
    $("#myProfile").click(function() {
        window.location.href = './myProfile.html' 
    })
    $("#addItems").click(function() {
        window.location.href = './addItems.html' 
    })
    $("#manageItems").click(function() {
        window.location.href = './manageItems.html' 
    })

    $("form#contact").submit(function(event) {
        event.preventDefault();
        var contactName = $("#contactName").val();
        var contactEmail = $("#contactEmail").val();
        var contactSub = $("#contactSub").val();
        alert(contactName +", thank you for contacting us. We will get back to you shortly!");
        $("form#contact").trigger('reset');
    })

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = $('.myImg');
    var modalImg = $("#img01");
    var captionText = document.getElementById("caption");
    $('.myImg').click(function(){
        modal.style.display = "block";
        var newSrc = this.src;
        modalImg.attr('src', newSrc);
        captionText.innerHTML = this.alt;
    });

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

})
