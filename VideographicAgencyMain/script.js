/* =========================================================
   VIDEOGRAPHIC AGENCY
   PREMIUM MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE LOADER
    ====================================================== */

    const loader =
        document.querySelector(".page-loader");

    document.body.classList.add("loading");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {

                loader.classList.add("hide");

                setTimeout(() => {
                    loader.remove();
                }, 900);

            }

            document.body.classList.remove("loading");

        }, 700);

    });


    /* =====================================================
       NAVBAR
    ====================================================== */

    const navbar =
        document.querySelector(".navbar");

    const updateNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const menuButton =
        document.querySelector(".menu-button");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-menu a"
        );

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("open");

        });

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

            });

        });

    }


    /* =====================================================
       CUSTOM CURSOR
    ====================================================== */

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorRing =
        document.querySelector(".cursor-ring");

    if (
        cursorDot &&
        cursorRing &&
        window.innerWidth > 800
    ) {

        let mouseX =
            window.innerWidth / 2;

        let mouseY =
            window.innerHeight / 2;

        let ringX = mouseX;
        let ringY = mouseY;

        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            }
        );

        const animateCursor = () => {

            ringX +=
                (mouseX - ringX) * 0.12;

            ringY +=
                (mouseY - ringY) * 0.12;

            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;

            requestAnimationFrame(
                animateCursor
            );

        };

        animateCursor();

        const interactiveElements =
            document.querySelectorAll(
                "a, button, input, textarea, .service-card, .team-card"
            );

        interactiveElements.forEach(
            element => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        cursorRing.classList.add(
                            "active"
                        );

                    }
                );

                element.addEventListener(
                    "mouseleave",
                    () => {

                        cursorRing.classList.remove(
                            "active"
                        );

                    }
                );

            }
        );

    } else {

        if (cursorDot)
            cursorDot.style.display = "none";

        if (cursorRing)
            cursorRing.style.display = "none";

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }

            );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("active");

        });

    }


    /* =====================================================
       HERO STAGGER
    ====================================================== */

    const heroElements =
        document.querySelectorAll(
            ".hero-reveal"
        );

    heroElements.forEach(
        (element, index) => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(35px)";

            setTimeout(() => {

                element.style.transition =
                    "opacity 1s cubic-bezier(.22,1,.36,1), transform 1s cubic-bezier(.22,1,.36,1)";

                element.style.opacity = "1";

                element.style.transform =
                    "translateY(0)";

            }, 1000 + index * 180);

        }
    );


    /* =====================================================
       COUNTERS
    ====================================================== */

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );

    const animateCounter =
        element => {

            const target =
                Number(
                    element.dataset.count
                );

            const duration = 1700;

            let startTime = null;

            const update =
                timestamp => {

                    if (!startTime) {

                        startTime =
                            timestamp;

                    }

                    const progress =
                        Math.min(
                            (timestamp -
                                startTime) /
                            duration,
                            1
                        );

                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );

                    const current =
                        Math.floor(
                            eased * target
                        );

                    element.textContent =
                        current;

                    if (progress < 1) {

                        requestAnimationFrame(
                            update
                        );

                    } else {

                        element.textContent =
                            target;

                    }

                };

            requestAnimationFrame(update);

        };


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.6
                }

            );

        counters.forEach(counter => {

            counterObserver.observe(
                counter
            );

        });

    }


    /* =====================================================
       IMAGE PARALLAX
    ====================================================== */

    const parallaxImages =
        document.querySelectorAll(
            ".about-image img, .statement-background"
        );

    const handleParallax = () => {

        const viewportHeight =
            window.innerHeight;

        parallaxImages.forEach(image => {

            const rect =
                image.getBoundingClientRect();

            if (
                rect.bottom >= 0 &&
                rect.top <= viewportHeight
            ) {

                const center =
                    rect.top +
                    rect.height / 2;

                const distance =
                    center -
                    viewportHeight / 2;

                const movement =
                    distance * -0.035;

                if (
                    image.classList.contains(
                        "statement-background"
                    )
                ) {

                    image.style.transform =
                        `translateY(${movement}px) scale(1.04)`;

                } else {

                    image.style.transform =
                        `translateY(${movement}px) scale(1.025)`;

                }

            }

        });

    };

    window.addEventListener(
        "scroll",
        handleParallax,
        { passive: true }
    );


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                function(event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#" ||
                        this.getAttribute(
                            "onclick"
                        )
                    ) {

                        return;

                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {

                        return;

                    }

                    event.preventDefault();

                    const nav =
                        document.querySelector(
                            ".navbar"
                        );

                    const navHeight =
                        nav ?
                        nav.offsetHeight :
                        0;

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navHeight;

                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        });


    /* =====================================================
       CONTACT FORM
    ====================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    const formNote =
        document.getElementById(
            "formNote"
        );

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const name =
                    document.getElementById(
                        "name"
                    )?.value.trim();

                const email =
                    document.getElementById(
                        "email"
                    )?.value.trim();

                const message =
                    document.getElementById(
                        "message"
                    )?.value.trim();

                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    if (formNote) {

                        formNote.textContent =
                            "Please complete all fields.";

                    }

                    return;

                }

                if (formNote) {

                    formNote.textContent =
                        "Thank you. Your project details are ready to discuss.";

                }

                contactForm.reset();

            }
        );

    }


    /* =====================================================
       SERVICE CARD 3D EFFECT
    ====================================================== */

    const cards =
        document.querySelectorAll(
            ".service-card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateX =
                    ((y / rect.height) -
                        0.5) * -3;

                const rotateY =
                    ((x / rect.width) -
                        0.5) * 3;

                card.style.transform =
                    `translateY(-10px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       TEAM CARD 3D EFFECT
    ====================================================== */

    const teamCards =
        document.querySelectorAll(
            ".team-card"
        );

    teamCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateY =
                    ((x / rect.width) -
                        0.5) * 2;

                const rotateX =
                    ((y / rect.height) -
                        0.5) * -2;

                card.style.transform =
                    `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       ACTIVE NAV LINK
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );

    const updateActiveNav = () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop -
                180;

            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.id;

            }

        });

        navLinks.forEach(link => {

            link.style.color = "";

            if (
                current &&
                link.getAttribute(
                    "href"
                ) ===
                `#${current}`
            ) {

                link.style.color =
                    "var(--gold-light)";

            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =====================================================
       INSTAGRAM — AGENCY DIRECT LINK
    ====================================================== */

    const instagramURL =
        "https://www.instagram.com/videographicagency/";

    document
        .querySelectorAll("a")
        .forEach(link => {

            const text =
                link.textContent
                    .trim()
                    .toLowerCase();

            const href =
                (
                    link.getAttribute(
                        "href"
                    ) || ""
                ).toLowerCase();

            if (
                text.includes("instagram") ||
                href.includes("instagram")
            ) {

                link.setAttribute(
                    "href",
                    instagramURL
                );

                link.setAttribute(
                    "target",
                    "_blank"
                );

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        });


    /* =====================================================
       WHATSAPP PROFESSIONAL POPUP
    ====================================================== */

    const whatsappNumbers = [

        {
            label: "Founder",
            number: "923363727647"
        },

        {
            label: "Co-Founder",
            number: "923132750609"
        }

    ];


    /* -----------------------------------------------------
       CREATE MODAL AUTOMATICALLY
    ----------------------------------------------------- */

    const whatsappOverlay =
        document.createElement("div");

    whatsappOverlay.className =
        "vga-whatsapp-overlay";

    whatsappOverlay.innerHTML = `

        <div class="vga-whatsapp-modal">

            <button
                class="vga-wa-close"
                aria-label="Close"
                type="button"
            >
                ×
            </button>

            <span class="vga-wa-kicker">
                Videographic Agency
            </span>

            <h3 class="vga-wa-title">
                Start a conversation
            </h3>

            <p class="vga-wa-text">
                Choose a WhatsApp line below and
                connect directly with our team.
            </p>

            <div class="vga-wa-options"></div>

        </div>

    `;

    document.body.appendChild(
        whatsappOverlay
    );


    /* -----------------------------------------------------
       WHATSAPP OPTIONS
    ----------------------------------------------------- */

    const waOptions =
        whatsappOverlay.querySelector(
            ".vga-wa-options"
        );


    whatsappNumbers.forEach(person => {

        const option =
            document.createElement("a");

        option.className =
            "vga-wa-option";

        /*
         * WhatsApp Universal Link
         *
         * The number MUST NOT contain +,
         * spaces or dashes.
         *
         * Desktop:
         * WhatsApp Web / Desktop
         *
         * Mobile:
         * WhatsApp App
         */
        option.href =
            `https://wa.me/${person.number}`;

        option.target =
            "_blank";

        option.rel =
            "noopener noreferrer";

        option.innerHTML = `

            <span class="vga-wa-icon">
                WA
            </span>

            <span class="vga-wa-info">

                <small>
                    ${person.label}
                </small>

                <strong>
                    +${person.number}
                </strong>

            </span>

        `;

        /*
         * IMPORTANT:
         *
         * We do NOT add a click.preventDefault()
         * here.
         *
         * Therefore the browser is allowed to
         * follow the WhatsApp link normally.
         */
        waOptions.appendChild(
            option
        );

    });


    /* -----------------------------------------------------
       CLOSE WHATSAPP POPUP
    ----------------------------------------------------- */

    const closeWhatsApp =
        () => {

            whatsappOverlay.classList.remove(
                "active"
            );

            document.body.style.overflow = "";

        };


    /* -----------------------------------------------------
       OPEN WHATSAPP POPUP
    ----------------------------------------------------- */

    const openWhatsApp =
        () => {

            whatsappOverlay.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";

        };


    /* -----------------------------------------------------
       CLOSE BUTTON
    ----------------------------------------------------- */

    const whatsappCloseButton =
        whatsappOverlay.querySelector(
            ".vga-wa-close"
        );

    if (whatsappCloseButton) {

        whatsappCloseButton.addEventListener(
            "click",
            closeWhatsApp
        );

    }


    /* -----------------------------------------------------
       CLICK OUTSIDE MODAL TO CLOSE
    ----------------------------------------------------- */

    whatsappOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                whatsappOverlay
            ) {

                closeWhatsApp();

            }

        }
    );


    /* -----------------------------------------------------
       ESCAPE KEY
    ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeWhatsApp();

            }

        }
    );


    /* -----------------------------------------------------
       FIND EXISTING WHATSAPP LINKS
       WITHOUT INTERCEPTING POPUP NUMBERS
    ----------------------------------------------------- */

    document
        .querySelectorAll("a")
        .forEach(link => {

            /*
             * VERY IMPORTANT:
             *
             * Founder and Co-Founder links
             * must stay as real WhatsApp links.
             *
             * We skip them completely.
             */
            if (
                link.classList.contains(
                    "vga-wa-option"
                )
            ) {

                return;

            }


            const text =
                link.textContent
                    .trim()
                    .toLowerCase();

            const href =
                (
                    link.getAttribute(
                        "href"
                    ) || ""
                ).toLowerCase();


            /*
             * These are the website's
             * "Chat With Us / WhatsApp"
             * buttons.
             *
             * They open the popup.
             */
            if (
                text.includes("whatsapp") ||
                href.includes("wa.me") ||
                href.includes("whatsapp")
            ) {

                link.removeAttribute(
                    "target"
                );

                link.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        openWhatsApp();

                    }
                );

            }

        });


    /* =====================================================
       COMPANY EMAIL
    ====================================================== */

    const agencyEmail =
        "videographicagency@gmail.com";

    document
        .querySelectorAll("a")
        .forEach(link => {

            const text =
                link.textContent
                    .trim()
                    .toLowerCase();

            const href =
                (
                    link.getAttribute(
                        "href"
                    ) || ""
                ).toLowerCase();

            if (
                text.includes("email") ||
                href.startsWith("mailto:")
            ) {

                link.setAttribute(
                    "href",
                    `mailto:${agencyEmail}`
                );

            }

        });


    /* =====================================================
       TEAM IMAGE QUALITY / FULL IMAGE PROTECTION
    ====================================================== */

    document
        .querySelectorAll(
            ".team-photo img"
        )
        .forEach(image => {

            image.style.objectFit =
                "contain";

            image.style.objectPosition =
                "center center";

        });


    /* =====================================================
       INITIAL PARALLAX
    ====================================================== */

    handleParallax();


    /* =====================================================
       FINAL SAFETY
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth <= 800) {

                if (cursorDot)
                    cursorDot.style.display =
                        "none";

                if (cursorRing)
                    cursorRing.style.display =
                        "none";

            }

        }
    );

});