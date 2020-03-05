'use strict';


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the repo array
  for (let i = 0; i < responseJson.length; i++){
    // for each repo object in the repo
    //array, add a list item to the results 
    //list with the repo title, link
    $('#results-list').append(
      `<li>
      <h3>${responseJson[i].title}</h3>
      <p><a href="${responseJson[i].html_url}"</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(searchTerm) {
  
  
 const url = 'https://api.github.com/users/${searchTerm}/repos';

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
}

$(watchForm);