// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: trophy;
let e = new Request("https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/[REGION]/[PUUID]");
let t = await e.loadJSON();
let a = t.data;
let l = a.currenttier;
let n = a.currenttierpatched;
let i = a.ranking_in_tier;
let r = a.mmr_change_to_last_game;
let f = new Request("https://valorant-api.com/v1/competitivetiers");
let o = await f.loadJSON();
let c = o.data;
let s = null;
let h = c[4];
for (let e of h.tiers) {
	if (e.tier == l) {
		s = e.largeIcon;
		break
	}
}
let d = {
	tier: l,
	patched: n,
	ranking: i,
	change: r,
	icon: s
};
console.log(d);
let g = new Request(d.icon);
let I = await g.load();
let k = new WebView;
let m = 70.5 * 6;
await k.loadHTML(`<!DOCTYPE html><html><body><canvas id="cv" width="${m}" height="${m}"></canvas><img id="limg" src="data:image/png;base64,${I.toBase64String()}"></body>`);
let w = await k.evaluateJavaScript(`let t=${d.ranking};let e=${d.change};let l=6;let a=70.5*l;let i=5*l;let h=4.75*l;let n=4*l;let r=56*l;let P="#0000";let o="#d1d1d140";let s="#ffffff";let d="#2ED158";let c="#BD1E2D";
let g="#222323";let k=a/2-i/2;let I=a/2;let M=-.5*Math.PI;let f=cv.getContext("2d");f.fillStyle=P;f.fillRect(0,0,a,a);f.strokeStyle=o;f.lineWidth=i;f.beginPath();f.arc(I,I,k,0,2*Math.PI);f.stroke();f.lineCap="round";
f.lineWidth=h;f.strokeStyle=g;f.beginPath();f.arc(I,I,k,M,M+Math.PI*t/50);f.stroke();f.lineWidth=n;f.strokeStyle=s;f.beginPath();f.arc(I,I,k,M,M+Math.PI*t/50);f.stroke();f.beginPath();if(e>0){f.lineWidth=h;
f.strokeStyle=g;f.beginPath();f.arc(I,I,k,M+Math.PI*(t-e)/50,M+Math.PI*t/50);f.stroke();f.beginPath();f.lineWidth=n;f.strokeStyle=d;f.arc(I,I,k,M+Math.PI*(t-e)/50,M+Math.PI*t/50);f.stroke()}else{f.lineWidth=h;f.strokeStyle=g;f.beginPath();
f.arc(I,I,k,M+Math.PI*t/50,M+Math.PI*(t-e)/50);f.stroke();f.beginPath();f.lineWidth=n;f.strokeStyle=c;f.arc(I,I,k,M+Math.PI*t/50,M+Math.PI*(t-e)/50)}f.stroke();let y=a/2-r/2
;f.drawImage(document.getElementById("limg"),y,y,r,r);let b=cv.toDataURL("image/png");b.replace(/^data:.*;base64,/,"")`);
let M = Image.fromData(Data.fromBase64String(w));
let P = new DrawContext;
P.respectScreenScale = true;
P.size = new Size(150, 150);
P.setFillColor(new Color("222323", 1));
P.fill(new Rect(0, 0, 150, 150));
let b = 82;
P.drawImageInRect(M, new Rect(150 / 2 - b / 2, 17, b, b));
P.setTextColor(Color.white());
P.setTextAlignedCenter();
P.setFont(Font.systemFont(17));
P.drawTextInRect(d.patched, new Rect(0, 17 + b + 3, 150, 80));
P.setFont(Font.systemFont(11));
P.drawTextInRect(`${d.ranking} RR`, new Rect(0, 17 + b + 22, 150, 80));
let y = new ListWidget;
y.backgroundImage = P.getImage();
await y.presentSmall();
Script.setWidget(y)

App.close()
