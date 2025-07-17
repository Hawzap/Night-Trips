let trips = [
    {
        count: 1,
        imageName: "GRAND DUNES LANDSCAPE",
        imageSrc: "./images/trips/1.jpg",
        title: "Chill Adventure",
        text: [
            {
                isParagraph: true,
                text: "Ornare vivamus molestie pellentesque nunc. Sed sapien erat ultrices curabitur. Erat id fringilla arcu condimentum fames.",
            },
            {
                isParagraph: false,
                text: "Aliquet dictum aliquet faucibus cursus turpis. Suspendisse cum rutrum sit ut sociis. Pellentesque neque orci adipiscing pharetra lacus, dignissim pharetra ipsum blandit. Feugiat quis quam consectetur lectus id quis tortor vel, mattis.",
            },
        ],
    },
    {
        count: 2,
        imageName: "GRAND DUNES LANDSCAPE",
        imageSrc: "./images/trips/2.jpg",
        title: "Spooky Times",
        text: [
            {
                isParagraph: true,
                text: "Ornare vivamus molestie pellentesque nunc. Sed sapien erat ultrices curabitur. Erat id fringilla arcu condimentum fames.",
            },
            {
                isParagraph: false,
                text: "Aliquet dictum aliquet faucibus cursus turpis. Suspendisse cum rutrum sit ut sociis. Pellentesque neque orci adipiscing pharetra lacus, dignissim pharetra ipsum blandit. Feugiat quis quam consectetur lectus id quis tortor vel, mattis.",
            },
        ],
    },
    {
        count: 3,
        imageName: "GRAND DUNES LANDSCAPE",
        imageSrc: "./images/trips/3.jpg",
        title: "Desert Madness",
        text: [
            {
                isParagraph: true,
                text: "Ornare vivamus molestie pellentesque nunc. Sed sapien erat ultrices curabitur. Erat id fringilla arcu condimentum fames.",
            },
            {
                isParagraph: false,
                text: "Aliquet dictum aliquet faucibus cursus turpis. Suspendisse cum rutrum sit ut sociis. Pellentesque neque orci adipiscing pharetra lacus, dignissim pharetra ipsum blandit. Feugiat quis quam consectetur lectus id quis tortor vel, mattis.",
            },
        ],
    },
    {
        count: 4,
        imageName: "GRAND DUNES LANDSCAPE",
        imageSrc: "./images/trips/4.jpg",
        title: "Out in the wild",
        text: [
            {
                isParagraph: true,
                text: "Ornare vivamus molestie pellentesque nunc. Sed sapien erat ultrices curabitur. Erat id fringilla arcu condimentum fames.",
            },
            {
                isParagraph: false,
                text: "Aliquet dictum aliquet faucibus cursus turpis. Suspendisse cum rutrum sit ut sociis. Pellentesque neque orci adipiscing pharetra lacus, dignissim pharetra ipsum blandit. Feugiat quis quam consectetur lectus id quis tortor vel, mattis.",
            },
        ],
    },
];

const tripSections = document.querySelectorAll(".trips__item");
const activeLine = document.querySelector(".trips__sections-activeLine");
const tripBody = document.querySelector(".trips__body");
const sliderButtons = document.querySelector(".trips__image-slider");
const sliderButtonLeft = document.querySelector(".trips__image-slider")
    .children[0];
const sliderButtonRight = document.querySelector(".trips__image-slider")
    .children[1];
