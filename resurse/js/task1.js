 
 //---------------- niv 2 t4--------------------------------------------
			/* 
			Timp petrecut pe pagina. Folosind localStorage sa se afiseze pe
			 fiecare pagina (de exemplu in footer) numarul de minute si secunde 
			 petrecute in total (pe parcursul tuturor vizitarilor) de un utilizator 
			 pe pagina curenta (se va afisa pe fiecare pagina a site-ului). 
			 Afisajul se va actualiza la fiecare secunda.. Realizati
			 taskul folosind aceeasi functie pentru toate paginile.*/


window.addEventListener("load",function afis() 
{
	var t;
		function get() 
    {
			t= parseInt(localStorage.getItem('timp'));
			  if(isNaN(t))
				 t=0;
					return t;
		}
	
			var timer = setInterval(
						function() {

									timp = get() + 1000;
									localStorage.setItem('timp',parseInt( timp));


									  var afis="";
									  if(parseInt(timp/1000/60/60) > 0)
										afis+=parseInt(timp/1000/60/60) + " ore";
										


									  if( parseInt(timp/1000/60) > 0)
										afis+= parseInt(timp/1000/60)%60 + " minute ";
									
									document.getElementById("timp").innerHTML = "Timp petrecut pe pagina: "+afis + parseInt(timp/1000)%60 + " secunde";
								
									}, 1000);
    
			
})
 
 
 
 