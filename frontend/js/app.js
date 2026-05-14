const courseContainer = document.getElementById("courseContainer");

let allCourses = [];

async function loadCourses() {

    try {

        const response = await fetch(
            "http://localhost:8080/courses"
        );

        const courses = await response.json();

        allCourses = courses;

        displayCourses(courses);

        setupSearch();

    } catch(error){

        console.log("Error loading courses:", error);

        courseContainer.innerHTML =
            "<h2>Failed to load courses</h2>";
    }
}

function displayCourses(courses) {

    courseContainer.innerHTML = "";

    if(courses.length === 0){

        courseContainer.innerHTML =
            "<h2>No Courses Found</h2>";

        return;
    }

    courses.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course-card");

        card.innerHTML = `
            <h3>${course.title}</h3>

            <p>${course.description}</p>

            <p>
                <strong>Duration:</strong>
                ${course.duration}
            </p>

            <button onclick='enrollCourse(${JSON.stringify(course)})'>
                Enroll
            </button>
        `;

        courseContainer.appendChild(card);
    });
}

function enrollCourse(course){

    let enrolledCourses =
        JSON.parse(localStorage.getItem("myCourses")) || [];

    const alreadyExists = enrolledCourses.find(
        c => c.id === course.id
    );

    if(alreadyExists){

        alert("Already Enrolled");

        return;
    }

    course.progress = 0;

    enrolledCourses.push(course);

    localStorage.setItem(
        "myCourses",
        JSON.stringify(enrolledCourses)
    );

    alert("Course Enrolled Successfully");
}

function setupSearch(){

    const searchInput =
        document.getElementById("searchInput");

    if(!searchInput) return;

    searchInput.addEventListener("input", function(){

        const keyword =
            this.value.toLowerCase();

        const filteredCourses =
            allCourses.filter(course =>

                course.title
                .toLowerCase()
                .includes(keyword)

            );

        displayCourses(filteredCourses);
    });
}

loadCourses();