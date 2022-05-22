document.addEventListener("DOMContentLoaded", function () {
  let validated;
  let copyStudentsDef;
  let studentsDef = [
    {
      sname: "Сидоров",
      fname: "Иван",
      lname: "Михайлович",
      bdate: "2000-12-31",
      startlearn: "2005",
      fac: "Физики",
    },
    {
      sname: "Сидорова",
      fname: "Ивана",
      lname: "Михайловна",
      bdate: "1994-11-12",
      startlearn: "2019",
      fac: "Астрономии",
    },
    {
      sname: "Сорокина",
      fname: "Мария",
      lname: "Алексеевна",
      bdate: "1992-01-01",
      startlearn: "2008",
      fac: "Математики",
    },
    {
      sname: "Андропов",
      fname: "Александр",
      lname: "Петрович",
      bdate: "1992-10-03",
      startlearn: "2003",
      fac: "Информатики",
    },
    {
      sname: "Никифоров",
      fname: "Олег",
      lname: "Олегович",
      bdate: "1995-12-24",
      startlearn: "2021",
      fac: "Химии",
    },
  ];

  //Устанавливаем для даты рождения максимально текущую дату id dateBirth
  dateBirth.max = new Date().toISOString().split("T")[0];

  //Устанавливаем для даты поступления максимально текущую дату id date
  date.max = new Date().getFullYear();

  //Считаем возраст студента
  function getAge(dateString) {
    let today = new Date();
    // dateString = dateString.toISOString();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  //вывод массива студентов
  function createStudentItem(sname, fname, lname, bdate, startlearn, fac) {
    let course;
    let newSemester = 0;
    let studItemBox = document.createElement("ul");
    studItemBox.classList.add("list-group", "group-students");
    let fullNameText = sname + " " + fname + " " + lname;
    //если месяц больше августа то новый семестр, прибавляем курс
    if (new Date().getMonth() > 7) {
      newSemester++;
    }
    if (+startlearn >= new Date().getFullYear() - 4) {
      course = `${new Date().getFullYear() - +startlearn + newSemester} year`;
    } else {
      course = "graduated";
    }
    let yearStudyText = `${startlearn} - ${+startlearn + 4} (${course})`;
    let age = `${bdate.split("-").reverse().join(".")} (${getAge(bdate)})`;
    let fullName = document.createElement("li");
    let faculty = document.createElement("li");
    let bDate = document.createElement("li");
    let yearStudy = document.createElement("li");
    fullName.classList.add("list");
    faculty.classList.add("list");
    bDate.classList.add("list");
    yearStudy.classList.add("list");
    fullName.textContent = fullNameText;
    faculty.textContent = fac;
    bDate.textContent = age;
    yearStudy.textContent = yearStudyText;

    //вкладываем кнопки в div для объединения
    studItemBox.append(fullName);
    studItemBox.append(faculty);
    studItemBox.append(bDate);
    studItemBox.append(yearStudy);

    return {
      studItemBox,
      fullName,
      faculty,
      bDate,
      yearStudy,
    };
  }

  createStudentApp();

  //функция вывода в DOM
  function createStudentApp() {
    //ЗДЕСЬ ТОЛЬКО ВЫВОДИМ ИЗ МАССИВА ОБЪЕКТОВ в DOM
    let container = document.getElementById("students-list");
    container.innerHTML = "";
    container.innerHTML = `<ul class="list-group" id='headStudent'>
            <li class="list list-main" id='sname'>Full name</li>
            <li class="list list-main" id='fac'>Faculty</li>
            <li class="list list-main" id='bdate'>Date of Birth</li>
            <li class="list list-main" id="startlearn">Year of study</li>
          </ul>`;
    studentsDef.forEach((element) => {
      let studentItem = createStudentItem(
        element.sname,
        element.fname,
        element.lname,
        element.bdate,
        element.startlearn,
        element.fac
      );
      container.append(studentItem.studItemBox);
    });
    addEvent();
  }

  //сортировка массива объектов по указанному ключу
  function sort(arr, param) {
    return (sortArr = arr.sort(function (a, b) {
      if (a[param] < b[param]) {
        return -1;
      }
    }));
  }

  // отслеживаем нажатие на ul id headStudent
  function addEvent() {
    headStudent = document.getElementById("headStudent");
    headStudent.addEventListener("click", function (e) {
      let idInput = e.target.getAttribute("id");
      studentsDef = sort(studentsDef, idInput);
      createStudentApp();
    });
  }

  addEvent();

  //добавляем студента и перерисовываем вывод включая добавленного
  document
    .getElementById("studentForm")
    .addEventListener("submit", function (e) {
      //ЗДЕСЬ ТОЛЬКО ДОБАВЛЯЕМ В МАССИВ ОБЪЕКТОВ
      //предотвращаем стандартное действие браузера при отправке формы (перезагрузка страницы)
      e.preventDefault();
      const forms = document.querySelectorAll(".needs-validation");
      // Loop over them and prevent submission
      Array.from(forms).forEach((form) => {
        validated = 1;
        if (!form.checkValidity()) {
          e.stopPropagation();
          validated = 0;
        } else {
          validated = 1;
        }
        form.classList.add("was-validated");
      });

      if (validated !== 0) {
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let middleName = document.getElementById("middleName").value;
        let dateBirth = document.getElementById("dateBirth").value;
        let date = document.getElementById("date").value;
        let faculty = document.getElementById("faculty").value;
        studentsDef.push({
          sname: firstName,
          fname: lastName,
          lname: middleName,
          bdate: dateBirth,
          startlearn: date,
          fac: faculty,
        });
        createStudentApp();
      }
    });
});
