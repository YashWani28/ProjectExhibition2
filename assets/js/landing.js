var body = document.getElementById("LandingBody");
window.addEventListener("load",function(){
    SetZoomLanding();
})
function SetZoomLanding()
{
    var Page = body;
    var zoom = "70%";
    Page.style.zoom = zoom;
    return false;
}