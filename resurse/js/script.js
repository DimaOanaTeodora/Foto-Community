window.onload=function(){
	//creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();


	//la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	0 - netrimis
	1 - conexiune deschisa
	2 - s-au transmis headerele
	3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un stfel de pachet)
	4 - a terminat
	*/
	ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			
			
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					//document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseajaJsonTemplate(obJson);
					//document.getElementById("sorteaza_voturia")[0].onclick=function
					
					
					if(localStorage.getItem('continut')!=null)
						{
							document.getElementById("afisTemplate").innerHTML=localStorage.getItem('continut');
						}
						
					document.getElementById("sorteaza_voturi").onclick=function(){sortare_voturi(obJson)};
						
					//document.getElementById("nota_min").onclick=function(){nota_min(obJson)};
					//document.getElementById("nota_max").onclick=function(){nota_max(obJson)};
					document.getElementById("reset").onclick=function(){afiseajaJsonTemplate(obJson)
																		var elem= document.createElement("P");
																		elem.innerText = "Datele au fost resetate cu succes!!" ;
																		document.getElementById("insert").insertBefore(elem,document.getElementById("reset"));
																		setInterval(coloreaza, 1000);
																		localStorage.clear();
																		
																		
																		};
					//document.getElementById("pt").onclick=function(){portret(obJson)};
					//document.getElementById("pj").onclick=function(){peisaj(obJson)};
					//document.getElementById("fl").onclick=function(){flori(obJson)};
					
					

					//trebuie sa fac alegerea pt radiobuttons
					document.getElementById("preia").onclick=function(){afis();}
						function afis()
					  {	
						

							//preluarea datelor din radiobutton-urile bifate
							var radiobuttons=document.getElementsByName("gr_rad");		
						
							sir="";
							for(let rad of radiobuttons)
						
								if(rad.checked)
								{
									sir=rad.value;
									break;//iesim din for deaorece doar un radiobutton din grup poate fi bifat (si tocmai l-am gasit)
									
								}
							
							if(sir=="portret"){
												portret(obJson);
												 
											}
							else
								if(sir=="peisaj"){peisaj(obJson);}
							else
								{flori(obJson)}
					
					
					  }
					document.getElementById("preia2").onclick=function(){afis_select();}
						function afis_select()
					  {	
					
							var vect=document.getElementsByName("select");		
						
							sir="";
							for(let rad of vect)
						{
								if(rad.selected){
									sir=rad.value;
									break;
								}
							}
						 if(sir=="min")
							 {nota_min(obJson);}
						 else
							{nota_max(obJson);} 
							
						
					  }					  
					
				}
	};
	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
	ajaxRequest.open("GET", "/json/studenti.json", true);
	//trimit catre server cererea
	ajaxRequest.send();
	
	function coloreaza()
	{
		var elem=document.getElementById("reset");
		
		var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
		
				elem.style.backgroundColor = "rgb(" + x + "," + y + "," + z + ")";
	}
	
	
	
	function sortare_voturi(obJson)
	{
		
			
			var v=[];
			for(let i=0;i<obJson.studenti.length;i++)
			{
			text=ejs.render('{"id": <%= student.id %>, "autor": "<%= student.autor %>","voturi":<%= student.voturi %>,"nota":<%= student.nota %>,"categorie":"<%= student.categorie %>","poza":"<%= student.poza %>"}',{student: obJson.studenti[i]});
			object=JSON.parse(text)
			v.push(object);
			
			}
			
			var vot=[];//retine voturile
			//sortare descrescatoare dupa voturi
			for(let i=0; i<v.length;i++)
			{
				vot[i]=v[i].voturi;
				
			}
			//sortare
			for(let i=0;i<v.length-1;i++)
				for(let j=i+1;j<v.length;j++)
					if(vot[i]<vot[j])
					{
						aux=vot[i];
						vot[i]=vot[j];
						vot[j]=aux;
						aux=v[i];
						v[i]=v[j];
						v[j]=aux;
						
					}
			
			//stergere json si afisare sortate
			
				
			//container=document.getElementById("afisTemplate").innerHTML="";
			continut="";
			for(let i=0; i<v.length;i++)
			{
				//stergere json 
				continut+="<div class='content' id='sortare'>"+"<p>"+"Id:"+v[i].id+"</p>"+
																"<p>"+"Autor:"+v[i].autor+"</p>"+
																"<p>"+"Voturi:"+v[i].voturi+"</p>"+
																"<p>"+"Nota:"+v[i].nota+"</p>"+
																"<p>"+"Categorie:"+v[i].categorie+"</p>"+
																'<p><img src="'+v[i].poza+'"'+"width='95%' height='85%'/></p>"
																+"</div>";
																
						
				
			}
			//document.write(continut);
			//container.innerHTML=continut;
			localStorage.setItem('continut', continut);
			document.getElementById("afisTemplate").innerHTML=continut;
		
		
		
	}
	function nota_min(obJson)
	{
		var v=[];
		for(let i=0;i<obJson.studenti.length;i++)
		{
		text=ejs.render('{"id": <%= student.id %>, "autor": "<%= student.autor %>","voturi":<%= student.voturi %>,"nota":<%= student.nota %>,"categorie":"<%= student.categorie %>","poza":"<%= student.poza %>"}',{student: obJson.studenti[i]});
		object=JSON.parse(text)
		v.push(object);
		
		}
		
		var note=[];//retine notele
		for(let i=0; i<v.length;i++)
		{
			note[i]=v[i].nota;
			
		}
		//calculez minimul pe note 
		var min=note[0];
		var poz=0;
		for(i=1;i<note.length;i++)
			if(note[i]<min)
			{
				min=note[i];
				poz=i;
			}
			
			
		
		//stergere json si afisare sortate
		
			
			//container=document.getElementById("afisTemplate").innerHTML="";
			var continut="Poza cu nota cea mai mica nota este :<br> ";
		
		
			//stergere json 
			
			continut+="<div class='content' id='sortare'>"+"<p>"+"Id:"+v[poz].id+"</p>"+
															"<p>"+"Autor:"+v[poz].autor+"</p>"+
															"<p>"+"Voturi:"+v[poz].voturi+"</p>"+
															"<p>"+"Nota:"+v[poz].nota+"</p>"+
															"<p>"+"Categorie:"+v[poz].categorie+"</p>"+
															'<p><img src="'+v[poz].poza+'"'+"width='95%' height='85%'/></p>"
															+"</div>";
															
					
			
		
		//document.write(continut);
		//container.innerHTML=continut;
		document.getElementById("afisTemplate").innerHTML=continut;
		setTimeout(function () {
                            alert("Nota minima este: "+min);
                        }, 1000);
		
		
	}
	function nota_max(obJson)
	{
		var v=[];
		for(let i=0;i<obJson.studenti.length;i++)
		{
		text=ejs.render('{"id": <%= student.id %>, "autor": "<%= student.autor %>","voturi":<%= student.voturi %>,"nota":<%= student.nota %>,"categorie":"<%= student.categorie %>","poza":"<%= student.poza %>"}',{student: obJson.studenti[i]});
		object=JSON.parse(text)
		v.push(object);
		
		}
		
		var note=[];//retine notele
		for(let i=0; i<v.length;i++)
		{
			note[i]=v[i].nota;
			
		}
		//calculez minimul pe note 
		var max=note[0];
		var poz=0;
		for(i=1;i<note.length;i++)
			if(note[i]>max)
			{
				max=note[i];
				poz=i;
			}
			
			
		
		//stergere json si afisare sortate
		
			
			//container=document.getElementById("afisTemplate").innerHTML="";
			var continut="Poza cu nota cea mai mare nota este :<br> ";
		
		
			//stergere json 
			
			continut+="<div class='content' id='sortare'>"+"<p>"+"Id:"+v[poz].id+"</p>"+
															"<p>"+"Autor:"+v[poz].autor+"</p>"+
															"<p>"+"Voturi:"+v[poz].voturi+"</p>"+
															"<p>"+"Nota:"+v[poz].nota+"</p>"+
															"<p>"+"Categorie:"+v[poz].categorie+"</p>"+
															'<p><img src="'+v[poz].poza+'"'+"width='95%' height='85%'/></p>"
															+"</div>";
															
					
			
		
		//document.write(continut);
		//container.innerHTML=continut;
		document.getElementById("afisTemplate").innerHTML=continut;
		setTimeout(function () {
                            alert("Nota maxima este: "+max);
                        }, 1000);
		
		
	}
	function portret(obJson)
	{
		
		
				var v=[];
				for(let i=0;i<obJson.studenti.length;i++)
				{
				text=ejs.render('{"id": <%= student.id %>, "autor": "<%= student.autor %>","voturi":<%= student.voturi %>,"nota":<%= student.nota %>,"categorie":"<%= student.categorie %>","poza":"<%= student.poza %>"}',{student: obJson.studenti[i]});
				object=JSON.parse(text)
				v.push(object);
				
				}
				 continut="Ati ales categoria portret: <br> ";
				
				for(let i=0; i<v.length;i++)
				{
					
					if(v[i].categorie=="portret")
						
					continut+="<div class='content' id='sortare'>"+"<p>"+"Id:"+v[i].id+"</p>"+
																	"<p>"+"Autor:"+v[i].autor+"</p>"+
																	"<p>"+"Voturi:"+v[i].voturi+"</p>"+
																	"<p>"+"Nota:"+v[i].nota+"</p>"+
																	"<p>"+"Categorie:"+v[i].categorie+"</p>"+
																	'<p><img src="'+v[i].poza+'"'+"width='95%' height='85%'/></p>"
																	+"</div>";
						
				}
				
				
				document.getElementById("afisTemplate").innerHTML=continut;
				//trebuie sa adaug continutul si butonul de chekcuit
				
		
		
		
		
	}
	function peisaj(obJson)
	{
		var v=[];
		for(let i=0;i<obJson.studenti.length;i++)
		{
		text=ejs.render('{"id": <%= student.id %>, "autor": "<%= student.autor %>","voturi":<%= student.voturi %>,"nota":<%= student.nota %>,"categorie":"<%= student.categorie %>","poza":"<%= student.poza %>"}',{student: obJson.studenti[i]});
		object=JSON.parse(text)
		v.push(object);
		
		}
		var continut="Ati ales categoria peisaj: <br> ";
		
		for(let i=0; i<v.length;i++)
		{
			
			if(v[i].categorie=="peisaj")
				
			continut+="<div class='content' id='sortare'>"+"<p>"+"Id:"+v[i].id+"</p>"+
															"<p>"+"Autor:"+v[i].autor+"</p>"+
															"<p>"+"Voturi:"+v[i].voturi+"</p>"+
															"<p>"+"Nota:"+v[i].nota+"</p>"+
															"<p>"+"Categorie:"+v[i].categorie+"</p>"+
															'<p><img src="'+v[i].poza+'"'+"width='95%' height='85%'/></p>"
															+"</div>";
				
		}
		
		
		document.getElementById("afisTemplate").innerHTML=continut;
		localStorage.setItem(continut);
		
	}
	function flori(obJson)
	{
		var v=[];
		for(let i=0;i<obJson.studenti.length;i++)
		{
		text=ejs.render('{"id": <%= student.id %>, "autor": "<%= student.autor %>","voturi":<%= student.voturi %>,"nota":<%= student.nota %>,"categorie":"<%= student.categorie %>","poza":"<%= student.poza %>"}',{student: obJson.studenti[i]});
		object=JSON.parse(text)
		v.push(object);
		
		}
		var continut="Ati ales categoria flori: <br> ";
		
		for(let i=0; i<v.length;i++)
		{
			
			if(v[i].categorie=="flori")
				
			continut+="<div class='content' id='sortare'>"+"<p>"+"Id:"+v[i].id+"</p>"+
															"<p>"+"Autor:"+v[i].autor+"</p>"+
															"<p>"+"Voturi:"+v[i].voturi+"</p>"+
															"<p>"+"Nota:"+v[i].nota+"</p>"+
															"<p>"+"Categorie:"+v[i].categorie+"</p>"+
															'<p><img src="'+v[i].poza+'"'+"width='95%' height='85%'/></p>"
															+"</div>";
				
		}
		
		
		document.getElementById("afisTemplate").innerHTML=continut;
		localStorage.setItem(continut);
		
		
	}
	
	
function afiseajaJsonTemplate(obJson) { 
			//in acets div voi afisa template-urile   
			let container=document.getElementById("afisTemplate");

			//in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
			let textTemplate ="";
			
			//parcurg vetorul de studenti din obJson
			for(let i=0;i<obJson.studenti.length;i++){
				//creez un template ejs (primul parametru al lui ejs.render)
				//acesta va primi ca parametru un student din vectorul de studenti din json {student: obJson.studenti[i]}
				//practic obJson.studenti[i] e redenumit ca "student" in template si putem sa ii accesam proprietatile: student.id etc
				textTemplate+=ejs.render("<div class='rand'><div class='coloana'><div class='content' id='sortare'>\
				<p>Id: <%= student.id %></p>\
				<p>Autor: <%= student.autor %></p>\
				<p>Voturi: <%= student.voturi %></p>\
				<p>Nota: <%= student.nota %></p>\
				<p>Categorie: <%= student.categorie %></p>\
				<p><img src=<%= student.poza %> width='95%' height='85%'></img></p>\
				</div></div></div>", 
				{student: obJson.studenti[i]});
				
				
			} 
		
			//adaug textul cu afisarea studentilor in container
			container.innerHTML=textTemplate;	
			
	}
	

   
}



  
 



 


