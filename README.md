<h2>Student API - Sorting  </h2>

<h3> Description</h3>
<p>This branch adds sorting functionality to the Student Management API.</p>

<p>Sorting allows the client to control the order of returned student records using query parameters.</p>

<p>The sorting feature works together with the existing GET endpoint.<p>
<p>Sorting is implemented using the `sortBy` and `order` query parameters.<p>
<p> SortBy pararmeters: means when you sort by using , id, username, course and module</p>
<p> Order parameters: means when you sort in either ascending or in descending order.</p>
<p> use this url  http://localhost:3000/students?sortBy=username&order=asc. thunder client. asc  for ascending order change that to desc for descending order. </p>

