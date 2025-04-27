// event listener for the start btn, click to hide the home screen and show the year selection screen
document.querySelector('.start-button').addEventListener('click', () => {
	document.getElementById('home').classList.add('hidden'); //hide home screen
	document.getElementById('year-select').classList.remove('hidden'); //show year selection screen
});

// event listener for each year btn, click to store selected year in local storage and show relevant popup
document.querySelectorAll('.year-buttons button').forEach((button) => {
	button.addEventListener('click', (e) => {
		const year = e.currentTarget.dataset.year; // get the year from the btn's data-year attribute
		localStorage.setItem('selectedYear', year); // store the selected year in local storage
		console.log('button clicked', e.target);
		console.log('selected year', year);
		document.getElementById('year-select').classList.add('hidden'); // hide year selection screen

		// as only 1920 design is added, if selected, user is shown a photosensitivity warning, if any other year is selected, a popup with coming soon will be shown instead
		if (year === '1920') {
			document.getElementById('warning-popup').classList.remove('hidden');
		} else {
			document.getElementById('coming-soon-popup').classList.remove('hidden');
		}
	});
});
// if user selects to view the vortex animation, the popup will be hidden and the video will be played by removing its hidden class
document.getElementById('view-vortex').addEventListener('click', () => {
	const vortexScreen = document.getElementById('vortex'); // get the vortex screen element
	const video = document.getElementById('vortex-video'); // get the vortex video element

	document.getElementById('warning-popup').classList.add('hidden'); // hide warning popup
	vortexScreen.classList.remove('hidden'); // show vortex screen

	video.currentTime = 0; //reset video to start from 0 when user clicks proceed
	// video will play for 2 seconds before it gets paused and hidden, the year clicked by user in previous stage will be retrieved from storage and the corresponding html page will be retrieved and shown to the user
	video
		.play() // play video
		.then(() => {
			setTimeout(() => {
				video.pause(); //pause video
				const year = localStorage.getItem('selectedYear'); // get the selected year from local storage
				window.location.href = `${year}s.html`; // redirect to the selected decade's html page
			}, 2000); // wait 2 secs before redirecting
		})
		.catch((err) => {
			console.error('Error playing video:', err); // log error if video fails to play
			const year = localStorage.getItem('selectedYear'); // get selected year from local storage
			window.location.href = `${year}s.html`; // redirect if video fails to play
		});
});

// event listener for skip btn in the warning popup to skip the vortex animation and show overview
document.getElementById('skip-vortex').addEventListener('click', () => {
	document.getElementById('warning-popup').classList.add('hidden'); // hide warning popup
	showOverview(); // show the selected decade's overview by calling showOverview function
});

// event listener for the back to year selection btn to go back to the year selection screen
document.getElementById('back-to-years').addEventListener('click', () => {
	document.getElementById('coming-soon-popup').classList.add('hidden'); // hide coming soon popup
	document.getElementById('year-select').classList.remove('hidden'); // show year selection screen
});

// fnct to show the selected decade's overview page based on the year stored in local storage
function showOverview() {
	const year = localStorage.getItem('selectedYear'); // get the selected year from localStorage

	if (year) {
		window.location.href = `${year}s.html`; // redirect to the selected decade's page
	} else {
		console.error('No year selected.'); // log error if no year is selected
	}
}
