const callback = function (entries) {
	const isVisible = entries[0].isIntersecting;

	if (isVisible) {
		addFullScreenButtonToActionButtonsWrapper();
	}
};

function addFullScreenButtonIfActionButtonsWrapperIsVisible() {
	const actionButtonsWrapper = document.querySelector(".cZG6je");
	if (!actionButtonsWrapper) {
		window.setTimeout(
			addFullScreenButtonIfActionButtonsWrapperIsVisible,
			1000
		);
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		const isVisible = entries[0].isIntersecting;

		if (isVisible) {
			addFullScreenButtonToActionButtonsWrapper();
		}
	});

	observer.observe(actionButtonsWrapper);
}

function checkStatusOfScreenSharingToChangeDisplayStateOfFullscreenButton(
	oldValue
) {
	const shareScreenButtonToolTip = document.querySelector(
		".iJq2Ce .VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.tWDL4c.uaILN"
	);

	if (shareScreenButtonToolTip) {
		const newValue = shareScreenButtonToolTip.getAttribute("aria-label");

		if (oldValue != newValue) {
			oldValue = newValue;

			if (newValue.search("is presenting") >= 0) {
				showFullscreenButton();
			} else {
				hideFullscreenButton();
			}
		}
	}
	window.setTimeout(
		() =>
			checkStatusOfScreenSharingToChangeDisplayStateOfFullscreenButton(
				oldValue
			),
		1000
	);
}

function addFullScreenButtonToActionButtonsWrapper() {
	const icon = document.createElement("i");
	icon.setAttribute("aria-hidden", true);
	icon.textContent = "fullscreen";
	icon.classList.add("google-material-icons");

	const fullScreenButton = document.createElement("button");
	fullScreenButton.name = "fullscreenbtn";
	fullScreenButton.id = "fullscreenbtn";
	fullScreenButton.classList.add("uaILN");
	fullScreenButton.classList.add("xEp89c");
	fullScreenButton.setAttribute(
		"aria-label",
		"Fullscreen the shared shared screen"
	);
	fullScreenButton.setAttribute("data-tooltip-id", "r-tt-c1");
	fullScreenButton.setAttribute("data-tooltip-x-position", "3");
	fullScreenButton.setAttribute("data-tooltip-y-position", "2");
	fullScreenButton.setAttribute("aria-expanded", false);
	fullScreenButton.setAttribute("aria-haspopup", "menu");
	fullScreenButton.addEventListener("click", makeSharedScreenFullScreen);

	fullScreenButton.appendChild(icon);

	const tooltip = document.createElement("div");
	tooltip.id = "r-tt-c1";
	tooltip.setAttribute("role", "tooltip");
	tooltip.setAttribute("aria-hidden", true);
	tooltip.classList.add("EY8ABd-OWXEXe-TAWMXe");
	tooltip.textContent = "Fullscreen the shared shared screen";

	const wrapper = document.createElement("span");
	wrapper.setAttribute("data-is-tooltip-wrapper", true);
	wrapper.appendChild(fullScreenButton);
	wrapper.appendChild(tooltip);

	const shareScreenButton = document.querySelector(".iJq2Ce");
	shareScreenButton.parentNode.insertBefore(
		wrapper,
		shareScreenButton.nextSibling
	);

	checkStatusOfScreenSharingToChangeDisplayStateOfFullscreenButton();
}

function hideFullscreenButton() {
	const fullScreenButton = document.querySelector("#fullscreenbtn");
	fullScreenButton.style.display = "none";
}

function showFullscreenButton() {
	const fullScreenButton = document.querySelector("#fullscreenbtn");
	fullScreenButton.style.display = "inline-block";
}

function makeSharedScreenFullScreen() {
	const sharedScreen = document.querySelector(".Gv1mTb-aTv5jf");
	sharedScreen.requestFullscreen();

	if (
		(document.fullScreenElement && document.fullScreenElement !== null) ||
		(!document.mozFullScreen && !document.webkitIsFullScreen)
	) {
		if (sharedScreen.requestFullScreen) {
			sharedScreen.requestFullScreen();
		} else if (sharedScreen.mozRequestFullScreen) {
			sharedScreen.mozRequestFullScreen();
		} else if (sharedScreen.webkitRequestFullScreen) {
			sharedScreen.webkitRequestFullScreen(
				Element.ALLOW_KEYBOARD_INPUT
			);
		}
	}
}

addFullScreenButtonIfActionButtonsWrapperIsVisible();