window.fetch("../plugin/settings.json").then(e=>e.json()).then(e=>{window.lemonpiConfig={defaultContentURL:"http://127.0.0.1:"+e.port+"/trpc/getPreviewContent"};var t,n=document.createElement("script"),n=(n.type="text/javascript",n.src="https://creative-libraries.lemonpi.io/v1/lemonpi.js",document.body.append(n),document.createElement("script"));function o(e){var t=document.createElement("link");t.rel="stylesheet",t.href=e,document.head.appendChild(t)}n.type="text/javascript",n.src="creativeScript.js",document.body.append(n),n=e,(t=document.createElement("meta")).name="ad.size",t.content="width="+n.size.width+",height="+n.size.height,document.head.appendChild(t),n=e,Array.isArray(n.fonts.Google)&&0<n.fonts.Google.length&&((t=document.createElement("link")).rel="preconnect",t.href="https://fonts.googleapis.com",document.head.appendChild(t),(t=document.createElement("link")).rel="preconnect",t.href="https://fonts.gstatic.com",t.setAttribute("crossorigin",""),document.head.appendChild(t),n.fonts.Google.forEach(e=>{o(e.url)})),(n.fonts.Choreograph??[]).forEach(e=>{o(e.url)})});
/**
  * Template Name
  * @Owner Name Developer
  * @Date
*/
// Callback to retrieve the adset data
lemonpi.subscribe(function callback(content) {
  //code here
  var el = document.createElement("div");
  el.appendChild(document.createTextNode(content));
  document.getElementById(name + 'id').appendChild(el);

});
