let relationsData = [];

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
  const data = await readFile(file);
  showEntities(data.entities);
  showRelations(data.relations);
  showExamples(data.examples);

  entitiesData = data.entities;
  relationsData = data.relations;
  examplesData = data.examples;
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

const isPresent = (examplesData, firstObj, relationItem, secondObj) => {
  const result = examplesData.find((example) => {
    return (
      example[0] == firstObj &&
      example[1] == relationItem &&
      Number(example[2]) == Number(secondObj)
    );
  });
  return result;
};

const search = () => {
  const firstObj = document.getElementById("firstObj").value;
  const relationItem = document.getElementById("relation").value;
  const secondObj = document.getElementById("secondObj").value;

  if (isPresent(examplesData, firstObj, relationItem, secondObj)) {
    console.log(firstObj, relationItem, secondObj);
  }

  if (entitiesData.find((entity) => entity[0] == firstObj)) {
    const potentialAnswer = examplesData
      .filter((example) => {
        return example[0] == secondObj && relationItem == 2;
      })
      .map((example) => {
        return [firstObj, "1", example[2]];
      });
    if (!isPresent(examplesData, firstObj, relationItem, secondObj)) {
      examplesData.push(...potentialAnswer);
      examplesData.push([firstObj, relationItem, secondObj]);
    }
    showExamples(examplesData);
  }
};
