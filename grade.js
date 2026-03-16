document.getElementById("btn").addEventListener("click", function () {
    let Name = document.getElementById("studentName").value.trim();
    let Math = parseFloat(document.getElementById("Math").value);
    let English = parseFloat(document.getElementById("English").value);
    let Science = parseFloat(document.getElementById("Science").value);
    let Urdu = parseFloat(document.getElementById("Urdu").value);
    let Islamiat = parseFloat(document.getElementById("Islamiat").value);
    let PakStudy = parseFloat(document.getElementById("PakStudy").value);
    let Physics = parseFloat(document.getElementById("Physics").value);
    let Chemistry = parseFloat(document.getElementById("Chemistry").value);
    let Result = document.getElementById("Result");

    function isValidMarks(m) {
        return !isNaN(m) && m >= 1 && m <= 100;
    }

    // Validation
    if (Name === "" || !isValidMarks(Math) || !isValidMarks(English) || !isValidMarks(Science) || !isValidMarks(Urdu) || !isValidMarks(Islamiat) || !isValidMarks(PakStudy) || !isValidMarks(Physics) || !isValidMarks(Chemistry)) {
        Result.style.display = "block";
        Result.innerHTML = "<span style='color:red'>Please enter valid marks between 1 to 100!</span>";
        return;
    }

    let subjects = [
        { name: "Math", marks: Math },
        { name: "English", marks: English },
        { name: "Science", marks: Science },
        { name: "Urdu", marks: Urdu },
        { name: "Islamiat", marks: Islamiat },
        { name: "Pak Study", marks: PakStudy },
        { name: "Physics", marks: Physics },
        { name: "Chemistry", marks: Chemistry },
    ];

    // Grade function
    function getGrade(marks) {
        if (marks >= 90) return "A+";
        else if (marks >= 80) return "A";
        else if (marks >= 70) return "B";
        else if (marks >= 60) return "C";
        else if (marks >= 50) return "D";
        else return "F";
    }

    // Table rows
    let rows = "";
    let total = 0;
    subjects.forEach(function (sub) {
        let grade = getGrade(sub.marks);
        let cssClass = "grade-" + grade.replace('+', 'plus');
        rows += `<tr>
            <td>${sub.name}</td>
            <td>${sub.marks}</td>
            <td class="${cssClass}">${grade}</td>
        </tr>`;
        total += sub.marks;
    });

    let average = (total / 8).toFixed(2);
    let overallGrade = getGrade(average);
    let overallClass = "grade-" + overallGrade.replace('+', 'plus');

    Result.style.display = "block";
    Result.innerHTML = `
        <h2>Result: ${Name}</h2>
        <table>
            <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Grade</th>
            </tr>
            ${rows}
        </table>
        <div id="overall">
            Average: ${average} &nbsp;|&nbsp; Overall Grade: <span class="${overallClass}">${overallGrade}</span>
        </div>
    `;
});