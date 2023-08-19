const update = document.querySelector('#update-button');
console.log(update);

update.addEventListener('click', () => {
  console.log('hai');
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vader',
      quote: 'I find your lack of faith disturbing.',
    }),
  });
});
