/*Welcome to the script file! Your 1st time here, you should update
  the BASIC INFO section to include your name and website/social 
  media link (if desired). Most of the time, you will just come
  here to update the POSTS ARRAY. However, you can also edit or
  add your own scripts to do whatever you like!*/
  
//TABLE OF CONTENTS
  // 1. Basic Info
  // 2. Posts Array
  // 3. Creating HTML Sections to Be Inserted (Header, Footer, etc)
  // 4. Inserting the Sections Into our Actual HTML Pages

//-----------------------------

//==[ 1. BASIC INFO ]==

let blogName = "Refúgio de Mnemosine";
let authorName = "Pedro Ivo Rocha";
let authorLink = "https://vegedra.github.io/";

//-----------------------------

//==[ 2. ARRAY DE POSTS ]==
/*Each time you make a new post, add the filepath here at the top of postsArray.
  This will cause all the right links to appear and work.
  NOTE: It's important to follow this exact naming convention, because the scripts
  below are expecting it ( 'posts/YYYY-MM-DD-Title-of-Your-Post.html', ). You can
  alter the scripts if you want to use a different naming convention*/
/*UPDATE: as of version 1.3, you may omit the date if you would like. But if you
  use a date it must still follow that format.*/

let postsArray = [
//[ "posts/2020-11-10-Special-Characters-Example.html", encodeURI( 'Spéci@l "Character\'s" Examp|e' ) ],
[ "posts/10-11-2024-Trabalhando.html" ],
[ "posts/08-11-2024-Oi.html" ] ];

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

/*CAUTION!! BEGINNING OF MORE ADVANCED SECTION!
  For default functionality, you DO NOT have to touch anything beyond this point.
  Things get more complicated here, so if you are unfamiliar with Javascript,
  your site may break. That's okay though, you can always paste back in the code
  from the Zonelets starter files :) */

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//==[ 3. GENERATING THE HTML SECTIONS TO BE INSERTED ]==

let url = window.location.pathname;

//O formato de data para procurar é 2 dígitos, hífen, 2 dígitos, hífen, 4 dígitos, hífen.
const postDateFormat = /\d{2}\-\d{2}\-\d{4}\-/;

let relativePath = ".";
if ( url.includes("posts/") ) {
  relativePath = "..";
}

let headerHTML = '<ul> <li><a href="' + relativePath + '/index.html">Início</a></li>' + 
'<li><a href="' + relativePath + '/archive.html">Arquivo</a></li>' +
'<li><a href="' + relativePath + '/about.html">Sobre</a></li>' +
'<li><a href="https://ivotheca.neocities.org/">IvoTheca</a></li> </ul>';

let footerHTML = "<hr><p>" + blogName + " é escrito por <a href='" + authorLink + "'>" + authorName + "</a>.</p>";

let currentIndex = -1;
let currentFilename = url.substring(url.lastIndexOf('posts/'));
if ( ! currentFilename.endsWith(".html") ) {
    currentFilename += ".html";
}
let i;
for (i = 0; i < postsArray.length; i++) {
  if ( postsArray[i][0] === currentFilename ) {
    currentIndex = i;
  }
}

function formatPostTitle(i) {
  if ( postsArray[i].length > 1 ) {
    return decodeURI(postsArray[i][1]);
  } else { 
    if (  postDateFormat.test ( postsArray[i][0].slice( 6,17 ) ) ) {
      return postsArray[i][0].slice(17,-5).replace(/-/g," ");
    } else {
      return postsArray[i][0].slice(6,-5).replace(/-/g," ");
    }
  }
}

let currentPostTitle = "";
let niceDate = "";
if ( currentIndex > -1 ) {
  currentPostTitle = formatPostTitle( currentIndex );
  if (  postDateFormat.test ( postsArray[currentIndex][0].slice( 6,17 ) ) ) {
    let monthSlice = postsArray[currentIndex][0].slice( 9,11 );
    let month = "";
    if ( monthSlice === "01") { month = "Jan";}
    else if ( monthSlice === "02") { month = "Fev";}
    else if ( monthSlice === "03") { month = "Mar";}
    else if ( monthSlice === "04") { month = "Abr";}
    else if ( monthSlice === "05") { month = "Mai";}
    else if ( monthSlice === "06") { month = "Jun";}
    else if ( monthSlice === "07") { month = "Jul";}
    else if ( monthSlice === "08") { month = "Ago";}
    else if ( monthSlice === "09") { month = "Set";}
    else if ( monthSlice === "10") { month = "Out";}
    else if ( monthSlice === "11") { month = "Nov";}
    else if ( monthSlice === "12") { month = "Dez";}
    niceDate = postsArray[currentIndex][0].slice( 6,8 ) + " " + month + ", " + postsArray[currentIndex][0].slice( 12,16 );
  }
}

