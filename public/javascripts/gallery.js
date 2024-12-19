document.addEventListener('DOMContentLoaded', () => {
	const templates = {};
	let photos;

	document.querySelectorAll("script[type='text/x-handlebars']").forEach(tmp => {
		templates[tmp["id"]] = Handlebars.compile(tmp["innerHTML"]);
	});

	document.querySelectorAll("script[data-type='partial']").forEach(tmp => {
		Handlebars.registerPartial(tmp["id"], tmp["innerHTML"]);
	});

	const slideshow = {
		prevSlide(e) {
			e.preventDefault();
			let prev = this.currentSlide.previousElementSibling;
			if (!prev) {
				prev = this.lastSlide;
			}
			this.fadeOut(this.currentSlide);
			this.fadeIn(prev);
			this.currentSlide = prev;
		},
		nextSlide(e) {
			e.preventDefault();
			let next = this.currentSlide.nextElementSibling;
			if (!next) {
				next = this.firstSlide;
			}
			this.fadeOut(this.currentSlide);
			this.fadeIn(next);
			this.currentSlide = next;
		},
		fadeOut(slide) {
			slide.classList.add("hide");
			slide.classList.remove("show");
		},
		fadeIn(slide) {
			slide.classList.remove("hide");
			slide.classList.add("show");
		},
		bind() {
			let prevButton = this.slideshow.querySelector("a.prev");
			let nextButton = this.slideshow.querySelector("a.next");
			prevButton.addEventListener("click", e => {
				this.prevSlide(e);
			});
			nextButton.addEventListener("click", e => {
				this.nextSlide(e);
			});
		},
		init() {
			this.slideshow = document.querySelector("#slideshow");
			let slides = this.slideshow.querySelectorAll("figure");
			this.firstSlide = slides[0];
			this.firstSlide.className = "show";
			this.lastSlide = slides[slides.length - 1];
			this.currentSlide = this.firstSlide;
			this.bind();
		}
	};


	function renderPhotos() {
		let slides = document.querySelector('#slides');
		slides.innerHTML = templates.photos({ photos: photos });
	}

	(function getPhotos() {
		photos = [
			{
			  "src": "/images/IMG_0126.jpeg",
			  "id": 1
			},
			{
			  "src": "/images/IMG_2398.jpeg",
			  "id": 2
			},
			{
			  "src": "/images/IMG_2624.jpeg",
			  "id": 3
			},
			{
				"src": "/images/IMG_3361.jpeg",
				"id": 3
			},
			{
				"src": "/images/IMG_6281.jpeg",
				"id": 3
			},
		  ]
		renderPhotos()
		slideshow.init()
	})()

});