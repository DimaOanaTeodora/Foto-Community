 window.addEventListener("load",function() {
 //------------------------1.5 p niv 3 t5------------------------------------
				 /*(site descriptiv, cu multe subsectiuni). Crearea unui cuprins in mod automat (cuprinsul va fi construit prin program 
				 la intrarea pe pagina), organizat sub forma de lista de linkuri. 
				 La click pe fiecare link utilizatorul este dus la inceputul sectiunii 
				 corespunzatoare. Trebuie sa existe minim un nivel de imbricare (sectiuni in sectiuni). 
				 Pentru sectiunile interne unei sectiuni se va creea o lista imbricata de linkuri.
				 */
 //am format curpinsul
  var cuprins="<h1>Curpins:</h1>"+'<ol class="cuprins" type="a">';
  
  var vect=document.getElementsByTagName("section");
  var nr=vect.length;

  var i=0;
  nr_id=1;
  while(i<nr)
  {
      
      var v=vect[i].getElementsByTagName("section");
      
     
      if(v.length>0)
       {  
            
            id="#C"+nr_id;//formez id-ul 
            nr_id++;
            var titlu=vect[i].getElementsByTagName("h2")[0].innerHTML;
            html='<li><a href='+'"'+id+'"'+">"+titlu+"</a></li>";
            cuprins=cuprins+html;

             var cuprins2='<ol type="i">';
            for(let j=1;j<=v.length;j++)
            {
             
            
            idd="#S"+j;//formez id-ul

            var t=v[j-1].getElementsByTagName("h3")[0].innerHTML;
           
            ht='<li><a href='+'"'+idd+'"'+">"+t+"</a></li>";
            cuprins2=cuprins2+ht;
            
            i++;

            }
            cuprins2=cuprins2+"</ol>";
            cuprins=cuprins+cuprins2;
           
          }
          else
          {
               id="#C"+nr_id;//formez id-ul 
               nr_id++;
               var titlu=vect[i].getElementsByTagName("h2")[0].innerHTML;
              html='<li><a href='+'"'+id+'"'+">"+titlu+"</a></li>";
              cuprins=cuprins+html;
              
          }
      i++;
  }
  cuprins=cuprins+"</ol>";

 document.getElementById("cup").innerHTML=cuprins;
 })