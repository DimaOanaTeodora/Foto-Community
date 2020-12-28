//---------------1p niv 2 t1-----------
			/*Varsta utilizator. Va exista in pagina, la inceput, un singur input in care un utilizator isi poate trece data
			 nasterii sub forma zi#luna#an (de exemplu 20#03#2001). La click pe un buton se va afisa imediat sub input varsta 
			 utilizatoului in ani, luni si zile, ore minute secunde ( de exemplu: 19 ani 3 luni si 4 zile, 12 ore 15 minute 4 secunde).
			 Afisajul varstei se va actualiza la fiecare secunda.*/

window.addEventListener("load",function() 
{     
      function afis(n)
        { 
       
           var d=parseInt(n[0]);
           var m=parseInt(n[1]);
           var y=parseInt(n[2]);

          var data=new Date();
           var dd=data.getDate();
           var yy=data.getFullYear();
           var mm=data.getMonth()+1;
        
           mesaj="Aveti "+  Math.abs(y-yy)+ " ani "+ Math.abs(m-mm)+ " luni "+Math.abs(d-dd)+" zile "+ parseInt(data.getHours())+ " ore " +parseInt(data.getMinutes())+ " minute " +parseInt(data.getSeconds())+" secunde ";

           document.getElementById("afis_varsta").innerHTML=mesaj; 
        

        }
       
       document.getElementById("buton").onclick = function()
       {functie()}
       

       function functie()
        {     
               x=document.getElementById("varsta");
               n=x.value.split('#');
               if(n[0]=="dd")
            
              {
                mesaj="nu ati introdus data nasterii";
                 document.getElementById("afis_varsta").innerHTML=mesaj; 
            
              }
              else
              {
              var id;  
              id=setInterval(()=>{afis(n)},1000);
               }
        } 
       
})