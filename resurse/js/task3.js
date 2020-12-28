//---------------------1p niv 2 t2---------------------
	 
	/*
	Aparitie treptata cuvant. La intrarea pe pagina, sa existe minim 2 sectiuni cu text, in care textul apare cuvant cu cuvant intr-o 
	"animatie" JavaScript (la fiecare treime de secunda apare cate un cuvant din text).
	*/
window.addEventListener("load",function()
{

   var paragraf1=document.getElementById("task1").innerHTML;
  var paragraf2=document.getElementById("task2").innerHTML;
  
  
  //sterg continutul paragrafelor
  document.getElementById("task1").innerHTML="";
  document.getElementById("task2").innerHTML="";
  
  
  
          //functie pentru despartire in cuvinte si afisare
          function cuvinte(sir, id)
          {
                var intervalID;
                sir=sir.split(' ');
                var i=0;
                function repeta() 
                {
                intervalID = setInterval(afis, 1000/3);
                

                }
                //functie pentru afisare cuvinte
                function afis() 
                {

                  let continut=document.getElementById(id).innerHTML;
                  document.getElementById(id).innerHTML=continut+sir[i]+" ";
                  
                  //console.log(sir[i]);
                  if(i==sir.length-1)
                      {clearInterval(intervalID);
                     
                      console.log(1);

                      return 
                      
                      }

                   else        
                  i++;
                 
                }
                //apelare functie cu afisare la interval
                repeta();
              
          }    
 
   //apelare functie 
 
   cuvinte(paragraf1, "task1");
   
  cuvinte(paragraf2, "task2");
 
 
})