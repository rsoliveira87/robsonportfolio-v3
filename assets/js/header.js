var navbar = document.getElementById('top-bar');
var navTop = navbar.offsetTop;

function stickyNavigation(){
	if ( window.scrollY > navTop ) {
		navbar.classList.add('header-fixed');
	} else {
		navbar.classList.remove('header-fixed');
	}
}

window.addEventListener('scroll', stickyNavigation);


function animateScrollNavbar( e ) {
	e.preventDefault();
	var id = this.getAttribute('href').replace('#', ''),
		target = document.getElementById(id).getBoundingClientRect().top;
	
	animateScroll(target);
}

function animateScroll(targetHeight) {
	targetHeight = document.body.scrollHeight - window.innerHeight > targetHeight + scrollY ? 
        targetHeight : document.body.scrollHeight - window.innerHeight;

    var initialPosition = window.scrollY,
    	SCROLL_DURATION = 90,
    	step_x = Math.PI / SCROLL_DURATION,
    	step_count = 0;
    
    requestAnimationFrame(step);
    
    function step() {
        if (step_count < SCROLL_DURATION) {
            requestAnimationFrame(step);
            step_count++;
            window.scrollTo(0, initialPosition + targetHeight * 0.25 * Math.pow((1 - Math.cos(step_x * ++step_count)), 2));
        }
    }
}

var links = document.querySelectorAll('.scroll'),
	i = 0,
	linksLength = links.length;

for ( ; i < linksLength; i++ ) {
	links[i].onclick = animateScrollNavbar
}