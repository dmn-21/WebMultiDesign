document.addEventListener('DOMContentLoaded', () => {

    const nav = document.querySelector('.top-bar');

    window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(208, 25, 25, 0.9)';
        nav.style.transition = 'background-color 1s ease';
        nav.style.padding = '0';
    } else {
        nav.style.backgroundColor = 'transparent';
        nav.style.padding = '2em 0'
    }});
    
    const yearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
       
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry)
            if(entry.isIntersecting) {
                entry.target.classList.add('show')
            }
            else {
                entry.target.classList.remove('show')
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    let nextDom = document.getElementById('next');
    let prevDom = document.getElementById('prev');
    let carouselDom = document.querySelector('.carousel');
    let listItemDom = document.querySelector('.carousel .list');
    let thumbnailDom = document.querySelector('.carousel .thumbnail');

    nextDom.onclick = function() {
        pauseCurrentVideo();
        showSlider('next');
    }
    prevDom.onclick = function() {
        pauseCurrentVideo();
        showSlider('prev');
    }

    let timeRunning = 500;
    let timeAutoNext = 10000;
    let runTimeOut; 
    let runAutoRun;

    
    function showSlider(type) {
        let itemSlider = document.querySelectorAll('.carousel .list .item');
        let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');

        if (type === 'next') {
            listItemDom.appendChild(itemSlider[0]);
            thumbnailDom.appendChild(itemThumbnail[0]);
            carouselDom.classList.add('next');
        }
        else {
            let positionLastItem = itemSlider.length - 1;
            listItemDom.prepend(itemSlider[positionLastItem]);
            thumbnailDom.prepend(itemThumbnail[positionLastItem]);
            carouselDom.classList.add('prev');
        }

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning);

        clearTimeout(runAutoRun);
        runAutoRun = setTimeout(() => {
            nextDom.click();
        }, timeAutoNext);
    }

    function pauseCurrentVideo() {
        let currentVideo = document.querySelector('.carousel .list .item video');
        if (currentVideo && !currentVideo.paused) {
            currentVideo.pause();
        }
    }
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            nextDom.click();
        } else if (event.key === 'ArrowLeft') { 
            prevDom.click();
        }
    });
});

function sendMail() {

    event.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var subject = document.getElementById("subject").value.trim();
    var message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Моля, попълнете всички задължителни полета (отбелязани със *).");
        return;
    }

    var params = {
        name: name,
        email: email,
        subject: subject,
        message: message,
    };

    const serviceID = "service_7tqesri";
    const templateID = "template_bcajg5j";

    emailjs
        .send(serviceID, templateID, params)
        .then((res) => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("subject").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            alert("Yспешно изпращане.");
        })
        .catch((err) => {
            console.log(err);
            alert("Грешка при изпращане на съобщението.");
        });
}

function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

function checkScreenWidth() {
    if (window.innerWidth < 1025) {
      const currentPath = window.location.pathname;

      if (!currentPath.endsWith('index.html') && currentPath !== '/') {
        window.location.href = 'index.html';
      }
    }
}

window.addEventListener('load', checkScreenWidth);
window.addEventListener('resize', checkScreenWidth);

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.filter a');
    const sections = document.querySelectorAll('.work-section');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const category = link.getAttribute('data-category');
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if (category === 'all') {
                sections.forEach(section => {
                    section.classList.remove('hidden');
                });
            } else {
                sections.forEach(section => {
                    if (section.id === category) {
                        section.classList.remove('hidden');
                    } else {
                        section.classList.add('hidden');
                    }
                });
            }
        });
    });
});
