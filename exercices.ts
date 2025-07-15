// write a function pause, which works like setTimeout but is made as a promise.

const pause = (durationMs: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, durationMs);
  });

const demo = () => {
  console.log('Starting pause...');
  pause(2000).then(() => {
    console.log('Pause completed after 2 seconds');
  });
};

demo();

// The JSON Placeholder API has /users endpoint,
// just like the one we saw in the tutorial for /posts
// Get the user with ID 3 and log their name and company they work for.
// Handle errors if something does not quite work.

fetch('https://jsonplaceholder.typicode.com/users/3')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log('Name:', data.name);
    console.log('Company:', data.company);
  })
  .catch((error) => {
    console.error('Fetch error:', error);
  });
