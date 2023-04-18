const img = document.getElementById("apod");
let date, start = Date.parse('2021-01-01'), end = new Date();
end.setDate(end.getDate()-1);
const getDate = () => { 
  date = new Date(Math.floor(Math.random() * (end - start + 1) + start)).toISOString().split('T')[0]; 
  return date
};

fetch(`)
.then(response => response.json())
.then(data => {
  img.src = data[0].url
})
