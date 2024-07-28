// index.js

const createRamenImgElement = (ramen) => {
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener('click', () => handleClick(ramen));
  return img;
};

const updateRamenDetails = (ramen) => {
  const detailImage = document.querySelector('.detail-image');
  const detailName = document.querySelector('.name');
  const detailRestaurant = document.querySelector('.restaurant');
  const detailRating = document.querySelector('#rating-display');
  const detailComment = document.querySelector('#comment-display');

  detailImage.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;
};

const handleClick = (ramen) => {
  updateRamenDetails(ramen);
};

const addSubmitListener = () => {
  const form = document.querySelector('#new-ramen');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRamen = {
      name: form['new-name'].value,
      restaurant: form['new-restaurant'].value,
      image: form['new-image'].value,
      rating: form['new-rating'].value,
      comment: form['new-comment'].value
    };

    const ramenMenu = document.querySelector('#ramen-menu');
    ramenMenu.appendChild(createRamenImgElement(newRamen));

    form.reset();
  });
};

const displayRamens = async () => {
  try {
    const response = await fetch('http://localhost:3000/ramens');
    const ramens = await response.json();

    const ramenMenu = document.querySelector('#ramen-menu');
    ramens.forEach(ramen => {
      ramenMenu.appendChild(createRamenImgElement(ramen));
    });
  } catch (error) {
    console.error('Error fetching ramens:', error);
  }
};

const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
    displayRamens();
    addSubmitListener();
  });
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
