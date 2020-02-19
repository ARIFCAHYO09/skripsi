function cari_rute(s,d) { //fungsi dijkstra dengan parameter s sebagai titik awal dan d sebagai tujuan
	
	var awals= document.documentElement.innerHTML.length; //menyimpan memori awal
	timestart= performance.now(); //memulai waktu response time
	var start =node[s-1]; //deklarasi titik awal
	var dest = node[d-1]; // deklarasi titik akhir
	openlist = [start]; //openlist adalah titik awal
	closelist = []; //closelist kosong
	while(openlist.length!=0 && !closelist.includes(dest)) {  //perulangan berhenti jika openlist kosong atau titik tujuan ditemukan
		while(openlist.length!=0 && !closelist.includes(dest)) { //memasukkan semua
			closelist[closelist.length]=openlist[0]; //openlist ke closelist
			openlist.splice(0,1);
		}
		let unique = [...new Set(closelist)]; //membuat closelist unik (tidak ada rute dobel)
		closelist= unique;
				for(cl=closelist.length-1;cl>=0;cl--) { //untuk setiap titik yang ada di closelist akan dicek
					if(node[closelist[cl].id] != null && !closelist.includes(node[closelist[cl].id])) {
						if(node[closelist[cl].id].block==0 && node[closelist[cl].id].x==closelist[cl].x //mengecek titik dibawahnya
							&& node[closelist[cl].id].y==closelist[cl].y+1) { //apakah tembok atau bukan
							node[closelist[cl].id].parentid=closelist[cl].id-1; //jika ya titik dibawahnya akan dicatat titik parentya
							openlist[openlist.length]=node[closelist[cl].id]; //jika ya titik dibawahnya akan dimasukkan openlist
						}
					}
					if(node[closelist[cl].id-2] != null && !closelist.includes(node[closelist[cl].id-2])) {
						if(node[closelist[cl].id-2].block==0 && node[closelist[cl].id-2].x==closelist[cl].x //mengecek titik diatasnya
							&& node[closelist[cl].id-2].y==closelist[cl].y-1) { //apakah tembok atau bukan
							node[closelist[cl].id-2].parentid=closelist[cl].id-1; //jika ya titik diatasnya akan dicatat titik parentya
							openlist[openlist.length]=node[closelist[cl].id-2]; //jika ya titik diatasnya akan dimasukkan openlist
						}
					}
					if(node[closelist[cl].id+105] != null && !closelist.includes(node[closelist[cl].id+105])) {
						if(node[closelist[cl].id+105].block==0 && node[closelist[cl].id+105].x==closelist[cl].x+1  //mengecek titik dikananya
							&& node[closelist[cl].id+105].y==closelist[cl].y) { //apakah tembok atau bukan
							node[closelist[cl].id+105].parentid=closelist[cl].id-1; //jika ya titik dikananya akan dicatat titik parentya
							openlist[openlist.length]=node[closelist[cl].id+105]; //jika ya titik dikananya akan dimasukkan openlist
						}
					}
					if(node[closelist[cl].id-107] != null && !closelist.includes(node[closelist[cl].id-107])) { 
						if(node[closelist[cl].id-107].block==0 && node[closelist[cl].id-107].x==closelist[cl].x-1 //mengecek titik dikirinya
							&& node[closelist[cl].id-107].y==closelist[cl].y) { //apakah tembok atau bukan
							node[closelist[cl].id-107].parentid=closelist[cl].id-1; //jika ya titik dikirinya akan dicatat titik parentya
							openlist[openlist.length]=node[closelist[cl].id-107]; //jika ya titik dikirinya akan dimasukkan openlist
						}
					}
				}
		let test = [...new Set(openlist)]; //membuat openlist unik (tidak ada rute dobel)
		 openlist= test;
	}

	rute = [dest.id-1]; //membuat rute dengan mencatat titik parentnya dengan titik awalnya adalah titik akhir
		while(!rute.includes(start.id-1)) { //pencarian rute berakhir  jika titik awal ditemukan
			rute[rute.length]=node[rute[rute.length-1]].parentid; //dari titik akhir
		}
	rute.reverse(); // membalikkan rute sehingga rutenya berawal dari titik awal
	var jalanrute = []; //
	for(i=0;i<rute.length;i++) {
		jalanrute[jalanrute.length] = node[rute[i]].jalan; // mencatat jalannya dari setiap titik yang ada di rute
	}
	let jl = [...new Set(jalanrute)]; //membuat jalan yang ditampilkan menjadi unik sehingga tidak terjadi pengulangan nama jalan yang sama
	jalanrute = jl;
	for(i=0;i<jalanrute.length;i++) {
		if(jalanrute[i]==0) //jika id jalan adalah 0 maka dianggap kosong (tidak ada nama jalannya atau nama jalan tidak diketahui)
		jalanrute.splice(i,1);
	}
	for(i=0;i<jalanrute.length;i++) {
		jalanrute[i]=jalans[jalanrute[i]-1].nama; //mengubah  id jalan menjadi nama jalan pada array jalan
	}
	console.log(jalan);
	document.getElementById("jalan").innerHTML = "jalannya adalah : "+jalanrute+" [ "+ (rute.length*10) +"meter ]"; //menampilkan jalan pada web
	console.log(closelist);
	document.getElementById("demo").innerHTML = "rutenya adalah : "+rute; // menampilkan rute pada web
	document.getElementById("closelist").innerHTML = "Closelist : "+closelist.length; // menampilkan closelist pada web
	console.log("panjang rute : "+rute.length); // menampilkan panjang rute pada web
	document.getElementById("waktu").innerHTML = "Waktu Respon : "+(performance.now()-timestart)+" ms"; //menampilkan response time pada web
	document.getElementById("Memory_usage").innerHTML = "Memory Usage :  "+(document.documentElement.innerHTML.length-awals)+" Bytes"; // menampilkan memory usage pada web
}

