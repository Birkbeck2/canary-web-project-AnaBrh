document.addEventListener('DOMContentLoaded', () => {
	// get all the nav btns
	const navItems = document.querySelectorAll('.nav-menu .nav-button');
	// get the dynamic heading element
	const heading = document.getElementById('dynamic-heading');

	// headings for the dynamic heading
	const headings = {
		overview: 'Welcome to the 1920s!',
		trends: 'Trends through the decade',
		accessories: 'Accessories of the decade',
		hair: 'Hairstyles of an era',
		makeup: 'Makeup trends',
		designers: 'Top designers of the era',
		icons: "Fashion icon of the 20's",
	};

	// function to load the content dynamically from the data file
	function loadContent(section) {
		// fetch the data from the json file
		fetch('data.json')
			.then((res) => res.json()) // convert the response to json
			.then((data) => {
				// extract data for the section
				const sectionData = data['1920s'][section];

				// handle the overview section separately
				if (section === 'overview') {
					// show top and bottom boxes for the overview section
					document.getElementById('top-box').style.display = 'block';
					document.getElementById('bottom-box').style.display = 'block';
					document.getElementById('scroll-box').style.display = 'none';

					// populate the top box with popular fonts
					document.getElementById('top-box').innerHTML = `
            <div class="inner-box">
              <h2 class="pixel-title">Popular Fonts</h2>
              <p class="pixel-paragraph">${sectionData.fonts}</p>
            </div>
          `;

					// populate the bottom box with popular colours
					document.getElementById('bottom-box').innerHTML = `
            <div class="inner-box">
              <h2 class="pixel-title">Popular Colours</h2>
              <div class="colour-grid">
                ${sectionData.colours
																	.map(
																		(colour, index) => `
																		<!-- check if it's the start of a new row - every 3 colours -->
    ${index % 3 === 0 ? '<div class="colour-group">' : ''}
		<!-- create a colour swatch with background set to the colour's hex value -->
      <div class="colour-swatch" style="background:${colour.hex};">
			<!-- display the hex code of the colour -->
        <span>HEX: ${colour.hex}</span>
      </div>
			<!-- close the colour group after every 3 colours or at the last colour -->
    ${
					index % 3 === 2 || index === sectionData.colours.length - 1 ? '</div>' : ''
				}
  `
																	)
																	.join(
																		''
																	)} <!-- Join all generated HTML fragments into one string without separators -->
              </div>
            </div>
          `;
					// if the section doesn't have colours, hide top and bottom boxes and display scroll box
				} else {
					// hide top and bottom boxes for other sections
					document.getElementById('top-box').style.display = 'none';
					document.getElementById('bottom-box').style.display = 'none';
					document.getElementById('scroll-box').style.display = 'block';

					// populate the scroll box with section content
					document.getElementById('scroll-box').innerHTML = `
  <div class="inner-box">
    <h2 class="pixel-title">${sectionData.title}</h2>
  </div>
`;

					const innerBox = document.querySelector('#scroll-box .inner-box');

					// loop through the content of the section and add it dynamically
					sectionData.content.forEach((item) => {
						// handle text items
						if (item.type === 'text') {
							const paragraph = document.createElement('p');
							paragraph.className = 'pixel-paragraph'; // add class for styling
							paragraph.textContent = item.text;
							innerBox.appendChild(paragraph);
						}
						// handle image items
						else if (item.type === 'image') {
							const image = document.createElement('img');
							image.className = 'pixel-image';
							image.src = item.src;
							image.alt = item.alt || ''; // set alt text if available (added in json)
							innerBox.appendChild(image);
						}
						// handle subheading items
						else if (item.type === 'subheading') {
							const subheading = document.createElement('h3');
							subheading.className = 'pixel-subheading'; // add class for styling
							subheading.textContent = item.text;
							innerBox.appendChild(subheading);
						}
					});
				}
			})
			.catch((err) => console.error('Failed to load content:', err)); // handle errors
	}

	// event listener for nav btns
	navItems.forEach((item) => {
		// add click event to each btn
		item.addEventListener('click', () => {
			// remove the active class from all nav btns
			navItems.forEach((el) => el.classList.remove('active'));
			// add active class to the clicked btn
			item.classList.add('active');
			// get the section to load based on the clicked button's data-section attribute
			const section = item.getAttribute('data-section');
			// load the content for the selected section
			loadContent(section);
			// update the heading based on the selected section
			heading.textContent = headings[section] || 'Welcome to the 1920s!';
		});
	});

	// default content load when the page loads
	loadContent('overview');
});
