$(document).ready(function(){
  $("#txt,#fontSize,#dashesSpace").on("change keyup",drawText)
  drawText();
  $("#export").on("click",function(event)
  {
    event.preventDefault();
   
     //this.href=$("#cnv")[0].toDataURL();
     var url = $("#cnv")[0].toDataURL();
     $("#imgRes").attr("src",url).on("load", function()
     {
         window.print();
     });
      
  });
});

 

function drawText(event)
{
  event && event.preventDefault();
  var canvas = $("#cnv").removeClass("hidden")[0],
      ctx = canvas.getContext("2d"),
      fontSize = $("#fontSize").val(),
      dashesSpace = $("#dashesSpace").val(),
      newText = $.trim($("#txt").val()),
      canvasNewSize = getCanvasSize(newText,fontSize);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  canvas.width = canvasNewSize.width + 50;
  canvas.height = canvasNewSize.height;
  
  //http://stackoverflow.com/questions/15397036/drawing-dashed-lines-on-html5-canvas
  //http://www.rgraph.net/blog/2013/january/html5-canvas-dashed-lines.html
  ctx.setLineDash([Math.floor(Math.sqrt(dashesSpace)) ,dashesSpace]);//also make the dots a bit larger when the spaces get larger
  ctx.font =  fontSize + "px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
    ctx.lineWidth = 3;
  //ctx.fillText($("#inputText").val(), centerX, centerY);
  var posX = 25;//canvas.width / 2;
  var posY = canvas.height - (fontSize * 0.7);
  ctx.strokeText(newText, posX, posY);
  // ctx.fillText(newText, posX, posY);
  
}
//using this method and not   ctx.measureText(newText).width because of arabic, measureText doesn't return the right width for arabic
// + note that newText should be trimmed - trailing spaces will not affect the width of the span..
function getCanvasSize(newText,fontSize)
{
    var d = $("<span>");
    d.css("fontSize",fontSize + "px");
    d.text(newText);
    d.appendTo("body");
    var ret = {
      width : d[0].offsetWidth,
      height : d[0].offsetHeight
    };
  
    d.remove();
    return ret; 
}

