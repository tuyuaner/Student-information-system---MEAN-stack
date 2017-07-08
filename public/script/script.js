// // drag and drop
// function drag(ev) {
//     ev.dataTransfer.setData("location_tag", ev.target.innerHTML);
//     $(ev.target).attr("id", "location_li");
//     ev.dataTransfer.setData("location_tag_id", ev.target.id);
//     // console.log(ev.target.id);
// };
//
// function dropOver(ev) {
//     ev.preventDefault();
// };
//
// function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("location_tag");
//
//     $("#location_sign_up").val(ev.target.value + data + "; ");
//     var targetId = ev.dataTransfer.getData("location_tag_id");
//     $("#location_li").remove();
// };

$(document).on("keyup",".passwordfield",function(){
    if($(this).val()){
      $(".glyphicon-eye-open").show();
    }
    else{
      $(".glyphicon-eye-open").hide();
    }
});

$(document).on("mousedown",".glyphicon-eye-open",function(){
                $(".passwordfield").attr('type','text');
            }).mouseup(function(){
            	$(".passwordfield").attr('type','password');
            }).mouseout(function(){
            	$(".passwordfield").attr('type','password');
            });
