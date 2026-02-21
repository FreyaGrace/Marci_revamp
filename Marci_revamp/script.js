document.addEventListener("DOMContentLoaded", () => {

  /* ===== HERO BACKGROUND ===== */
  const images = [
    "https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/mtn%20falls%20pond.jpg/:/rs=w:1023,m",
    "https://img1.wsimg.com/isteam/stock/3395/:/cr=t:11.02%25,l:0%25,w:100%25,h:77.95%25/rs=w:600,h:300,cg:true",
    "https://img1.wsimg.com/isteam/stock/143/:/rs=w:1023,m"
  ];

  let bgindex = 0;
  const bg = document.querySelector(".right");

  if (bg) {
    bg.style.backgroundImage = `url(${images[bgindex]})`;

    setInterval(() => {
      bgindex = (bgindex + 1) % images.length;
      bg.style.backgroundImage = `url(${images[bgindex]})`;
    }, 4000);
  }

  /* ===== SLIDER ===== */
  const slides = document.querySelector(".slides");
  const slide = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");
  const wrapper = document.querySelector(".slider-wrapper");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let slideIndex = 0;
  let interval;

  if (slides && slide.length && dotsContainer) {
    slide.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        slideIndex = i;
        updateSlide();
        resetAutoSlide();
      });

      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function updateSlide() {
      slides.style.transform = `translateX(-${slideIndex * 100}%)`;
      dots.forEach(dot => dot.classList.remove("active"));
      dots[slideIndex].classList.add("active");
    }

    function nextSlide() {
      slideIndex = (slideIndex + 1) % slide.length;
      updateSlide();
    }

    function prevSlide() {
      slideIndex = (slideIndex - 1 + slide.length) % slide.length;
      updateSlide();
    }

    function startAutoSlide() {
      interval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
      clearInterval(interval);
    }

    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    nextBtn?.addEventListener("click", () => {
      nextSlide();
      resetAutoSlide();
    });

    prevBtn?.addEventListener("click", () => {
      prevSlide();
      resetAutoSlide();
    });

    wrapper?.addEventListener("mouseenter", stopAutoSlide);
    wrapper?.addEventListener("mouseleave", startAutoSlide);

    startAutoSlide();
  }

  /* ===== FEATURE IMAGE SWITCH ===== */
  const mainImage = document.getElementById("mainImage");
  const details = document.getElementById("details");
  const price = document.getElementById("price");
  const thumbnails = document.querySelectorAll(".thumb");

  if (mainImage && thumbnails.length) {
    mainImage.src = thumbnails[0].src;
    details.textContent = thumbnails[0].dataset.details;
    price.textContent = thumbnails[0].dataset.price;

    thumbnails.forEach(thumb => {
      thumb.addEventListener("click", function () {
        mainImage.src = this.src;
        details.textContent = this.dataset.details;
        price.textContent = this.dataset.price;

        thumbnails.forEach(t => t.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }

  /* ===== NAV TOGGLE ===== */
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

});