const loadFromStorage = (key) => {
  return new Promise((resolve, reject) => {
    const raw = localStorage.getItem(key);

    if (raw) {
      const data = JSON.parse(raw);
      resolve(data);
    } else {
      reject(key);
    }
  });
};

const retrieveFromAPI = (key) => {
  return fetch(`https://anapioficeandfire.com/api/characters/${key}`).then(
    getJSON
  );
};

const getJSON = (response) => {
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error(`Bad Status Code ${response.status}`);
  }
};

const logData = (data) => {
  console.log(data);
  return data;
};

const extractAliases = (character) => {
  const { aliases } = character;
  return aliases;
};

const printAliases = (aliases) => {
  for (let a of aliases) {
    console.log(a);
  }
  return aliases.length;
};

const reportError = () => {
  console.log("there was an error");
  return 0;
};

const printSummary = (howMany) => {
  console.log(`We printed ${howMany} aliases`);
};

loadFromStorage("583")
  .catch(retrieveFromAPI)
  .then(logData)
  .then(extractAliases)
  .then(printAliases)
  .catch(reportError)
  .then(printSummary);

//_______________________________________________________________________

const fetchHouse = (houseURL) => fetch(`${houseURL}`).then(getJSON);

const retrieveHouseFromAPI = (houses) => {
  const fetchArray = houses.map((houseURL) => fetchHouse(houseURL));
  console.log("my fetch array", fetchArray);
  return Promise.all(fetchArray);
};

const extractHousesFromCharacter = (character) => {
  const { allegiances } = character;
  return allegiances;
};

const addHousesToCharacter = (character) => {
  return retrieveHouseFromAPI(extractHousesFromCharacter(character)).then(
    (houseArray) => {
      character.allegiances = houseArray;
      return character;
    }
  );
};