function formatPostLink(i) {
  let postTitle_i = "";
  if ( postsArray[i].length > 1 ) {
    postTitle_i = decodeURI(postsArray[i][1]);
  } else {
    if (  postDateFormat.test ( postsArray[i][0].slice( 6,17 ) ) ) {
      postTitle_i = postsArray[i][0].slice(17,-5).replace(/-/g," ");
    } else {
      postTitle_i = postsArray[i][0].slice(6,-5).replace(/-/g," ");
    }
  }
  if (  postDateFormat.test ( postsArray[i][0].slice( 6,17 ) ) ) {
    return '<li><a href="' + relativePath + '/'+ postsArray[i][0] +'">' + postsArray[i][0].slice(6,16) + " \u00BB " + postTitle_i + '</a></li>';
  } else {
    return '<li><a href="' + relativePath + '/'+ postsArray[i][0] +'">' + postTitle_i + '</a></li>';
  }
}

let postListHTML = "<ul>";
for ( let i = 0; i < postsArray.length; i++ ) {
  postListHTML += formatPostLink(i);
}
postListHTML += "</ul>";

let recentPostsCutoff = 3;
let recentPostListHTML = "<h2>Posts Recentes:</h2><ul>";
let numberOfRecentPosts = Math.min( recentPostsCutoff, postsArray.length );
for ( let i = 0; i < numberOfRecentPosts; i++ ) {
  recentPostListHTML += formatPostLink(i);
}
if ( postsArray.length > recentPostsCutoff ) {
  recentPostListHTML += '<li class="moreposts"><a href=' + relativePath + '/archive.html>\u00BB mais posts</a></li></ul>';
} else {
  recentPostListHTML += "</ul>";
}

let nextprevHTML = "";
let nextlink = "";
let prevlink = "";

/*If you're on the newest blog post, there's no point to
 a "Next Post" link, right? And vice versa with the oldest 
 post! That's what the following code handles.*/
if ( postsArray.length < 2 ) {
  nextprevHTML = '<a href="' + relativePath + '/index.html">Voltar</a>';
} else if ( currentIndex === 0 ) {
  prevlink = postsArray[currentIndex + 1][0];
  nextprevHTML = '<a href="' + relativePath + '/index.html">Voltar</a> | <a href="'+ relativePath + '/' + prevlink +'">Postagem anterior \u00BB</a>';
} else if ( currentIndex === postsArray.length - 1 ) {
  nextlink = postsArray[currentIndex - 1][0];
  nextprevHTML = '<a href="' + relativePath + '/' + nextlink +'">\u00AB Próxima postagem</a> | <a href="' + relativePath + '/index.html">Voltar</a>';
} else if ( 0 < currentIndex && currentIndex < postsArray.length - 1 ) {
  nextlink = postsArray[currentIndex - 1][0];
  prevlink = postsArray[currentIndex + 1][0];
  nextprevHTML = '<a href="' + relativePath + '/'+ nextlink +'">\u00AB Próxima postagem</a> | <a href="' + relativePath + '/index.html">Voltar</a> | <a href="' + relativePath + '/'+ prevlink +'">Postagem anterior \u00BB</a>';
}

if (document.getElementById("nextprev")) {
  document.getElementById("nextprev").innerHTML = nextprevHTML;
}
if (document.getElementById("postlistdiv")) {
  document.getElementById("postlistdiv").innerHTML = postListHTML;
}
if (document.getElementById("recentpostlistdiv")) {
  document.getElementById("recentpostlistdiv").innerHTML = recentPostListHTML;
}
if (document.getElementById("header")) {
  document.getElementById("header").innerHTML = headerHTML;
}
if (document.getElementById("blogTitleH1")) {
  document.getElementById("blogTitleH1").innerHTML = blogTitle;
}
if (document.getElementById("postTitleH1")) {
  document.getElementById("postTitleH1").innerHTML = currentPostTitle;
}
if (document.getElementById("postDate")) {
  document.getElementById("postDate").innerHTML = niceDate;
}
if (document.getElementById("footer")) {
  document.getElementById("footer").innerHTML = footerHTML;
}

if (document.title === "Blog Post") {
  document.title = currentPostTitle;
}