const defaultTransitionTime = 500;
activeLine.style.width = tripSections[0].offsetWidth + "px";
window.onload = () => {
    const dataId = +tripBody.getAttribute("data-id-active");
    let bodyElsInfo = {
        count: tripBody.querySelector(".trips__image-count"),
        imageName: tripBody.querySelector(".trips__image-name"),
        imageSrc: `./images/trips/${dataId}.jpg`,
        imageWrapper: tripBody.querySelector(".trips__image-wrapper"),
        title: tripBody.querySelector(".trips__body-title"),
        text: tripBody.querySelector(".trips__body-text"),
    };
    Object.keys(bodyElsInfo).forEach((e) => {
        switch (e) {
            case "count":
                bodyElsInfo[e].children[0].textContent = `0${
                    trips[dataId - 1][e]
                }.`;
                break;
            case "imageSrc":
                break;
            case "imageWrapper":
                bodyElsInfo[e].children[0].src = bodyElsInfo["imageSrc"];
                break;
            case "text":
                const tripsText = trips[dataId - 1][e];

                tripsText.forEach((el, index) => {
                    const p = document.createElement("p");
                    p.className = el["isParagraph"] ? "text--paragraph" : "";
                    p.textContent = el["text"];
                    bodyElsInfo[e].append(p);
                });
                break;
            default:
                bodyElsInfo[e].children[0].textContent = trips[dataId - 1][e];
                break;
        }
    });
};
function changeSize(newElement, oldElement, changingProperty) {
    const newEl = getComputedStyle(newElement);
    const oldEl = getComputedStyle(oldElement);
    const newElProperty = newEl.getPropertyValue(changingProperty);
    const oldElProperty = oldEl.getPropertyValue(changingProperty);
    if (parseInt(oldElProperty) < parseInt(newElProperty)) {
        oldElement.style[`${changingProperty}`] = newElProperty;
    }
}
function getTransitionProperty(element) {
    let result = [];
    result.push(+element.getAttribute("data-delay") / 1000);
    result.push(+element.getAttribute("data-transitionTime") / 1000);
    return result;
}
function setTransitionProperty(
    element,
    transitionTime,
    transitionDelay,
    animProperty
) {
    element.style.transition = `${animProperty ? animProperty : ""} ${
        transitionTime ? transitionTime : defaultTransitionTime
    }s ${transitionDelay ? transitionDelay : 0}s`;
}
function slider(buttons, sectionsButton, direction, currentId) {
    let isLeft = direction == "left";
    let biggestTimeline = 0;
    [...buttons.children].forEach((e) => {
        e.disabled = true;
    });
    sectionsButton.forEach((e) => {
        e.children[0].disabled = true;
    });
    let dataId = +tripBody.getAttribute("data-id-active") + (isLeft ? 1 : -1);
    let dataActiveId;
    if (currentId) {
        dataActiveId = currentId;
    } else if (isLeft) {
        dataActiveId = dataId > trips.length ? dataId - trips.length : dataId;
    } else {
        dataActiveId = dataId < 1 ? trips.length : dataId;
    }
    let activeSection = [...tripSections].find(
        (item) => item.getAttribute("data-id") == dataActiveId
    );
    let prevSection = document.querySelector(".trips__item--active");

    activeSection.classList.add("trips__item--active");
    prevSection.classList.remove("trips__item--active");
    activeLine.style.cssText = `
    width: ${activeSection.offsetWidth}px;
    left: ${activeSection.offsetLeft}px
    `;
    let bodyElsInfo = {
        count: tripBody.querySelector(".trips__image-count"),
        imageName: tripBody.querySelector(".trips__image-name"),
        imageSrc: `./images/trips/${dataActiveId < 4 ? dataActiveId : 1}.jpg`,
        imageWrapper: tripBody.querySelector(".trips__image-wrapper"),
        title: tripBody.querySelector(".trips__body-title"),
        text: [],
    };
    const textWrapper = tripBody.querySelector(".trips__body-text");
    const styles = getComputedStyle(textWrapper);
    const textWrapperGap = styles.getPropertyValue("gap");
    textWrapper.querySelectorAll("p").forEach((e) => {
        bodyElsInfo.text.push(e);
    });
    const newBodyInfo = trips.find((e) => e.count == dataActiveId);
    Object.keys(newBodyInfo).forEach((e) => {
        if (e == "imageSrc") {
            const imgWrapper = bodyElsInfo["imageWrapper"];
            let img = document.createElement("img");
            let [transDelay, transTime] = getTransitionProperty(imgWrapper);
            if (transDelay * 1000 + transTime * 1000 > biggestTimeline) {
                biggestTimeline = transDelay * 1000 + transTime * 1000;
            }
            img.src = newBodyInfo[e];
            img.className = "trips__image-appeared";
            setTransitionProperty(
                imgWrapper.children[0],
                transTime,
                transDelay,
                "opacity"
            );
            imgWrapper.append(img);
            imgWrapper.children[0].classList.add("trips__image-disappearing");
            setTimeout(() => {
                imgWrapper.children[1].classList.add("trips__image-active");
                imgWrapper.children[1].classList.remove(
                    "trips__image-appeared"
                );
                imgWrapper.children[0].remove();
            }, biggestTimeline);
            return;
        }
        if (e == "text") {
            let prevPHeight = 0;
            newBodyInfo[e].forEach((e, index) => {
                const pChild = bodyElsInfo.text[index];
                const p = document.createElement("p");
                let [transDelay, transTime] =
                    getTransitionProperty(textWrapper);
                if (index > 0) {
                    transDelay += (80 / 1000) * index;
                }
                if (transDelay * 1000 + transTime * 1000 > biggestTimeline) {
                    biggestTimeline = transDelay * 1000 + transTime * 1000;
                }

                p.textContent = e.text;
                e.isParagraph && p.classList.add("text--paragraph");
                p.classList.add(
                    "trips__body__changedEl",
                    `trips__body__changedEl--${direction[0]}`
                );
                setTransitionProperty(p, transTime, transDelay, "left");
                setTransitionProperty(
                    pChild,
                    transTime,
                    transDelay,
                    "translate"
                );
                pChild.insertAdjacentElement("afterend", p);
                const pStyles = getComputedStyle(p);
                const pHeight = pStyles.getPropertyValue("height");
                changeSize(p, pChild, "height");
                p.style.top = `${prevPHeight}px`;
                prevPHeight = parseFloat(pHeight) + parseFloat(textWrapperGap);
                pChild.classList.add(
                    "trips__body__startAnimChanging",
                    `trips__body__startAnimChanging--${direction[0]}`
                );
                setTimeout(() => {
                    p.classList.add(
                        "trips__body__startAnimChanged",
                        `trips__body__startAnimChanged--${direction[0]}`
                    );
                }, 0);
                setTimeout(() => {
                    p.classList.remove(
                        "trips__body__changedEl",
                        `trips__body__changedEl--${direction[0]}`
                    );
                    p.classList.remove(
                        "trips__body__startAnimChanged",
                        `trips__body__startAnimChanged--${direction[0]}`
                    );
                    pChild.remove();
                }, biggestTimeline);
            });
            return;
        }
        let span = document.createElement("span");
        span.classList.add(
            "trips__body__changedEl",
            `trips__body__changedEl--${direction[0]}`
        );
        if (e == "count") {
            span.textContent = `0${newBodyInfo[e]}.`;
        } else {
            span.textContent = newBodyInfo[e];
        }
        let [transDelay, transTime] = getTransitionProperty(bodyElsInfo[e]);
        if (transDelay * 1000 + transTime * 1000 > biggestTimeline) {
            biggestTimeline = transDelay * 1000 + transTime * 1000;
        }
        setTransitionProperty(
            bodyElsInfo[e].children[0],
            transTime,
            transDelay,
            "translate"
        );
        setTransitionProperty(span, transTime, transDelay, "left");
        bodyElsInfo[e].append(span);

        if (e == "title") {
            span.style.width = "fit-content";
            span.style.whiteSpace = "nowrap";
            changeSize(span, bodyElsInfo[e], "width");
            bodyElsInfo[e].children[0].style.width = "100%";
        }
        bodyElsInfo[e].children[0].classList.add(
            "trips__body__startAnimChanging",
            `trips__body__startAnimChanging--${direction[0]}`
        );
        setTimeout(() => {
            span.classList.add(
                "trips__body__startAnimChanged",
                `trips__body__startAnimChanged--${direction[0]}`
            );
            span.style.width = "100%";
        }, 0);
        setTimeout(() => {
            span.classList.remove(
                "trips__body__changedEl",
                `trips__body__changedEl--${direction[0]}`
            );
            span.classList.remove(
                "trips__body__startAnimChanged",
                `trips__body__startAnimChanged--${direction[0]}`
            );
            bodyElsInfo[e].children[0].remove();
        }, biggestTimeline);
    });
    setTimeout(() => {
        tripBody.setAttribute("data-id-active", dataActiveId);
        [...buttons.children].forEach((e) => {
            e.disabled = false;
        });
        sectionsButton.forEach((e) => {
            e.children[0].disabled = false;
        });
    }, biggestTimeline);
}
sliderButtons.children[0].addEventListener("click", () => {
    slider(sliderButtons, tripSections, "right");
});
sliderButtons.children[1].addEventListener("click", () => {
    slider(sliderButtons, tripSections, "left");
});

tripSections.forEach((el) => {
    el.children[0].addEventListener("click", () => {
        let currentDataId = +el.getAttribute("data-id");
        let activeDataId = +tripBody.getAttribute("data-id-active");
        if (currentDataId !== activeDataId) {
            slider(
                sliderButtons,
                tripSections,
                currentDataId > activeDataId ? "left" : "right",
                currentDataId
            );
        }
    });
});
