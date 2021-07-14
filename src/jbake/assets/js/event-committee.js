
var lang = getQuerystring("lang");
var fetchUrl = '../json/event-committee.json';

if(lang==='es'){
  fetchUrl = '../json/event-committee_es.json';
}


fetch(fetchUrl)
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    })
    .then(function (membersJson) {
        var members = document.getElementById('listMembers');
        // traitement de l'objet
        for (i in membersJson) {
            members.innerHTML += createMemberCard(membersJson[i]);
        }
});


function createMemberCard(memberJson) {

    var memberHtml = "<div class=\"col-lg-4 col-md-6\">" +
        "<div class=\"organizer\">" +
        "<div class=\"organizer-img image-top\">"+
        "<img src=\"" +memberJson.photoUrl +"\" alt=\"" +memberJson.name +"\" class=\"img-fluid\"/>" +
        "</div>"+
        "<h3><a href=\"speaker-details.html?id=" + memberJson.id + "\">" +memberJson.name +"</a></h3>"+
        "<p>" +memberJson.badges[0].description +" @ " +memberJson.company+"</p>" +
        "<p>"+memberJson.shortBio+"</p>" +
        "<div class=\"social\">" ;

        for(i in memberJson.socials){
             memberHtml += " <a href=\""+memberJson.socials[i].link+"\" target=\"_blank\"><i class=\"fa fa-"+memberJson.socials[i].icon+"\"></i></a> ";
        }

    memberHtml += "</div>" +

        "</div>" +
        "</div>";

        return memberHtml;
}

function getQuerystring(key) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == key) {
            return pair[1];
        }
    }
}
