const path = require("path");
const fs = require("fs");

const prisma = require("./../../database/client");

const dataSourcePath = path.join(__dirname, "../../data-source/addresses");

const createDivisions = () => {
  fs.readFile(
    `${dataSourcePath}/bd-divisions.json`,
    "utf8",
    function (err, data) {
      if (err) {
        console.error(err);
      } else {
        const divisions = JSON.parse(data);

        prisma.divisions
          .createMany({
            data: divisions.divisions,
          })
          .then(() => {
            console.log("Divisions created successfully!");
          })
          .catch((err) => console.error("Something went wrong", err));
      }
    }
  );
};

const createDistricts = () => {
  fs.readFile(
    `${dataSourcePath}/bd-districts.json`,
    "utf8",
    function (err, data) {
      if (err) {
        console.error(err);
      } else {
        const districts = JSON.parse(data);

        prisma.districts
          .createMany({
            data: districts.districts,
          })
          .then(() => {
            console.log("Districts created successfully!");
          })
          .catch((err) => console.error("Something went wrong", err));
      }
    }
  );
};

const createUpazilas = () => {
  fs.readFile(
    `${dataSourcePath}/bd-upazilas.json`,
    "utf8",
    function (err, data) {
      if (err) {
        console.error(err);
      } else {
        const upazilas = JSON.parse(data);

        prisma.upazilas
          .createMany({
            data: upazilas.upazilas,
          })
          .then(() => {
            console.log("upazilas created successfully!");
          })
          .catch((err) => console.error("Something went wrong", err));
      }
    }
  );
};

const createDhakaAreas = () => {
  fs.readFile(
    `${dataSourcePath}/dhaka-city.json`,
    "utf8",
    function (err, data) {
      if (err) {
        console.error(err);
      } else {
        const upazilas = JSON.parse(data);

        prisma.dhakaCity
          .createMany({
            data: upazilas.dhaka,
          })
          .then(() => {
            console.log("Dhaka City created successfully!");
          })
          .catch((err) => console.error("Something went wrong", err));
      }
    }
  );
};

const command = process.argv[2];

if (command === "create-divisions") {
  createDivisions();
}

if (command === "create-districts") {
  createDistricts();
}

if (command === "create-upazials") {
  createUpazilas();
}

if (command === "create-dhaka-areas") {
  createDhakaAreas();
}
