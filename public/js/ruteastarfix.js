function cari_ruteman(s,d) { //fungsi A* Manhattan dengan parameter s sebagai titik awal dan d sebagai tujuan
	
	var awals= document.documentElement.innerHTML.length; //menyimpan memori awal
	timestart= performance.now(); //menyimpan waktu awal
	var start =node[s-1]; // deklarasi titik awal
	var dest = node[d-1]; // deklarasi titik akhir
	node[start.id-1].g=0; // deklari nilai g pada titik awal adalah 0
	node[start.id-1].h=h=Math.abs(start.x-dest.x)+Math.abs(start.y-dest.y); //menghitung nilai heuristik titik awal
	node[start.id-1].f=node[start.id-1].g+node[start.id-1].h; //menghitung total gaya titik awal
	openlist = [start]; // openlist adalah titik awal
	closelist=[]; // closelist kosong
	while(openlist.length!=0 && !closelist.includes(dest)) { // perulangan berhenti jika openlist kosong atau titik tujuan ditemukan
		while(openlist.length!=0 && !closelist.includes(dest)) { //memasukkan openlist ke closelist
			closelist[closelist.length]=openlist[0];
			openlist.splice(0,1);
		}
		let unique = [...new Set(closelist)];
		closelist= unique; //membuat closelist menjadi unik (tidak ada rute dobel)

		if(!closelist.includes(dest)) { //jika titik akhir belum ditemukan pencarian a* akan dilakukan
			extendman(dest); // pencarian A* Manhattan dilakukan
		}
		if(!closelist.includes(dest) && openlist.length<1) { //jika openlist kosong dan titik tujuan belum ditemukan
			extendedman(dest); // pencarian dijkstra dilakukan
		}
		let test = [...new Set(openlist)]; // membuat openlist menjadi unik (tidak ada rute dobel)
		 openlist= test;	
	}
	rute = [dest.id-1]; //membuat rute dengan mencatat titik parentnya dengan titik awalnya adalah titik akhir
		while(!rute.includes(start.id-1)) { //pencarian rute berakhir  jika titik awal ditemukan
			rute[rute.length]=node[rute[rute.length-1]].parentid; //dari titik akhir
		}
	rute.reverse(); // membalikkan rute sehingga rutenya berawal dari titik awal
	var jalanrute = [];
	for(i=0;i<rute.length;i++) { // mencatat jalannya dari setiap titik yang ada di rute
		jalanrute[jalanrute.length] = node[rute[i]].jalan;
	}
	let jl = [...new Set(jalanrute)]; //membuat jalan yang ditampilkan menjadi unik sehingga tidak terjadi pengulangan nama jalan yang sama
	jalanrute = jl;
	for(i=0;i<jalanrute.length;i++) {
		if(jalanrute[i]==0)
		jalanrute.splice(i,1); //jika id jalan adalah 0 maka dianggap kosong (tidak ada nama jalannya atau nama jalan tidak diketahui)
	}
	for(i=0;i<jalanrute.length;i++) {
		jalanrute[i]=jalans[jalanrute[i]-1].nama; //mengubah  id jalan menjadi nama jalan pada array jalan
	}
	console.log(jalan);
	document.getElementById("demo1").innerHTML = "rutenya adalah : "+rute;  //menampilkan jalan pada web
	document.getElementById("jalan1").innerHTML = "jalannya adalah : "+jalanrute+" [ "+ (rute.length*10) +"meter ]"; // menampilkan rute pada web
	document.getElementById("demo1").innerHTML = "rutenya adalah : "+rute; // menampilkan closelist pada web
	document.getElementById("closelist1").innerHTML = "Closelist : "+closelist.length; //menampilkan closelist pada web 
	document.getElementById("waktu1").innerHTML = "Waktu Respon : "+(performance.now()-timestart)+" ms"; // menampilkan waktu response pada web
	document.getElementById("Memory_usage1").innerHTML = "Memory Usage :  "+(document.documentElement.innerHTML.length-awals)+" Bytes"; // menampilkan memory usage pada web
}
function extendedman(dd) { //fungsi pencarian A* heuristic manhattan dengan parameter titik tujuan
	for(cl=closelist.length-1;cl>=0;cl--) { // untuk setiap titik yang ada dicloselist akan dicek
		if(node[closelist[cl].id] != null && !closelist.includes(node[closelist[cl].id])) { 
			if(node[closelist[cl].id].block==0 && node[closelist[cl].id].x==closelist[cl].x && node[closelist[cl].id].y==closelist[cl].y+1) { //mengecek titik dibawahnya
				node[closelist[cl].id].parentid=closelist[cl].id-1; //apakah tembok atau bukan, jika ya titik dibawahnya akan dicatat titik parentya
				openlist[openlist.length]=node[closelist[cl].id]; //lalu titik dibawahnya dimasukkan openlist
				node[closelist[cl].id].g=closelist[cl].g+1; // setelah itu nilai dari g titik dibawahnya akan dicatat
				node[closelist[cl].id].h=Math.abs(node[closelist[cl].id].x-dd.x)+Math.abs(node[closelist[cl].id].y-dd.y); //serta nilai h pada titik dibawahnya
				node[closelist[cl].id].f=node[closelist[cl].id].g+node[closelist[cl].id].h; // dan terakhir nilai f dari titik dibawahnya
				}
			}
		if(node[closelist[cl].id-2] != null && !closelist.includes(node[closelist[cl].id-2])) { 
			if(node[closelist[cl].id-2].block==0 && node[closelist[cl].id-2].x==closelist[cl].x && node[closelist[cl].id-2].y==closelist[cl].y-1) { //mengecek titik diatasnya
				node[closelist[cl].id-2].parentid=closelist[cl].id-1; //apakah tembok atau bukan, jika ya titik diatasnya akan dicatat titik parentya
				openlist[openlist.length]=node[closelist[cl].id-2]; //lalu titik diatasnya dimasukkan openlist
				node[closelist[cl].id-2].g=closelist[cl].g+1; // setelah itu nilai dari g titik diatasnya akan dicatat
				node[closelist[cl].id-2].h=Math.abs(node[closelist[cl].id-2].x-dd.x)+Math.abs(node[closelist[cl].id-2].y-dd.y); //serta nilai h pada titik diatasnya
				node[closelist[cl].id-2].f=node[closelist[cl].id-2].g+node[closelist[cl].id-2].h; // dan terakhir nilai f dari titik diatasnya
			}
		}
		if(node[closelist[cl].id+105] != null && !closelist.includes(node[closelist[cl].id+105]))  { 
			if(node[closelist[cl].id+105].block==0 && node[closelist[cl].id+105].x==closelist[cl].x+1 && node[closelist[cl].id+105].y==closelist[cl].y) { //mengecek titik dikanannya
				node[closelist[cl].id+105].parentid=closelist[cl].id-1; //apakah tembok atau bukan, jika ya titik dikanannya akan dicatat titik parentya
				openlist[openlist.length]=node[closelist[cl].id+105]; //lalu titik dikanannya dimasukkan openlist
				node[closelist[cl].id+105].g=closelist[cl].g+1; // setelah itu nilai dari g titik dikanannya akan dicatat
				node[closelist[cl].id+105].h=Math.abs(node[closelist[cl].id+105].x-dd.x)+Math.abs(node[closelist[cl].id+105].y-dd.y); //serta nilai h pada titik dikanannya
				node[closelist[cl].id+105].f=node[closelist[cl].id+105].g+node[closelist[cl].id+105].h; // dan terakhir nilai f dari titik dikanannya
			}
		}
		if(node[closelist[cl].id-107] != null && !closelist.includes(node[closelist[cl].id-107])) {
			if(node[closelist[cl].id-107].block==0 && node[closelist[cl].id-107].x==closelist[cl].x-1 && node[closelist[cl].id-107].y==closelist[cl].y) { //mengecek titik dikirinya
				node[closelist[cl].id-107].parentid=closelist[cl].id-1; //apakah tembok atau bukan, jika ya titik dikirinya akan dicatat titik parentya
				openlist[openlist.length]=node[closelist[cl].id-107]; //lalu titik dikirinya dimasukkan openlist
				node[closelist[cl].id-107].g=closelist[cl].g+1; // setelah itu nilai dari g titik dikirinya akan dicatat
				node[closelist[cl].id-107].h=Math.abs(node[closelist[cl].id-107].x-dd.x)+Math.abs(node[closelist[cl].id-107].y-dd.y); //serta nilai h pada titik dikirinya
				node[closelist[cl].id-107].f=node[closelist[cl].id-107].g+node[closelist[cl].id-107].h; // dan terakhir nilai f dari titik dikirinya
				}
			}
		}
	}


