
const post = document.getElementById('root')
window.countS = 0;

const getData = (json) => {
    const data = json.data;
    const personalData = [];
    for (let i=0; i in data; i++){
        const preData = [];
        preData.push(data[i].avatar);
        preData.push(data[i].first_name);
        preData.push(data[i].last_name);
        preData.push(data[i].email)
        personalData.push(preData);
    }
    return personalData;
}

const renderMain = (data) => {
    for (let i in data) {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const img = document.createElement('img');
        const p = document.createElement('p');
        countS++
        div.classList.add(`card-${countS}`);
        img.src = data[i][0];
        h2.innerText = `${data[i][1]} ${data[i][2]}`;
        p.innerText = `Email: ${data[i][3]}`;
        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p);
        post.appendChild(div);
    }
}

const render = (json, param) => {
    const data = getData(json);
    switch (param) {
        case 'up':
            data.sort(function (a, b){
                let aa = a[1].length
                let bb = b[1].length
                if (aa > bb) {
                    return 1;
                }
                if (bb > aa){
                    return -1
                }
                return 0
            })
            renderMain(data);
            break;
        case 'down':
            data.sort(function (a, b){
                let aa = a[1].length
                let bb = b[1].length
                if (aa > bb) {
                    return -1;
                }
                if (bb > aa){
                    return 1
                }
                return 0
            })
            renderMain(data);
            break;
        case 'none':
            renderMain(data);
    }
}



function getPersons(n, param) {
    fetch(`https://reqres.in/api/users?page=${n}`)
        .then(
            obj=>obj.json(),
            e=>console.log(e)
        )
        .then(
            json=>render(json, param),
            e=>console.log(e)
        )
}

const sorting = (param) => {
    for (let i=1; i < 3; i++){
        getPersons(i, param);
    }
}

const sorted = (upDown) => {
    switch (upDown){
        case 'up':
            sorting('up')
            break;
        case 'down':
            sorting('down');
            break;
        default:
            sorting('none');
    }
}


function myFunction() {
  let input = document.getElementById("mySearch");
  let filter = input.value.toUpperCase();
  let root = document.getElementById("root");
  let cards = root.getElementsByTagName("div");

  cards = [...cards].slice(2, cards.length)

  for (let i = 0; i < cards.length; i++) {
    let h2 = cards[i].getElementsByTagName("h2")[0];
    if (h2.innerHTML.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}


