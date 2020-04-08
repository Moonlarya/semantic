let relationsData = [];
let examplesData = [];

const showEntities = (entities) => {
  const entitiesField = document.getElementById("entities");
  entitiesField.innerHTML = "";
  entities.forEach((entity) => {
    entitiesField.innerHTML += `<p>${entity.join(":")}</p>`;
  });
};

const showRelations = (relations) => {
  const relationsField = document.getElementById("relations");
  relationsField.innerHTML = "";
  relations.forEach((relation) => {
    relationsField.innerHTML += `<p>${relation.join(":")}</p>`;
  });
};

const showExamples = (examples) => {
  const examplesField = document.getElementById("examples");
  examplesField.innerHTML = "";
  examples.forEach((example) => {
    examplesField.innerHTML += `<p>${example.join(":")}</p>`;
  });
};

function readFile(object) {
  return new Promise((res) => {
    const file = object.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      const arr = [...reader.result.split(/#./)].filter(Boolean);

      const entities = formatToArr(stringToMap(arr[0]));
      const relations = formatToArr(stringToMap(arr[1]));
      const examples = formatToArr(stringToMap(arr[2]));

      const result = { entities, relations, examples };

      res(result);
    };
    reader.readAsText(file);
  });
}

const load = async (file) => {
  /*const data = await readFile(file);

  entitiesData = data.entities;
  relationsData = data.relations;
  examplesData = data.examples;*/

  entitiesData = [
    ["10", "человек"],
    ["11", "рука"],
    ["12", "голова"],
    ["13", "нога"],
    ["14", "ребенок"],
  ];
  relationsData = [
    ["1", "имеет часть"],
    ["2", "является"],
    ["3", "no common"],
  ];
  examplesData = [
    ["10", "2", "11"],
    ["11", "2", "12"],
    ["10", "1", "15"],
  ];
  showEntities(entitiesData);
  showRelations(relationsData);
  showExamples(examplesData);

  add(examplesData);
  return examplesData;
};

const stringToMap = (str) => {
  return str.split("\n").filter((el) => el.charCodeAt(0) !== 13 && Boolean(el));
};

const formatToObj = (str) => {
  const objMap = {};
  str.forEach((el) => {
    const splittedEl = el.split(":");

    const key = splittedEl[0];
    const value = splittedEl[1];
    objMap[key] = value;
  });
  return objMap;
};

const formatToArr = (arr) => {
  const arrItems = arr.map((element) => {
    const arrItem = element.split(":");
    return arrItem;
  });
  return arrItems;
};

const isPresent = (examplesData) => {
  const firstObj = document.getElementById("firstObj").value;
  const relationItem = document.getElementById("relation").value;
  const secondObj = document.getElementById("secondObj").value;

  const result = examplesData.filter((example) => {
    return (
      (firstObj === "?" || example[0] == firstObj) &&
      (relationItem === "?" || example[1] == relationItem) &&
      (secondObj === "?" || Number(example[2]) == Number(secondObj))
    );
  });
  let contentToDisplay = "";
  result.forEach((el) => {
    contentToDisplay += el.join(":") + "\n";
  });
  alert(contentToDisplay);
  return result;
};

const sendQuery = document.getElementById("sendQuery");
sendQuery.onclick = () => {
  return isPresent(examplesData);
};

const createPartsOfChild = (potentialAnswer) => {
  for (let i = 0; i < examplesData.length; i++) {
    for (let j = 0; j < potentialAnswer.length; j++) {
      if (
        Number(examplesData[i][0]) == Number(potentialAnswer[j][2]) &&
        examplesData[i][1] == "1"
      ) {
        examplesData.push([potentialAnswer[j][0], "1", examplesData[i][2]]);
      } else if (
        Number(examplesData[i][0]) == Number(potentialAnswer[j][2]) &&
        examplesData[i][1] == "2"
      ) {
        examplesData.push([potentialAnswer[j][0], "2", examplesData[i][2]]);
      }
    }
  }
};

const add = (examplesData) => {
  const potentialAnswer = examplesData.filter((example) => {
    return example[1] == 2;
  });
  createPartsOfChild(potentialAnswer);
  showExamples(examplesData);
};