function extendman(dd) { //fungsi pencarian Dijkstra manhattan dengan parameter titik tujuan
			for(cl=closelist.length-1;cl>=0;cl--) { // untuk setiap titik yang ada dicloselist akan dicek
				if(openlist.length<1 && node[closelist[cl].id] != null  && !closelist.includes(node[closelist[cl].id])) {
					if(node[closelist[cl].id].block==0 && node[closelist[cl].id].x==closelist[cl].x && node[closelist[cl].id].y==closelist[cl].y+1) { //mengecek titik dibawahnya
						node[closelist[cl].id].parentid=closelist[cl].id-1; //apakah tembok atau bukan, jika ya titik dibawahnya akan dicatat titik parentya
						node[closelist[cl].id].g=closelist[cl].g+1; // setelah itu nilai dari g titik dibawahnya akan dicatat
						node[closelist[cl].id].h=Math.abs(node[closelist[cl].id].x-dd.x)+Math.abs(node[closelist[cl].id].y-dd.y); //serta nilai h pada titik dibawahnya
						node[closelist[cl].id].f=node[closelist[cl].id].g+node[closelist[cl].id].h; //dan terakhir nilai f dari titik dibawahnya
						if (node[closelist[cl].id].h<closelist[cl].h && node[closelist[cl].id].f<=closelist[cl].f) { //jika nilai f dan h kurang dari titik parent dari titik dibawahnya
							openlist[openlist.length]=node[closelist[cl].id]; //maka titik dibawahnya dimasukkan openlist
						}
					}
				}
				if(openlist.length<1 && node[closelist[cl].id-2] != null && !closelist.includes(node[closelist[cl].id-2])) {
					if(node[closelist[cl].id-2].block==0 && node[closelist[cl].id-2].x==closelist[cl].x && 
						node[closelist[cl].id-2].y==closelist[cl].y-1) { //mengecek titik diatasnya
						node[closelist[cl].id-2].parentid=closelist[cl].id-1; //apakah tembok atau bukan, jika ya titik diatasnya akan dicatat titik parentya
						node[closelist[cl].id-2].g=closelist[cl].g+1; // setelah itu nilai dari g titik diatasnya akan dicatat
						node[closelist[cl].id-2].h=Math.abs(node[closelist[cl].id-2].x-dd.x)+Math.abs(node[closelist[cl].id-2].y-dd.y); //serta nilai h pada titik diatasnya
						node[closelist[cl].id-2].f=node[closelist[cl].id-2].g+node[closelist[cl].id-2].h; //dan terakhir nilai f dari titik diatasnya
						if (node[closelist[cl].id-2].h<closelist[cl].h && node[closelist[cl].id-2].f<=closelist[cl].f) { //jika nilai f dan h kurang dari titik parent dari titik diatasnya
							openlist[openlist.length]=node[closelist[cl].id-2]; //maka titik diatasnya dimasukkan openlist
						}
					}
				}
				if(openlist.length<1 && node[closelist[cl].id+105] != null && !closelist.includes(node[closelist[cl].id+105]) ) {
					if(node[closelist[cl].id+105].block==0 && node[closelist[cl].id+105].x==closelist[cl].x+1 && 
						node[closelist[cl].id+105].y==closelist[cl].y) { //mengecek titik dikanannya
						node[closelist[cl].id+105].parentid=closelist[cl].id-1; //apakah tembok atau bukan, jika ya titik dikanannya akan dicatat titik parentya
						node[closelist[cl].id+105].g=closelist[cl].g+1; // setelah itu nilai dari g titik dikanannya akan dicatat
						node[closelist[cl].id+105].h=Math.abs(node[closelist[cl].id+105].x-dd.x)+Math.abs(node[closelist[cl].id+105].y-dd.y); //serta nilai h pada titik dikanannya
						node[closelist[cl].id+105].f=node[closelist[cl].id+105].g+node[closelist[cl].id+105].h; //dan terakhir nilai f dari titik dikanannya
						if (node[closelist[cl].id+105].h<closelist[cl].h && node[closelist[cl].id+105].f<=closelist[cl].f) { //jika nilai f dan h kurang dari titik parent dari titik dikanannya
							openlist[openlist.length]=node[closelist[cl].id+105]; //maka titik dikanannya dimasukkan openlist
						}
					}
				}
				if(openlist.length<1 && node[closelist[cl].id-107] != null && !closelist.includes(node[closelist[cl].id-107])) {
					if(node[closelist[cl].id-107].block==0 && node[closelist[cl].id-107].x==closelist[cl].x-1 && 
						node[closelist[cl].id-107].y==closelist[cl].y) { //mengecek titik dikirinya
						node[closelist[cl].id-107].parentid=closelist[cl].id-1; //apakah tembok atau bukan, jika ya titik dikirinya akan dicatat titik parentya
						node[closelist[cl].id-107].g=closelist[cl].g+1; // setelah itu nilai dari g titik dikirinya akan dicatat
						node[closelist[cl].id-107].h=Math.abs(node[closelist[cl].id-107].x-dd.x)+Math.abs(node[closelist[cl].id-107].y-dd.y); //serta nilai h pada titik dikirinya
						node[closelist[cl].id-107].f=node[closelist[cl].id-107].g+node[closelist[cl].id-107].h; //dan terakhir nilai f dari titik dikirinya
						if (node[closelist[cl].id-107].h<closelist[cl].h && node[closelist[cl].id-107].f<=closelist[cl].f) { //jika nilai f dan h kurang dari titik parent dari titik dikanannya
							openlist[openlist.length]=node[closelist[cl].id-107]; //maka titik dikirinya dimasukkan openlist
						}
					}
				}
			}
		 }