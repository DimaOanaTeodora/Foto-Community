 //-----------------1.5 p niv 3 t1----------------------------------
			/*
			Realizarea unei animatii mai complexe prin javascript. Exemple de animatii posibile:
			deplasarea unui obiect pe o linie franta inchisa/deschisa

			
 window.onload=function()
 {
      function animate(options) 
      {

        var start = performance.now();

        requestAnimationFrame(
        function animate(time) 
        {
          
          var timeFraction = (time - start) / options.duration;
          if (timeFraction > 1)
             timeFraction = 1;
          
          var progress = options.timing(timeFraction)
          
          options.draw(progress);

          if (timeFraction < 1) {
            requestAnimationFrame(animate);
          }

        });
      }
    function makeEaseOut(timing)
    {
          return function(timeFraction)
              {
                return 1 - timing(1 - timeFraction);
              }
    }

    function bounce(timeFraction) 
    {
        for (let a = 0, b = 1, result; 1; a += b, b /= 2) 
        {
          if (timeFraction >= (7 - 4 * a) / 11)
           {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
          }
        }
    }

    function quad(timeFraction)
    {
        return Math.pow(timeFraction, 2);
    }

    ball.onclick = function() 
    {

          let height = field.clientHeight - ball.clientHeight;
          let width = 100;

          animate({
            duration: 2000,
            timing: makeEaseOut(bounce),
            draw: function(progress) {
              ball.style.top = height * progress + 'px'
            }
          });

          animate({
            duration: 2000,
            timing: makeEaseOut(quad),
            draw: function(progress) {
              ball.style.left = width * progress + "px"
            }
          });
    }
 }
 */
 //------------task niv 2 t13---------------------------
 /*Numar cuvinte. Sa se afiseze la finalul fiecarei paginii din site, in footer, numarul de cuvinte
 (siruri demarcate de caractere nealfanumerice: spatiu, virgula, punct etc.) existente in body 
 (consideram cuvintele ca fiind separate prin spatii.
 */
 
window.addEventListener("load",function()
{
	
    //var nr=0;
    //var body= document.getElementsByTagName("body");
    //nr=body[0].innerText.split(/[^A-Za-z0-9]/).length;
	//nr--;//imi ia cu un cuvant in plus nu stiu de ce
	
	var nr=0;
	 var body= document.getElementsByTagName("body");
	 body=body[0].innerText;
	 body = body.replace(/(^\s*)|(\s*$)/gi,"");//scoate ce incepe si se termina cu spatii albe
    body = body.replace(/[ ]{2,}/gi," ");//doua sau mai multe spatii
    body = body.replace(/\n /,"\n"); // exclude newlineul
    nr= body.split(' ').length;
       
    document.getElementsByTagName("footer")[0].innerHTML+="<div id="+'"footer">'+"Numarul de cuvinte este: " + nr+ "</div>";
	//document.write("Numarul de cuvinte este: "+nr)

	
});


